'use client';

import { MemeList } from '@/components/features/memes/MemeList';
import { MemeEditModal } from '@/components/features/memes/MemeEditModal';
import { useMemes } from '@/hooks/useMemes';
import { useModal } from '@/hooks/useModal';
import { Meme } from '@/types/meme';
import styles from './page.module.css';

export default function Home() {
  const {
    memes,
    isLoading,
    isLoadingMore,
    error,
    hasMore,
    loadMore,
    updateMeme,
    retry,
  } = useMemes();

  const editModal = useModal<Meme>();

  const handleSaveMeme = async (id: string, name: string) => {
    await updateMeme(id, name);
  };

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <h1 className={styles.title}>Meme Gallery</h1>
      </header>

      <main className={styles.main}>
        <MemeList
          memes={memes}
          isLoading={isLoading}
          isLoadingMore={isLoadingMore}
          error={error}
          hasMore={hasMore}
          onLoadMore={loadMore}
          onEditMeme={editModal.open}
          onRetry={retry}
        />
      </main>

      <MemeEditModal
        meme={editModal.data}
        isOpen={editModal.isOpen}
        onClose={editModal.close}
        onSave={handleSaveMeme}
      />
    </div>
  );
}
