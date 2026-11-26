import type {
  ChangeEvent,
  Dispatch,
  MouseEventHandler,
  SetStateAction,
} from 'react';
import styles from './ChatBar.module.css';
import PhotoDeleteIcon from '../../../assets/icon/chat_bar_delete.svg?react';
import PhotoAddIcon from '../../../assets/icon/chat_bar_add.svg?react';
import SendIcon from '../../../assets/icon/chat_bar_send.svg?react';
import SendIconDisabled from '../../../assets/icon/chat_bar_send_disabled.svg?react';
import { type Message, type Photo } from '../types';

interface Props {
  message: Message;
  setMessage: Dispatch<SetStateAction<Message>>;
  onClickSendButton: MouseEventHandler<HTMLButtonElement>;
  onFileError?: (message: string) => void;
  isSending?: boolean;
  className?: string;
}

export default function ChatBar({
  message,
  onClickSendButton,
  setMessage,
  onFileError,
  isSending = false,
  className,
}: Props) {
  const deletePhoto = (uuid: string) => {
    setMessage((message) => {
      message.photos
        .filter((photo) => photo.uuid === uuid)
        .forEach(({ src }) => URL.revokeObjectURL(src));
      const PhotosToUpdate = message.photos.filter(
        (photo) => photo.uuid !== uuid
      );
      return { ...message, photos: PhotosToUpdate };
    });
  };
  const addPhotos = (newPhotos: Photo[]) => {
    setMessage((message) => {
      return { ...message, photos: [...message.photos, ...newPhotos] };
    });
  };
  const handleDeletePhotoClick = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    deletePhoto(event.currentTarget.value);
  };
  const fileToPhoto = (file: File) => {
    const src = URL.createObjectURL(file);
    const uuid = new URL(src).pathname.split('/').pop();
    if (!uuid) {
      throw new Error('파일 사진 객체 변환 실패');
    }
    return { src, uuid, file };
  };
  const handleFileUpload = async (event: ChangeEvent<HTMLInputElement>) => {
    if (!event.currentTarget.files) {
      return;
    }
    const fileArray = Array.from(event.currentTarget.files);
    event.currentTarget.value = '';

    const validFiles: File[] = [];
    let validationError: string | null = null;
    for (const file of fileArray) {
      if (!['image/jpeg', 'image/png'].includes(file.type)) {
        validationError = 'JPEG 또는 PNG 사진만 보낼 수 있습니다.';
        continue;
      }
      if (file.size > 2 * 1024 * 1024) {
        validationError = '사진은 한 장당 2MB 이하로 보내주세요.';
        continue;
      }

      try {
        const bitmap = await createImageBitmap(file);
        const withinPixelLimit = bitmap.width * bitmap.height <= 12_000_000;
        bitmap.close();
        if (!withinPixelLimit) {
          validationError = '사진은 1,200만 픽셀 이하만 보낼 수 있습니다.';
          continue;
        }
      } catch {
        validationError = '사진 파일을 확인하지 못했습니다.';
        continue;
      }
      validFiles.push(file);
    }

    if (validationError) onFileError?.(validationError);
    if (validFiles.length > 0) addPhotos(validFiles.map(fileToPhoto));
  };
  const handleTextChange = (event: ChangeEvent<HTMLInputElement>) => {
    setMessage((message) => {
      return { ...message, text: event.target.value };
    });
  };
  const isEmpty = message.text.length + message.photos.length === 0;
  return (
    <div className={`${styles.container} ${className ?? ''}`.trim()}>
      {message.photos.length > 0 ? (
        <div className={styles.photoBar}>
          {message.photos.map((photo, index) => (
            <div className={styles.photoPreview} key={photo.uuid}>
              <button
                value={photo.uuid}
                className={styles.photoDeleteButton}
                onClick={handleDeletePhotoClick}
                disabled={isSending}
              >
                <PhotoDeleteIcon />
              </button>
              <img src={photo.src} alt={`uploaded photo ${index}`} />
            </div>
          ))}
        </div>
      ) : null}
      {message.photos.length > 0 ? <hr className={styles.divider} /> : null}
      <div className={styles.inputBar}>
        <div>
          <label htmlFor="photo-upload">
            <PhotoAddIcon />
          </label>
          <input
            type="file"
            name="photo-upload"
            id="photo-upload"
            onChange={handleFileUpload}
            accept="image/jpeg,image/png"
            multiple
            disabled={isSending}
          />
        </div>
        <input
          type="text"
          className={styles.textInput}
          placeholder="메시지 보내기"
          value={message.text}
          onChange={handleTextChange}
          disabled={isSending}
        />
        <button
          className={styles.sendButton}
          onClick={onClickSendButton}
          disabled={isEmpty || isSending}
        >
          {isEmpty || isSending ? <SendIconDisabled /> : <SendIcon />}
        </button>
      </div>
    </div>
  );
}
