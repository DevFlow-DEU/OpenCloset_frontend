import { fetchClient } from '../../api/client';
import type { components } from '../../api/api';
import { apiFetch, ApiError } from '../../api/http';

export type EditProfileInput = {
  nickname: string;
  address: string;
  profileImage: File | null;
};

export async function getMyProfile() {
  const { data, error, response } = await fetchClient.GET('/mypage/profile');
  if (error) throw new ApiError(response.status, error);
  return data;
}

export async function editProfile(input: EditProfileInput) {
  const formData = new FormData();
  formData.append('nickname', input.nickname);
  formData.append('address', input.address);
  if (input.profileImage) {
    formData.append('profileImage', input.profileImage);
  }
  const { data, error, response } = await fetchClient.POST('/mypage/edit', {
    body: formData as unknown as { profileImage?: string },
  });
  if (error) throw new ApiError(response.status, error);
  return data;
}

export async function changeAddress(address: string) {
  const { data, error, response } = await fetchClient.POST('/mypage/edit', {
    params: { query: { address } },
  });
  if (error) throw new ApiError(response.status, error);
  return data;
}

export async function logout() {
  const { error, response } = await fetchClient.POST('/mypage/logout');
  if (error) throw new ApiError(response.status, error);
}

export async function changePassword(
  body: components['schemas']['PasswordChangeRequestDto']
) {
  const { data, error, response } = await fetchClient.PUT(
    '/auth/password-change',
    { body }
  );
  if (error) throw new ApiError(response.status, error);
  return data;
}

export async function deleteAccount(password: string) {
  const { data, error, response } = await fetchClient.DELETE('/auth/delete', {
    body: { password },
  });
  if (error) throw new ApiError(response.status, error);
  return data;
}

export type ManageBoardItem = {
  id: number;
  title: string;
  images: string[];
  startDate: string;
  endDate: string;
  price: number;
  status: string;
};

export async function fetchOwnerBoards() {
  const data = await apiFetch<{ items?: ManageBoardItem[] }>('/board/my/owner');
  return data?.items ?? [];
}

export async function fetchRenterBoards() {
  const data = await apiFetch<{ items?: ManageBoardItem[] }>(
    '/board/my/renter'
  );
  return data?.items ?? [];
}
