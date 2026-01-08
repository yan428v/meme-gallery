import { memo } from 'react';
import Image from 'next/image';
import { Meme } from '@/types/meme';
import { Button } from '@/components/ui/Button';
import styles from './MemeCard.module.css';

interface MemeCardProps {
  meme: Meme;
  onEdit: (meme: Meme) => void;
}

export const MemeCard = memo(function MemeCard({ meme, onEdit }: MemeCardProps) {
  return (
    <div className={styles.card}>
      <div className={styles.imageContainer}>
        <Image
          src={meme.imageUrl}
          alt={meme.name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className={styles.image}
        />
      </div>
      <div className={styles.content}>
        <h3 className={styles.title}>{meme.name}</h3>
        <Button onClick={() => onEdit(meme)} variant="primary">
          Edit
        </Button>
      </div>
    </div>
  );
});
