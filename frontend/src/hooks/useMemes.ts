'use client';

import { useState, useCallback, useRef, useEffect } from 'react';
import { Meme } from '@/types/meme';
import { getMemes, updateMeme } from '@/services/api/memes';

export interface UseMemes {
  memes: Meme[];
  isLoading: boolean;
  isLoadingMore: boolean;
  error: string | null;
  hasMore: boolean;
  loadMore: () => void;
  updateMeme: (id: string, name: string) => Promise<void>;
  retry: () => void;
}

const PAGE_LIMIT = 10;

export function useMemes(): UseMemes {
  const [memes, setMemes] = useState<Meme[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [cursor, setCursor] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState(true);

  const abortControllerRef = useRef<AbortController | null>(null);
  const isLoadingRef = useRef(false);

  const fetchMemes = useCallback(
    async (reset = false) => {
      if (isLoadingRef.current && !reset) return;

      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }

      abortControllerRef.current = new AbortController();
      isLoadingRef.current = true;

      try {
        if (reset) {
          setIsLoading(true);
          setError(null);
        } else {
          setIsLoadingMore(true);
        }

        const response = await getMemes(
          {
            limit: PAGE_LIMIT,
            cursor: reset ? undefined : cursor || undefined,
          },
          abortControllerRef.current.signal
        );

        setMemes((prev) => (reset ? response.data : [...prev, ...response.data]));
        setCursor(response.nextCursor);
        setHasMore(response.hasMore);
        setError(null);
      } catch (err) {
        if (err instanceof Error && err.name !== 'AbortError') {
          setError(err.message || 'Failed to load memes');
        }
      } finally {
        setIsLoading(false);
        setIsLoadingMore(false);
        isLoadingRef.current = false;
      }
    },
    [cursor]
  );

  useEffect(() => {
    fetchMemes(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const loadMore = useCallback(() => {
    if (!hasMore || isLoadingRef.current) return;
    fetchMemes(false);
  }, [hasMore, fetchMemes]);

  const updateMemeHandler = useCallback(
    async (id: string, name: string) => {
      const updatedMeme = await updateMeme(id, { name });

      setMemes((prev) =>
        prev.map((meme) => (meme.id === id ? updatedMeme : meme))
      );
    },
    []
  );

  const retry = useCallback(() => {
    fetchMemes(true);
  }, [fetchMemes]);

  return {
    memes,
    isLoading,
    isLoadingMore,
    error,
    hasMore,
    loadMore,
    updateMeme: updateMemeHandler,
    retry,
  };
}
