import { useEffect, useRef, RefObject, useMemo } from 'react';
import { debounce } from '@/utils/debounce';

export interface UseInfiniteScrollOptions {
  onLoadMore: () => void;
  hasMore: boolean;
  isLoading: boolean;
  threshold?: number;
  rootMargin?: string;
}

export function useInfiniteScroll({
  onLoadMore,
  hasMore,
  isLoading,
  threshold = 0.1,
  rootMargin = '50px',
}: UseInfiniteScrollOptions): {
  sentinelRef: RefObject<HTMLDivElement | null>;
} {
  const sentinelRef = useRef<HTMLDivElement | null>(null);
  const debouncedLoadMore = useMemo(
    () => debounce(onLoadMore, 200),
    [onLoadMore]
  );

  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry.isIntersecting && hasMore && !isLoading) {
          debouncedLoadMore();
        }
      },
      {
        threshold,
        rootMargin,
      }
    );

    observer.observe(sentinel);

    return () => {
      observer.disconnect();
    };
  }, [hasMore, isLoading, threshold, rootMargin, debouncedLoadMore]);

  return { sentinelRef };
}
