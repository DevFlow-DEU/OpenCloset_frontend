import { fetchClient } from '../../api/client';
import { apiFetch, ApiError } from '../../api/http';
import type { components } from '../../api/api';

export async function login(body: components['schemas']['LoginRequestDto']) {
  const { data, error, response } = await fetchClient.POST('/auth/login', {
    body,
  });
  if (!response.ok) throw new ApiError(response.status, error ?? null);
  return data;
}

export async function registerUser(
  body: components['schemas']['UserCreateRequestDto']
) {
  const { data, error, response } = await fetchClient.POST('/auth/register', {
    body,
  });
  if (error) throw new ApiError(response.status, error);
  return data;
}

export async function requestPasswordReset(email: string) {
  const { data, error, response } = await fetchClient.POST(
    '/auth/password-reset',
    { body: { email } }
  );
  if (error) throw new ApiError(response.status, error);
  return data;
}

export type NicknameCheckResult = {
  available?: boolean;
  message?: string;
};

export async function checkNickname(nickname: string) {
  const { data, error, response } = await fetchClient.GET(
    '/auth/check_nickname',
    { params: { query: { nickname } } }
  );
  if (error) throw new ApiError(response.status, error);
  return data as NicknameCheckResult | undefined;
}

export async function completeKakaoSignUp(input: {
  nickname: string;
  password: string;
  address: string;
}) {
  const formData = new FormData();
  formData.append('nickname', input.nickname);
  formData.append('password', input.password);
  formData.append('address', input.address);
  return apiFetch<unknown>('/수정해야함', {
    method: 'POST',
    body: formData,
  });
}
