import { memo } from 'react';
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
        <img
          src={meme.imageUrl}
          alt={meme.name}
          loading="lazy"
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
