import { io } from 'socket.io-client';
import { useRef, useEffect, createContext, PropsWithChildren } from 'react';

export const WebsocketContext = createContext({});

export type Socket = ReturnType<typeof io>;

export function WebsocketProvider({ children }: PropsWithChildren) {
  // const client = useRef<Socket | null>(null);
  const client = useRef<WebSocket | null>(null);

  // http://91.226.234.195:1337/api/edm/ws/notifications/

  useEffect(() => {
    // const socket = io('', {
    //   path: '/api/edm/ws/notifications',
    // });
    const socket = new WebSocket('ws://91.226.234.195:1337/api/edm/ws/notifications/');

    const onConnect = () => console.log('WS connect');
    const onDisconnect = () => console.log('WS disconnect');
    const onConnectError = (err: unknown) => console.log('WS connect error', err);

    // socket.on('connect', onConnect);
    socket.onopen = onConnect;

    // socket.on('disconnect', onDisconnect);
    socket.onclose = onDisconnect;

    // socket.on('connect_error', onConnectError);
    socket.onerror = onConnectError;

    client.current = socket;

    return () => {
      socket.close();
      // socket.off('connect', onConnect);
      // socket.off('disconnect', onDisconnect);
      // socket.off('connect_error', onConnectError);
    };
  }, []);

  return <WebsocketContext.Provider value={client}>{children}</WebsocketContext.Provider>;
}
