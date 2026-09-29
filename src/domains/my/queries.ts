import { mutationOptions, queryOptions } from '@tanstack/react-query';
import { $api } from '../../api/client';
import { queryClient } from '../../api/queryClient';
import { clearTokens } from '../../api/token';
import {
  changeAddress,
  changePassword,
  deleteAccount,
  editProfile,
  fetchOwnerBoards,
  fetchRenterBoards,
  logout,
} from './api';

export const myQueries = {
  profile: () => $api.queryOptions('get', '/mypage/profile'),
  editProfile: () =>
    mutationOptions({
      mutationFn: editProfile,
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: myQueries.profile().queryKey,
        });
      },
    }),
  changeAddress: () => mutationOptions({ mutationFn: changeAddress }),
  logout: () =>
    mutationOptions({
      mutationFn: logout,
      onSettled: () => {
        clearTokens();
      },
    }),
  changePassword: () => mutationOptions({ mutationFn: changePassword }),
  deleteAccount: () => mutationOptions({ mutationFn: deleteAccount }),
  ownerBoards: () =>
    queryOptions({
      queryKey: ['board-my', 'owner'],
      queryFn: fetchOwnerBoards,
    }),
  renterBoards: () =>
    queryOptions({
      queryKey: ['board-my', 'renter'],
      queryFn: fetchRenterBoards,
    }),
};
