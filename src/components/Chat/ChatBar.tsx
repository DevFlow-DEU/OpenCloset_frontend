import type {
  ChangeEvent,
  Dispatch,
  MouseEventHandler,
  SetStateAction,
} from 'react';
import styles from './ChatBar.module.css';
import PhotoDeleteIcon from '../../assets/icon/chat_bar_delete.svg?react';
import PhotoAddIcon from '../../assets/icon/chat_bar_add.svg?react';
import SendIcon from '../../assets/icon/chat_bar_send.svg?react';
import SendIconDisabled from '../../assets/icon/chat_bar_send_disabled.svg?react';
import { type Message, type Photo } from '../../types/chat';

interface Props {
  message: Message;
  setMessage: Dispatch<SetStateAction<Message>>;
  onClickSendButton: MouseEventHandler<HTMLButtonElement>;
  className?: string;
}

export default function ChatBar({
  message,
  onClickSendButton,
  setMessage,
  className,
}: Props) {
  const deletePhoto = (uuid: string) => {
    setMessage((message) => {
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
    const srcURL = URL.parse(src)?.pathname;
    const uuid = URL.parse(srcURL ?? '')?.pathname.split('/')[1];
    if (!src || !uuid) {
      throw new Error('파일 사진 객체 변환 실패');
    }
    return { src, uuid, file };
  };
  const handleFileUpload = async (event: ChangeEvent<HTMLInputElement>) => {
    if (!event.currentTarget.files) {
      return;
    }
    const fileArray = Array.from(event.currentTarget.files);
    const newPhotos = fileArray.map(fileToPhoto);
    addPhotos(newPhotos);
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
            multiple
          />
        </div>
        <input
          type="text"
          className={styles.textInput}
          placeholder="메시지 보내기"
          value={message.text}
          onChange={handleTextChange}
        />
        <button
          className={styles.sendButton}
          onClick={onClickSendButton}
          disabled={isEmpty}
        >
          {isEmpty ? <SendIconDisabled /> : <SendIcon />}
        </button>
      </div>
    </div>
  );
}
