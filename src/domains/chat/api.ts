import { fetchClient } from '../../api/client';
import { ApiError } from '../../api/http';

export async function createChatRoom(boardId: string | number) {
  const { data, error, response } = await fetchClient.POST('/chat/room', {
    body: { boardId: Number(boardId) },
  });
  if (!response.ok) throw new ApiError(response.status, error ?? null);
  return data;
}

export async function getMyRooms() {
  const { data, error, response } = await fetchClient.GET('/chat/rooms');
  if (!response.ok) throw new ApiError(response.status, error ?? null);
  return data;
}

export async function getChatMessages(roomId: string | number) {
  const { data, error, response } = await fetchClient.GET(
    '/chat/room/{roomId}/messages',
    { params: { path: { roomId: Number(roomId) } } }
  );
  if (!response.ok) throw new ApiError(response.status, error ?? null);
  return data;
}

export async function getWearerList(boardId: string | number) {
  const { data, error, response } = await fetchClient.GET(
    '/chat/board/{boardId}/wearers',
    { params: { path: { boardId: Number(boardId) } } }
  );
  if (!response.ok) throw new ApiError(response.status, error ?? null);
  return data;
}

export async function markRoomAsRead(roomId: string | number) {
  const { error, response } = await fetchClient.PATCH(
    '/chat/room/{roomId}/read',
    { params: { path: { roomId: Number(roomId) } } }
  );
  if (!response.ok) throw new ApiError(response.status, error ?? null);
}

export async function confirmDeal(
  boardId: string | number,
  wearerId: string | number
) {
  const { error, response } = await fetchClient.PATCH(
    '/chat/board/{boardId}/confirm/{wearerId}',
    {
      params: {
        path: { boardId: Number(boardId), wearerId: Number(wearerId) },
      },
    }
  );
  if (!response.ok) throw new ApiError(response.status, error ?? null);
}
