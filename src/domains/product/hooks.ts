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

export function useSearchAdvanced(
  body: components['schemas']['BoardSearchRequestDto'],
  sort?: 'latest' | 'expensive' | 'cheap'
) {
  return useQuery(productQueries.searchAdvanced(body, sort));
}

export function useMyBoards(status?: string) {
  return useQuery(productQueries.myBoards(status));
}

export function useMyWishlist(filters?: {
  status?: string;
  category?: string;
}) {
  return useQuery(productQueries.wishlist(filters));
}

export function useCreateBoard() {
  return useMutation(productQueries.create());
}

export function useUpdateBoard(id: string | number) {
  return useMutation(productQueries.updateBoard(id));
}

export function useUpdateBoardStatus(id: string | number) {
  return useMutation(productQueries.updateStatus(id));
}

export function useWishlistToggle(boardId: string | number) {
  return useMutation(productQueries.toggleWishlist(boardId));
}
