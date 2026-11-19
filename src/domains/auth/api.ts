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

export async function kakaoCallback(code: string) {
  const { data, error, response } = await fetchClient.GET(
    '/auth/kakao/callback',
    { params: { query: { code } } }
  );
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
  passwordConfirm: string;
  address: string;
}) {
  return apiFetch<unknown>('/auth/kakao/register', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(input),
  });
}
