import { useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Header from '../../../components/Header/Header';
import type { StateType } from '../../../components/State/State';
import ChatBar from '../components/ChatBar';
import ChatBubble from '../components/ChatBubble';
import ChatMessageImage from '../components/ChatMessageImage';
import ChatState from '../components/ChatState';
import WearerPicker from '../components/WearerPicker';
import { type ChatMessageItem, type Message } from '../types';
import { chatQueries } from '../queries';
import { useChatSocket } from '../useChatSocket';
import { sendChatImage } from '../api';
import {
  useChatMessages,
  useConfirmDeal,
  useMarkAsRead,
  useMyRooms,
} from '../hooks';
import { useMyProfile, useOwnerBoards } from '../../my/hooks';
import { useProductDetail, useUpdateBoardStatus } from '../../product/hooks';
import { queryClient } from '../../../api/queryClient';
import { getApiErrorMessage } from '../../../api/http';
import defaultProfileImage from '../../../assets/Default_Profile.png';
import noImage from '../../../assets/item_no_image.svg';
import styles from './ChatRoom.module.css';

const EMPTY_MESSAGE: Message = { text: '', photos: [] };
const MAX_MESSAGE_LENGTH = 1000;

const FATAL_NOTICE: Record<string, string> = {
  UNAUTHORIZED: '채팅 인증에 실패했습니다. 잠시 후 자동으로 다시 시도합니다.',
  FORBIDDEN: '이 채팅방에 접근할 권한이 없습니다.',
  INVALID_REQUEST: '잘못된 채팅 요청입니다.',
  CHAT_UNAVAILABLE: '채팅방을 찾을 수 없습니다.',
};

function mergeIncoming(
  current: ChatMessageItem[],
  incoming: ChatMessageItem
): ChatMessageItem[] {
  if (
    incoming.messageId != null &&
    current.some((item) => item.messageId === incoming.messageId)
  ) {
    return current;
  }
  return [...current, incoming].sort((a, b) => {
    const bySentAt = String(a.sentAt ?? '').localeCompare(
      String(b.sentAt ?? '')
    );
    return bySentAt !== 0 ? bySentAt : (a.messageId ?? 0) - (b.messageId ?? 0);
  });
}

export default function ChatRoom() {
  const { roomId = '' } = useParams();
  const navigate = useNavigate();

  const { data: rooms } = useMyRooms();
  const room = rooms?.find((item) => String(item.roomId) === roomId);
  const boardId = room?.boardId;

  const { data: ownerBoards = [] } = useOwnerBoards();
  const isSeller =
    boardId !== undefined && ownerBoards.some((board) => board.id === boardId);

  const { data: product } = useProductDetail(
    boardId ?? '',
    boardId !== undefined
  );
  const updateStatus = useUpdateBoardStatus(boardId ?? '');

  const { data: messages = [], refetch: refetchMessages } =
    useChatMessages(roomId);
  const { data: profile } = useMyProfile();
  const { mutate: markAsRead } = useMarkAsRead(roomId);

  const confirmDeal = useConfirmDeal();

  const [draft, setDraft] = useState<Message>(EMPTY_MESSAGE);
  const draftRef = useRef(draft);
  draftRef.current = draft;
  const [isSending, setIsSending] = useState(false);
  const [pending, setPending] = useState<{ key: string; text: string }[]>([]);
  const [notice, setNotice] = useState<string | null>(null);
  const [pickerOpen, setPickerOpen] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const sendingRef = useRef(false);

  const myNickname = profile?.nickname;

  useEffect(() => {
    markAsRead();
  }, [roomId, markAsRead]);

  useEffect(
    () => () => {
      draftRef.current.photos.forEach(({ src }) => URL.revokeObjectURL(src));
    },
    []
  );

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ block: 'end' });
  }, [messages.length, pending.length]);

  useEffect(() => {
    if (!notice) return;
    const timer = setTimeout(() => setNotice(null), 4000);
    return () => clearTimeout(timer);
  }, [notice]);

  const { status: socketStatus, send } = useChatSocket(roomId, {
    onMessage: (incoming) => {
      const mine =
        Boolean(myNickname) && incoming.senderNickname === myNickname;

      queryClient.setQueryData<ChatMessageItem[]>(
        chatQueries.messages(roomId).queryKey,
        (old = []) => mergeIncoming(old, incoming)
      );

      if (mine) {
        setPending((prev) => {
          const index = prev.findIndex(
            (item) => item.text === incoming.message
          );
          if (index === -1) return prev;
          const next = [...prev];
          next.splice(index, 1);
          return next;
        });
      } else {
        // 화면을 열어둔 상태에서 상대방 메시지가 도착했으므로 바로 읽음 처리한다.
        markAsRead();
      }

      queryClient.invalidateQueries({ queryKey: chatQueries.rooms().queryKey });
    },
    onValidationError: (error) => {
      setNotice(
        error.message ??
          '메시지를 전송하지 못했습니다. 내용을 다시 확인해 주세요.'
      );
    },
    onFatalError: (code) => {
      setNotice(
        FATAL_NOTICE[code] ?? '채팅 연결이 끊어졌습니다. 재연결 중입니다.'
      );
    },
    onConnect: () => {
      // 재연결 시점: 누락된 대화를 내역 조회로 채우고 낙관적 버블을 정리한다.
      queryClient.invalidateQueries({
        queryKey: chatQueries.rooms().queryKey,
      });
      void refetchMessages().then(({ data: latest = [] }) => {
        setPending((prev) =>
          prev.filter(
            (item) =>
              !latest.some(
                (message) =>
                  message.message === item.text &&
                  Boolean(myNickname) &&
                  message.senderNickname === myNickname
              )
          )
        );
      });
    },
  });

  const opponentId = useMemo(() => {
    const opponent = messages.find(
      (message) =>
        message.senderNickname && message.senderNickname !== myNickname
    );
    return opponent?.senderId;
  }, [messages, myNickname]);

  const handleSend = async () => {
    if (sendingRef.current) return;
    const text = draft.text.trim();
    const photos = [...draft.photos];
    if (!text && photos.length === 0) return;
    if (text.length > MAX_MESSAGE_LENGTH) {
      setNotice(`메시지는 ${MAX_MESSAGE_LENGTH}자 이하로 보내주세요.`);
      return;
    }
    if (text && socketStatus !== 'connected') {
      setNotice(
        '실시간 연결이 아직 준비되지 않았습니다. 잠시 후 다시 시도해 주세요.'
      );
      return;
    }

    sendingRef.current = true;
    setIsSending(true);
    setNotice(null);
    try {
      // 이미지 전송 API는 요청당 한 장만 받으므로 선택한 순서대로 하나씩 전송합니다.
      for (const photo of photos) {
        const uploadedMessage = await sendChatImage(roomId, photo.file);
        URL.revokeObjectURL(photo.src);
        setDraft((prev) => ({
          ...prev,
          photos: prev.photos.filter((item) => item.uuid !== photo.uuid),
        }));
        if (uploadedMessage) {
          queryClient.setQueryData<ChatMessageItem[]>(
            chatQueries.messages(roomId).queryKey,
            (current = []) => mergeIncoming(current, uploadedMessage)
          );
        }
        queryClient.invalidateQueries({
          queryKey: chatQueries.rooms().queryKey,
        });
      }

      if (text) {
        if (!send(text)) {
          setNotice(
            '사진은 전송했지만 실시간 연결이 끊겨 텍스트는 보내지 못했습니다. 텍스트를 다시 전송해 주세요.'
          );
          return;
        }
        setPending((prev) => [
          ...prev,
          { key: `${Date.now()}-${prev.length}`, text },
        ]);
        setDraft((prev) => ({ ...prev, text: '' }));
      }
    } catch (error) {
      setNotice(getApiErrorMessage(error, '사진 전송에 실패했습니다.'));
    } finally {
      sendingRef.current = false;
      setIsSending(false);
    }
  };

  const handleStatusChange = (status: string) => {
    if (status === '예약중') {
      // 백엔드가 '예약중' 전환에 buyerId를 요구하므로 문의자 선택 흐름으로 보낸다.
      setPickerOpen(true);
      return;
    }
    updateStatus.mutate({ status });
  };

  const handleConfirmPick = (wearerId: number) => {
    if (boardId === undefined) return;
    confirmDeal.mutate(
      { boardId, wearerId },
      {
        onSuccess: () => {
          setPickerOpen(false);
          setNotice('거래가 확정되어 상품이 예약중 상태로 바뀌었어요.');
        },
      }
    );
  };

  return (
    <>
      <Header.Root>
        <Header.BackButton />
        <Header.CenterTitle title={room?.opponentNickname ?? ''} />
      </Header.Root>

      <div className={styles.page}>
        {product && (
          <div className={styles.productBar}>
            <ChatState
              image={product.images?.[0] || noImage}
              name={product.title ?? ''}
              price={product.price ?? 0}
              status={
                (product.status as StateType | '대여가능' | undefined) ??
                '대여가능'
              }
              canChangeStatus={isSeller}
              onClick={() => navigate(`/product/${boardId}`)}
              onStatusChange={handleStatusChange}
            />
          </div>
        )}

        {socketStatus !== 'connected' && (
          <div className={styles.socketState}>
            {socketStatus === 'connecting'
              ? '실시간 연결 중…'
              : '연결이 끊어졌습니다. 재연결 중…'}
          </div>
        )}

        {updateStatus.isError && (
          <div className={styles.statusError}>
            {getApiErrorMessage(
              updateStatus.error,
              '상태 변경에 실패했습니다.'
            )}
          </div>
        )}

        <div className={styles.messages}>
          {messages.map((message, index) => {
            const isMine =
              Boolean(myNickname) && message.senderNickname === myNickname;
            const content =
              message.type === 'IMAGE' && message.messageId !== undefined ? (
                <ChatMessageImage
                  roomId={roomId}
                  messageId={message.messageId}
                  alt={`${message.senderNickname ?? '사용자'}가 보낸 사진`}
                />
              ) : (
                (message.message ?? '')
              );
            const bubble = (
              <ChatBubble
                variant={isMine ? 'me' : 'them'}
                className={message.type === 'IMAGE' ? styles.imageBubble : ''}
              >
                {content}
              </ChatBubble>
            );
            return isMine ? (
              <div
                className={styles.myRow}
                key={message.messageId ?? `db-${index}`}
              >
                {bubble}
              </div>
            ) : (
              <div
                className={styles.theirRow}
                key={message.messageId ?? `db-${index}`}
              >
                <img
                  className={styles.avatar}
                  src={message.senderProfileImage || defaultProfileImage}
                  alt=""
                />
                {bubble}
              </div>
            );
          })}
          {pending.map((item) => (
            <div className={styles.myRow} key={item.key}>
              <ChatBubble variant="me">{item.text}</ChatBubble>
            </div>
          ))}
          <div ref={bottomRef} />
        </div>
      </div>

      {notice && <div className={styles.notice}>{notice}</div>}

      {pickerOpen && boardId !== undefined && (
        <WearerPicker
          boardId={boardId}
          currentWearerId={opponentId}
          confirming={confirmDeal.isPending}
          confirmError={
            confirmDeal.isError
              ? getApiErrorMessage(
                  confirmDeal.error,
                  '거래 확정에 실패했습니다.'
                )
              : null
          }
          onPick={handleConfirmPick}
          onClose={() => {
            setPickerOpen(false);
            confirmDeal.reset();
          }}
        />
      )}

      <ChatBar
        message={draft}
        setMessage={setDraft}
        onClickSendButton={() => void handleSend()}
        onFileError={setNotice}
        isSending={isSending}
      />
    </>
  );
}
