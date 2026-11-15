import { mutationOptions } from '@tanstack/react-query';
import { $api } from '../../api/client';
import { queryClient } from '../../api/queryClient';
import { productQueries } from '../product/queries';
import { confirmDeal, createChatRoom, markRoomAsRead } from './api';

export const chatQueries = {
  rooms: () => $api.queryOptions('get', '/chat/rooms'),
  messages: (roomId: string | number) =>
    $api.queryOptions('get', '/chat/room/{roomId}/messages', {
      params: { path: { roomId: String(roomId) } },
    }),
  wearers: (boardId: string | number) =>
    $api.queryOptions('get', '/chat/board/{boardId}/wearers', {
      params: { path: { boardId: String(boardId) } },
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
  confirmDeal: () =>
    mutationOptions({
      mutationFn: ({
        boardId,
        wearerId,
      }: {
        boardId: string | number;
        wearerId: string | number;
      }) => confirmDeal(boardId, wearerId),
      onSuccess: (_data, { boardId }) => {
        queryClient.invalidateQueries({
          queryKey: chatQueries.wearers(boardId).queryKey,
        });
        queryClient.invalidateQueries({
          queryKey: chatQueries.rooms().queryKey,
        });
        queryClient.invalidateQueries({
          queryKey: productQueries.detail(boardId).queryKey,
        });
        queryClient.invalidateQueries({ queryKey: ['board-my'] });
        queryClient.invalidateQueries({
          queryKey: productQueries.all().queryKey,
        });
      },
    }),
};
