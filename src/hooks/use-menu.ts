import { useState, MouseEvent, useCallback } from 'react';

export function useMenu() {
  const [anchor, setAnchor] = useState<null | HTMLElement>(null);

  const onOpen = useCallback(
    ({ currentTarget }: MouseEvent<HTMLElement>) => setAnchor(currentTarget),
    []
  );

  const onClose = useCallback(() => setAnchor(null), []);

  const open = Boolean(anchor);

  return {
    open,
    anchor,
    onOpen,
    onClose,
    setAnchor,
  };
}
