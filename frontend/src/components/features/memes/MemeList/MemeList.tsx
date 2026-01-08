import { Meme } from '@/types/meme';
import { MemeCard } from '../MemeCard';
import { Spinner } from '@/components/ui/Spinner';
import { ErrorMessage } from '@/components/ui/ErrorMessage';
import { useInfiniteScroll } from '@/hooks/useInfiniteScroll';
import styles from './MemeList.module.css';

interface MemeListProps {
  memes: Meme[];
  isLoading: boolean;
  isLoadingMore: boolean;
  error: string | null;
  hasMore: boolean;
  onLoadMore: () => void;
  onEditMeme: (meme: Meme) => void;
  onRetry: () => void;
}

export function MemeList({
  memes,
  isLoading,
  isLoadingMore,
  error,
  hasMore,
  onLoadMore,
  onEditMeme,
  onRetry,
}: MemeListProps) {
  const { sentinelRef } = useInfiniteScroll({
    onLoadMore,
    hasMore,
    isLoading: isLoadingMore,
  });

  if (isLoading) {
    return (
      <div className={styles.centerContainer}>
        <Spinner size="large" />
      </div>
    );
  }

  if (error && memes.length === 0) {
    return (
      <div className={styles.centerContainer}>
        <ErrorMessage message={error} onRetry={onRetry} />
      </div>
    );
  }

  if (memes.length === 0) {
    return (
      <div className={styles.centerContainer}>
        <p className={styles.emptyMessage}>No memes found</p>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.grid}>
        {memes.map((meme) => (
          <MemeCard key={meme.id} meme={meme} onEdit={onEditMeme} />
        ))}
      </div>

      <div ref={sentinelRef} className={styles.sentinel} />

      {isLoadingMore && (
        <div className={styles.loadingMore}>
          <Spinner size="medium" />
        </div>
      )}

      {error && memes.length > 0 && (
        <div className={styles.errorMore}>
          <ErrorMessage message={error} onRetry={onRetry} />
        </div>
      )}

      {!hasMore && memes.length > 0 && (
        <div className={styles.endMessage}>
          <p>You&apos;ve seen all memes!</p>
        </div>
      )}
    </div>
  );
}
