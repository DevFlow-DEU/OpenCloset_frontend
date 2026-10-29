import { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Header from '../../../components/Header/Header';
import type { StateType } from '../../../components/State/State';
import ChatBar from '../components/ChatBar';
import ChatBubble from '../components/ChatBubble';
import ChatState from '../components/ChatState';
import { type Message } from '../types';
import { useChatMessages, useMarkAsRead, useMyRooms } from '../hooks';
import { useProductDetail, useUpdateBoardStatus } from '../../product/hooks';
import { useMyProfile } from '../../my/hooks';
import defaultProfileImage from '../../../assets/Default_Profile.png';
import noImage from '../../../assets/item_no_image.svg';
import styles from './ChatRoom.module.css';

const EMPTY_MESSAGE: Message = { text: '', photos: [] };

export default function ChatRoom() {
  const { roomId = '' } = useParams();
  const navigate = useNavigate();

  const { data: rooms } = useMyRooms();
  const room = rooms?.find((item) => String(item.roomId) === roomId);
  const boardId = room?.boardId;

  const { data: product } = useProductDetail(
    boardId ?? '',
    boardId !== undefined
  );
  const { mutate: updateStatus } = useUpdateBoardStatus(boardId ?? '');

  const { data: messages = [] } = useChatMessages(roomId);
  const { data: profile } = useMyProfile();
  const { mutate: markAsRead } = useMarkAsRead(roomId);

  const [draft, setDraft] = useState<Message>(EMPTY_MESSAGE);
  const [sentTexts, setSentTexts] = useState<string[]>([]);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    markAsRead();
  }, [roomId, markAsRead]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ block: 'end' });
  }, [messages.length, sentTexts.length]);

  const myNickname = profile?.nickname;

  const handleSend = () => {
    const text = draft.text.trim();
    if (!text) return;
    setSentTexts((prev) => [...prev, text]);
    setDraft((prev) => ({ ...prev, text: '' }));
  };

  return (
    <>
      <Header.Root hasNotch hasCamera>
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
              onClick={() => navigate(`/product/${boardId}`)}
              onStatusChange={(status) => updateStatus({ status })}
            />
          </div>
        )}

        <div className={styles.messages}>
          {messages.map((message, index) => {
            const isMine =
              Boolean(myNickname) && message.senderNickname === myNickname;
            return isMine ? (
              <div className={styles.myRow} key={message.messageId ?? index}>
                <ChatBubble variant="me">{message.message ?? ''}</ChatBubble>
              </div>
            ) : (
              <div className={styles.theirRow} key={message.messageId ?? index}>
                <img
                  className={styles.avatar}
                  src={message.senderProfileImage || defaultProfileImage}
                  alt=""
                />
                <ChatBubble variant="them">{message.message ?? ''}</ChatBubble>
              </div>
            );
          })}
          {sentTexts.map((text, index) => (
            <div className={styles.myRow} key={`sent-${index}`}>
              <ChatBubble variant="me">{text}</ChatBubble>
            </div>
          ))}
          <div ref={bottomRef} />
        </div>
      </div>

      <ChatBar
        message={draft}
        setMessage={setDraft}
        onClickSendButton={handleSend}
      />
    </>
  );
}
