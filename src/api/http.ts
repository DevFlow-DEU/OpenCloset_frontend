import { getAccessToken } from './token';

export const BACK_URL = (import.meta.env.VITE_BACK_URL ?? '').replace(
  /\/+$/,
  ''
);

export class ApiError extends Error {
  status: number;

  constructor(status: number, body: unknown) {
    super(getApiErrorMessage(body, `요청에 실패했습니다. (${status})`));
    this.status = status;
  }
}

export function getApiErrorMessage(
  error: unknown,
  fallback = '요청에 실패했습니다.'
): string {
  if (error instanceof ApiError) return error.message;
  if (typeof error === 'string' && error.trim()) return error;
  if (error && typeof error === 'object' && 'message' in error) {
    const message = (error as { message?: unknown }).message;
    if (typeof message === 'string' && message.trim()) return message;
  }
  if (error instanceof TypeError) return '서버에 연결할 수 없습니다.';
  if (error instanceof Error && error.message.trim()) return error.message;
  return fallback;
}

export async function apiFetch<T>(
  path: string,
  init: RequestInit = {}
): Promise<T> {
  const headers = new Headers(init.headers);
  const token = getAccessToken();
  if (token) headers.set('Authorization', `Bearer ${token}`);

  const response = await fetch(`${BACK_URL}${path}`, { ...init, headers });

  if (!response.ok) {
    let body: unknown = null;
    try {
      body = await response.json();
    } catch {}
    throw new ApiError(response.status, body);
  }

  if (response.status === 204) return null as T;
  return (await response.json().catch(() => null)) as T;
}
