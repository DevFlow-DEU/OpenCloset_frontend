import { useMutation, useQuery } from '@tanstack/react-query';
import type { components } from '../../api/api';
import { productQueries } from './queries';

export function useProductDetail(id: string | number) {
  return useQuery(productQueries.detail(id));
}

export function useProductSearch(
  body: components['schemas']['BoardSearchRequestDto']
) {
  return useQuery(productQueries.search(body));
}

export function useCreateBoard() {
  return useMutation(productQueries.create());
}

export function useUpdateBoardStatus(id: string | number) {
  return useMutation(productQueries.updateStatus(id));
}
