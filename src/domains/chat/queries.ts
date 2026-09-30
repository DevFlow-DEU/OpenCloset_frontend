import { mutationOptions } from '@tanstack/react-query';
import { $api } from '../../api/client';
import { queryClient } from '../../api/queryClient';
import { confirmDeal, createChatRoom, markRoomAsRead } from './api';

export const chatQueries = {
  rooms: () => $api.queryOptions('get', '/chat/rooms'),
  messages: (roomId: string | number) =>
    $api.queryOptions('get', '/chat/room/{roomId}/messages', {
      params: { path: { roomId: Number(roomId) } },
    }),
  wearers: (boardId: string | number) =>
    $api.queryOptions('get', '/chat/board/{boardId}/wearers', {
      params: { path: { boardId: Number(boardId) } },
    }),
  createRoom: (boardId: string | number) =>
    mutationOptions({
      mutationFn: () => createChatRoom(boardId),
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: chatQueries.rooms().queryKey,
        });
      },
    }),
  markAsRead: (roomId: string | number) =>
    mutationOptions({
      mutationFn: () => markRoomAsRead(roomId),
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: chatQueries.messages(roomId).queryKey,
        });
        queryClient.invalidateQueries({
          queryKey: chatQueries.rooms().queryKey,
        });
      },
    }),
  confirmDeal: (boardId: string | number, wearerId: string | number) =>
    mutationOptions({
      mutationFn: () => confirmDeal(boardId, wearerId),
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: chatQueries.wearers(boardId).queryKey,
        });
        queryClient.invalidateQueries({
          queryKey: chatQueries.rooms().queryKey,
        });
        queryClient.invalidateQueries({ queryKey: ['get', '/board/All'] });
      },
    }),
};
