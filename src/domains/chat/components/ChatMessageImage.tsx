import { useEffect, useState } from 'react';
import { getChatMessageImage } from '../api';
import styles from './ChatMessageImage.module.css';

interface Props {
  roomId: string;
  messageId: number;
  alt: string;
}

export default function ChatMessageImage({ roomId, messageId, alt }: Props) {
  const [src, setSrc] = useState<string | null>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    let active = true;
    let objectUrl: string | null = null;

    void getChatMessageImage(roomId, messageId)
      .then((image) => {
        if (!image) throw new Error('이미지가 비어 있습니다.');
        objectUrl = URL.createObjectURL(image);
        if (active) setSrc(objectUrl);
      })
      .catch(() => {
        if (active) setFailed(true);
      });

    return () => {
      active = false;
      if (objectUrl) URL.revokeObjectURL(objectUrl);
    };
  }, [messageId, roomId]);

  return src ? (
    <img className={styles.image} src={src} alt={alt} />
  ) : (
    <div className={styles.placeholder} role="img" aria-label={alt}>
      {failed ? '사진을 불러오지 못했습니다.' : '사진을 불러오는 중…'}
    </div>
  );
}
