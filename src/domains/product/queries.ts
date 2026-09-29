import { mutationOptions } from '@tanstack/react-query';
import { $api } from '../../api/client';
import { queryClient } from '../../api/queryClient';
import type { components } from '../../api/api';
import { productApi, type ProductDetail } from './api';

export const productQueries = {
  all: () => $api.queryOptions('get', '/board/All'),
  detail: (id: string | number) => ({
    ...$api.queryOptions('get', '/board/{id}', {
      params: { path: { id: Number(id) } },
    }),
    select: (data: components['schemas']['BoardCreateResponsetDto']) =>
      data as unknown as ProductDetail,
  }),
  search: (body: components['schemas']['BoardSearchRequestDto']) =>
    $api.queryOptions('post', '/search', { body }),
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
  updateStatus: (id: string | number) =>
    mutationOptions({
      mutationFn: (status: string) => productApi.updateStatus(id, status),
      onSuccess: (updated) => {
        queryClient.setQueryData(productQueries.detail(id).queryKey, updated);
      },
    }),
};
