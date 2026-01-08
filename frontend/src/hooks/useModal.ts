import { useState, useCallback } from 'react';

const MODAL_CLOSE_ANIMATION_MS = 200;

export interface UseModal<T> {
  isOpen: boolean;
  data: T | null;
  open: (data: T) => void;
  close: () => void;
}

export function useModal<T = unknown>(): UseModal<T> {
  const [isOpen, setIsOpen] = useState(false);
  const [data, setData] = useState<T | null>(null);

  const open = useCallback((modalData: T) => {
    setData(modalData);
    setIsOpen(true);
  }, []);

  const close = useCallback(() => {
    setIsOpen(false);
    setTimeout(() => setData(null), MODAL_CLOSE_ANIMATION_MS);
  }, []);

  return {
    isOpen,
    data,
    open,
    close,
  };
}
