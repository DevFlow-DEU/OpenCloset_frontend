import { mutationOptions, type QueryKey } from '@tanstack/react-query';
import { $api } from '../../api/client';
import { queryClient } from '../../api/queryClient';
import type { components } from '../../api/api';
import { productApi, type UpdateBoardForm } from './api';

// 캐시된 응답(목록의 items 또는 상세)에서 해당 boardId의 wished만 뒤집는다.
// 변경이 없으면 undefined를 반환해 캐시를 건드리지 않는다.
type WishlistSnapshot = { key: QueryKey; data: unknown };

function flipWished(value: unknown, boardId: number): unknown | undefined {
  if (!value || typeof value !== 'object') return undefined;
  const record = value as { id?: number; wished?: boolean; items?: unknown };
  if (Array.isArray(record.items)) {
    let changed = false;
    const items = record.items.map((item) => {
      const flipped = flipWished(item, boardId);
      if (flipped === undefined) return item;
      changed = true;
      return flipped;
    });
    return changed ? { ...record, items } : undefined;
  }
  if (record.id === boardId && typeof record.wished === 'boolean') {
    return { ...record, wished: !record.wished };
  }
  return undefined;
}

export const productQueries = {
  all: () => $api.queryOptions('get', '/board/All'),
  detail: (id: string | number) =>
    $api.queryOptions('get', '/board/{id}', {
      params: { path: { id: Number(id) } },
    }),
  top: () => $api.queryOptions('get', '/board/top'),
  bottom: () => $api.queryOptions('get', '/board/bottom'),
  outer: () => $api.queryOptions('get', '/board/outher'),
  onepiece: () => $api.queryOptions('get', '/board/onepiece'),
  jewelry: () => $api.queryOptions('get', '/board/jewelry'),
  shoes: () => $api.queryOptions('get', '/board/shoes'),
  bag: () => $api.queryOptions('get', '/board/bag'),
  search: (body: components['schemas']['BoardSearchRequestDto']) =>
    $api.queryOptions('post', '/search', { body }),
  searchAdvanced: (
    body: components['schemas']['BoardSearchRequestDto'],
    sort?: 'latest' | 'expensive' | 'cheap'
  ) =>
    $api.queryOptions('post', '/search/advanced', {
      params: { query: { sort } },
      body,
    }),
  myBoards: (status?: string) =>
    $api.queryOptions('get', '/board/my', {
      params: { query: { status } },
    }),
  wishlist: (filters?: { status?: string; category?: string }) =>
    $api.queryOptions('get', '/wishlist/my', {
      params: { query: filters },
    }),
  create: () =>
    mutationOptions({
      mutationFn: productApi.create,
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: productQueries.all().queryKey,
        });
        queryClient.invalidateQueries({
          queryKey: ['get', '/mypage/products'],
        });
      },
    }),
  updateBoard: (id: string | number) =>
    mutationOptions({
      mutationFn: (form: UpdateBoardForm) => productApi.updateBoard(id, form),
      onSuccess: (updated) => {
        queryClient.setQueryData(productQueries.detail(id).queryKey, updated);
        queryClient.invalidateQueries({
          queryKey: productQueries.all().queryKey,
        });
      },
    }),
  updateStatus: (id: string | number) =>
    mutationOptions({
      mutationFn: (variables: { status: string; buyerId?: number }) =>
        productApi.updateStatus(id, variables.status, variables.buyerId),
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: productQueries.detail(id).queryKey,
        });
        queryClient.invalidateQueries({ queryKey: ['board-my'] });
      },
    }),
  toggleWishlist: (boardId: string | number) =>
    mutationOptions({
      mutationFn: () => productApi.toggleWishlist(boardId),
      // 클릭 즉시 캐시된 목록/상세의 wished를 뒤집고(optimistic),
      // 실패 시 스냅샷으로 롤백한다. 성공 시에는 아래 invalidateQueries로 서버 값과 맞춘다.
      onMutate: async () => {
        const id = Number(boardId);
        const snapshots: WishlistSnapshot[] = [];
        queryClient
          .getQueryCache()
          .getAll()
          .forEach((query) => {
            const current = query.state.data;
            const flipped = flipWished(current, id);
            if (flipped === undefined) return;
            snapshots.push({ key: query.queryKey, data: current });
            queryClient.setQueryData(query.queryKey, flipped);
          });
        return { snapshots };
      },
      onError: (_error, _variables, context) => {
        context?.snapshots.forEach(({ key, data }) => {
          queryClient.setQueryData(key, data);
        });
      },
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: productQueries.detail(boardId).queryKey,
        });
        queryClient.invalidateQueries({
          queryKey: productQueries.all().queryKey,
        });
        queryClient.invalidateQueries({ queryKey: ['get', '/wishlist/my'] });
      },
    }),
};
