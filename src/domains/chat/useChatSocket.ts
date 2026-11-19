import { useCallback, useEffect, useRef, useState } from 'react';
import { Client, type IMessage } from '@stomp/stompjs';
import { BACK_URL } from '../../api/http';
import { getAccessToken } from '../../api/token';
import type { ChatMessageItem } from './types';

export type ChatSocketStatus = 'connecting' | 'connected' | 'disconnected';

export interface ChatValidationError {
  code?: string;
  message?: string;
}

export interface ChatSocketEvents {
  /** /topic/chat/{roomId} 로 수신한 실시간 메시지 */
  onMessage?: (message: ChatMessageItem) => void;
  /** /user/queue/chat/errors 로 수신한 내용 검증 오류 (연결 유지) */
  onValidationError?: (error: ChatValidationError) => void;
  /** STOMP ERROR 프레임의 코드 (UNAUTHORIZED/FORBIDDEN 등, 연결 종료 후 재시도) */
  onFatalError?: (code: string) => void;
  /** CONNECT 성공 시점 (누락 내역 채움용 refetch 트리거) */
  onConnect?: () => void;
}

function toWebSocketUrl() {
  return `${BACK_URL.replace(/^http/, 'ws')}/ws/chat`;
}

export function useChatSocket(roomId: string, events: ChatSocketEvents) {
  const eventsRef = useRef(events);
  eventsRef.current = events;

  const clientRef = useRef<Client | null>(null);
  const [status, setStatus] = useState<ChatSocketStatus>('connecting');

  useEffect(() => {
    if (!roomId) return;

    const client = new Client({
      brokerURL: toWebSocketUrl(),
      reconnectDelay: 3000,
      heartbeatIncoming: 10_000,
      heartbeatOutgoing: 10_000,
      // 재시도마다 localStorage의 최신 액세스 토큰을 CONNECT 헤더에 실는다.
      beforeConnect: (connectedClient) => {
        const token = getAccessToken();
        if (token) {
          connectedClient.connectHeaders.Authorization = `Bearer ${token}`;
        }
      },
      onConnect: () => {
        setStatus('connected');
        client.subscribe(`/topic/chat/${roomId}`, (message: IMessage) => {
          try {
            eventsRef.current.onMessage?.(
              JSON.parse(message.body) as ChatMessageItem
            );
          } catch {
            // 스키마와 다른 프레임은 무시한다. 내역 조회 API가 보장이다.
          }
        });
        client.subscribe('/user/queue/chat/errors', (message: IMessage) => {
          try {
            eventsRef.current.onValidationError?.(
              JSON.parse(message.body) as ChatValidationError
            );
          } catch {
            eventsRef.current.onValidationError?.({ message: message.body });
          }
        });
        eventsRef.current.onConnect?.();
      },
      onDisconnect: () => setStatus('disconnected'),
      onWebSocketClose: () => setStatus('disconnected'),
      onWebSocketError: () => setStatus('disconnected'),
      onStompError: (errorFrame) => {
        setStatus('disconnected');
        // 서버는 코드(UNAUTHORIZED 등)를 message 헤더와 본문에 담아 보낸다.
        eventsRef.current.onFatalError?.(
          errorFrame.headers.message ?? errorFrame.body
        );
      },
    });

    clientRef.current = client;
    void client.activate();

    return () => {
      clientRef.current = null;
      void client.deactivate();
    };
  }, [roomId]);

  const send = useCallback(
    (message: string): boolean => {
      const client = clientRef.current;
      if (!client?.connected) return false;
      client.publish({
        destination: '/app/chat/send',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ roomId: Number(roomId), message }),
      });
      return true;
    },
    [roomId]
  );

  return { status, send };
}
