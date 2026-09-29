import type { Middleware } from 'openapi-fetch';
import { BACK_URL } from './http';
import {
  clearTokens,
  getAccessToken,
  getRefreshToken,
  setTokens,
} from './token';

interface PendingRequest {
  clone: Request;
  hadAuth: boolean;
}

const pendingRequests = new Map<string, PendingRequest>();

let refreshPromise: Promise<string | null> | null = null;

async function requestNewAccessToken(
  refreshToken: string
): Promise<string | null> {
  try {
    const response = await fetch(`${BACK_URL}/auth/refresh`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ refreshToken }),
    });
    if (!response.ok) return null;
    const data = (await response.json().catch(() => null)) as {
      accessToken?: string;
    } | null;
    return data?.accessToken ?? null;
  } catch {
    return null;
  }
}

function getNewAccessToken(): Promise<string | null> {
  refreshPromise ??= (async () => {
    const refreshToken = getRefreshToken();
    if (!refreshToken) {
      clearTokens();
      return null;
    }
    const accessToken = await requestNewAccessToken(refreshToken);
    if (accessToken) {
      setTokens(accessToken, refreshToken);
    } else {
      clearTokens();
    }
    return accessToken;
  })().finally(() => {
    refreshPromise = null;
  });
  return refreshPromise;
}

export const authMiddleware: Middleware = {
  onRequest({ request, id }) {
    if (!request.headers.has('Authorization')) {
      const token = getAccessToken();
      if (token) request.headers.set('Authorization', `Bearer ${token}`);
    }
    const hadAuth = request.headers.has('Authorization');
    try {
      pendingRequests.set(id, { clone: request.clone(), hadAuth });
    } catch {
      pendingRequests.set(id, { clone: request, hadAuth });
    }
    return request;
  },
  async onResponse({ response, id }) {
    const entry = pendingRequests.get(id);
    pendingRequests.delete(id);
    if (response.status !== 401 || !entry?.hadAuth) return response;

    const accessToken = await getNewAccessToken();
    if (!accessToken) {
      if (window.location.pathname !== '/login') {
        window.location.assign('/login');
      }
      return response;
    }

    const retryRequest = entry.clone;
    retryRequest.headers.set('Authorization', `Bearer ${accessToken}`);
    return fetch(retryRequest);
  },
  onError({ id }) {
    pendingRequests.delete(id);
  },
};
