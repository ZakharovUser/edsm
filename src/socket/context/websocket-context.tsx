import { useAuthContext } from 'auth/hooks';
import { useRef, useEffect, createContext, PropsWithChildren } from 'react';

export const WebsocketContext = createContext({});

const onConnect = (event: Event) => {
  const socket = event.target as WebSocket;
  socket.send(JSON.stringify({ command: 'test' }));
  console.log('WS connect');
};

const onDisconnect = (event: CloseEvent) => {
  if (event.wasClean) {
    console.log(`[close] Соединение закрыто чисто, код=${event.code} причина=${event.reason}`);
  } else {
    // например, сервер убил процесс или сеть недоступна
    // обычно в этом случае event.code 1006
    console.log('[close] Соединение прервано');
  }
};

const onConnectError = (err: unknown) => {
  console.log('WS connect error', err);
};

export function WebsocketProvider({ children }: PropsWithChildren) {
  const { authenticated } = useAuthContext();
  const socketRef = useRef<WebSocket | null>(null);

  useEffect(() => {
    if (authenticated) {
      socketRef.current = new WebSocket('ws://91.226.234.195:1337/ws/notifications/');
    }

    socketRef.current?.addEventListener('open', onConnect);
    socketRef.current?.addEventListener('close', onDisconnect);
    socketRef.current?.addEventListener('error', onConnectError);
    socketRef.current?.addEventListener('message', (event) => {
      console.log(event.data);
    });

    return () => {
      socketRef.current?.removeEventListener('open', onConnect);
      socketRef.current?.removeEventListener('close', onDisconnect);
      socketRef.current?.removeEventListener('error', onConnectError);

      socketRef.current?.close();
    };
  }, [authenticated]);

  return <WebsocketContext.Provider value={socketRef}>{children}</WebsocketContext.Provider>;
}
