import { useAuthContext } from 'auth/hooks';
import useWebsocket from 'react-use-websocket';
import { useMemo, createContext, PropsWithChildren } from 'react';

export const WebsocketContext = createContext({});

const onOpen = (_event: WebSocketEventMap['open']) => {
  console.log('WS connect');
};

const onClose = (event: WebSocketEventMap['close']) => {
  if (event.wasClean) {
    console.log(`[close] Соединение закрыто чисто, код=${event.code} причина=${event.reason}`);
  } else {
    // например, сервер убил процесс или сеть недоступна
    // обычно в этом случае event.code 1006
    console.log('[close] Соединение прервано');
  }
};

const onError = (_event: WebSocketEventMap['error']) => {
  console.log('WS connect error');
};

const wsUrl = '/ws/notifications/';

export function WebsocketProvider({ children }: PropsWithChildren) {
  const { authenticated } = useAuthContext();

  const url = useMemo(() => (authenticated ? wsUrl : ''), [authenticated]);

  const { sendJsonMessage } = useWebsocket(url, {
    onOpen,
    onError,
    onClose,
    share: true,
    shouldReconnect: () => authenticated,
  });

  const value = useMemo(() => ({ send: sendJsonMessage }), [sendJsonMessage]);

  return <WebsocketContext.Provider value={value}>{children}</WebsocketContext.Provider>;
}
