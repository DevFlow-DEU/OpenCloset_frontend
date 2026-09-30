import { useMutation, useQuery } from '@tanstack/react-query';
import { myQueries } from './queries';

export function useMyProfile() {
  return useQuery(myQueries.profile());
}

export function useEditProfile() {
  return useMutation(myQueries.editProfile());
}

export function useChangeAddress() {
  return useMutation(myQueries.changeAddress());
}

export function useLogout() {
  return useMutation(myQueries.logout());
}

export function useChangePassword() {
  return useMutation(myQueries.changePassword());
}

export function useDeleteAccount() {
  return useMutation(myQueries.deleteAccount());
}

export function useOwnerBoards(status?: string) {
  return useQuery(myQueries.ownerBoards(status));
}

export function useRenterBoards(status?: string) {
  return useQuery(myQueries.renterBoards(status));
}
