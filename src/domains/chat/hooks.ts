import { useMutation, useQuery } from '@tanstack/react-query';
import { chatQueries } from './queries';

export function useMyRooms() {
  return useQuery(chatQueries.rooms());
}

export function useChatMessages(roomId: string | number) {
  return useQuery(chatQueries.messages(roomId));
}

export function useWearerList(boardId: string | number) {
  return useQuery(chatQueries.wearers(boardId));
}

export function useCreateChatRoom(boardId: string | number) {
  return useMutation(chatQueries.createRoom(boardId));
}

export function useMarkAsRead(roomId: string | number) {
  return useMutation(chatQueries.markAsRead(roomId));
}

export function useConfirmDeal(
  boardId: string | number,
  wearerId: string | number
) {
  return useMutation(chatQueries.confirmDeal(boardId, wearerId));
}
