'use client';

import { useState, useEffect } from 'react';
import { Meme } from '@/types/meme';
import { Modal } from '@/components/ui/Modal';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import styles from './MemeEditModal.module.css';

interface MemeEditModalProps {
  meme: Meme | null;
  isOpen: boolean;
  onClose: () => void;
  onSave: (id: string, name: string) => Promise<void>;
}

export function MemeEditModal({
  meme,
  isOpen,
  onClose,
  onSave,
}: MemeEditModalProps) {
  const [name, setName] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (meme) {
      setName(meme.name);
      setError(null);
    }
  }, [meme]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!meme) return;

    const trimmedName = name.trim();
    if (!trimmedName) {
      setError('Name cannot be empty');
      return;
    }

    setIsSaving(true);
    setError(null);

    try {
      await onSave(meme.id, trimmedName);
      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save meme');
    } finally {
      setIsSaving(false);
    }
  };

  const handleClose = () => {
    if (!isSaving) {
      onClose();
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose} title="Edit Meme">
      <form onSubmit={handleSubmit} className={styles.form}>
        <Input
          label="Meme Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          disabled={isSaving}
          error={error || undefined}
          autoFocus
        />

        <div className={styles.actions}>
          <Button
            type="button"
            variant="secondary"
            onClick={handleClose}
            disabled={isSaving}
          >
            Cancel
          </Button>
          <Button type="submit" variant="primary" isLoading={isSaving}>
            Save
          </Button>
        </div>
      </form>
    </Modal>
  );
}
