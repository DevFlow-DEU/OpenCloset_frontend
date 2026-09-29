import { mutationOptions } from '@tanstack/react-query';
import { $api } from '../../api/client';
import { queryClient } from '../../api/queryClient';
import type { components } from '../../api/api';
import { productApi, type UpdateBoardForm } from './api';

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
      onSuccess: (updated) => {
        queryClient.setQueryData(productQueries.detail(id).queryKey, updated);
      },
    }),
  toggleWishlist: (boardId: string | number) =>
    mutationOptions({
      mutationFn: () => productApi.toggleWishlist(boardId),
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
