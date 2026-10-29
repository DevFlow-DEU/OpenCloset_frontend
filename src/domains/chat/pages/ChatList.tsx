import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../../components/Header/Header';
import NavigationBar from '../../../components/NavigationBar/NavigationBar';
import RadioFilter from '../../../components/Filter/RadioFilter';
import type { StateType } from '../../../components/State/State';
import ChatItem from '../components/ChatItem';
import { useMyRooms } from '../hooks';
import { useOwnerBoards, useRenterBoards } from '../../my/hooks';
import type { ChatRoomItem } from '../types';
import { getApiErrorMessage } from '../../../api/http';
import defaultProfileImage from '../../../assets/Default_Profile.png';
import noImage from '../../../assets/item_no_image.svg';
import styles from './ChatList.module.css';

type Role = '대여' | '차용';
type RoomView = ChatRoomItem & { status?: StateType; role?: Role };

const STATE_TYPES: StateType[] = ['예약중', '대여중', '대여완료'];

function formatDate(dateStr?: string) {
  if (!dateStr) return '';
  const date = new Date(dateStr);
  return `${date.getMonth() + 1}월 ${date.getDate()}일`;
}

export default function ChatList() {
  const navigate = useNavigate();
  const { data: rooms = [], isPending, isError, error } = useMyRooms();
  const { data: ownerBoards = [] } = useOwnerBoards();
  const { data: renterBoards = [] } = useRenterBoards();
  const [filter, setFilter] = useState('전체');

  const roomViews: RoomView[] = rooms.map((room) => {
    const owned = ownerBoards.find((board) => board.id === room.boardId);
    const rented = renterBoards.find((board) => board.id === room.boardId);
    const board = owned ?? rented;
    return {
      ...room,
      status: STATE_TYPES.find((state) => state === board?.status),
      role: owned ? '대여' : rented ? '차용' : undefined,
    };
  });

  const visibleRooms = roomViews.filter((room) => {
    if (filter === '전체') return true;
    if (filter === '안읽음') return (room.unreadCount ?? 0) > 0;
    if (filter === '대여' || filter === '차용') return room.role === filter;
    return room.status === filter;
  });

  return (
    <>
      <Header.Root hasNotch>
        <Header.MainTitle title="채팅" />
      </Header.Root>

      <div className={styles.page}>
        <RadioFilter type="chat" value={filter} onChange={setFilter} />

        <div className={styles.list}>
          {isPending && <p className={styles.empty}>불러오는 중...</p>}
          {isError && (
            <p className={styles.empty}>{getApiErrorMessage(error)}</p>
          )}
          {!isPending &&
            !isError &&
            visibleRooms.map((room) => (
              <ChatItem
                key={room.roomId}
                itemImage={room.boardImage || noImage}
                userImage={room.opponentProfileImage || defaultProfileImage}
                name={room.opponentNickname ?? ''}
                message={room.lastMessage ?? ''}
                time={formatDate(room.createdAt)}
                unread={room.unreadCount ?? 0}
                status={room.status}
                onClick={() => navigate(`/chat/${room.roomId}`)}
              />
            ))}
          {!isPending && !isError && visibleRooms.length === 0 && (
            <p className={styles.empty}>채팅방이 없습니다.</p>
          )}
        </div>
      </div>

      <NavigationBar />
    </>
  );
}
