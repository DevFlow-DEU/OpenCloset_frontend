import State, { type StateType } from '../../../components/State/State';
import styles from './ChatItem.module.css';

type Props = {
  itemImage: string;
  userImage: string;
  name: string;
  message: string;
  time: string;
  unread: number;
  status?: StateType;
  onClick?: () => void;
  className?: string;
};

export default function ChatItem({
  itemImage,
  userImage,
  name,
  message,
  time,
  unread,
  status,
  onClick,
  className,
}: Props) {
  return (
    <div
      className={`${styles.item}${className ? ` ${className}` : ''}`}
      onClick={onClick}
    >
      <div className={styles.imageGroup}>
        <img className={styles.rectImage} src={itemImage} alt="" />
        <div className={styles.circleWrapper}>
          <img className={styles.circleImage} src={userImage} alt="" />
        </div>
      </div>
      <div className={styles.content}>
        <div className={styles.text}>
          <div className={styles.nameRow}>
            <span className={styles.name}>{name}</span>
            {status && <State state={status} />}
          </div>
          <span className={styles.message}>{message}</span>
        </div>
        <div className={styles.meta}>
          <span className={styles.time}>{time}</span>
          {unread > 0 && (
            <span className={styles.badge}>{unread > 9 ? '9+' : unread}</span>
          )}
        </div>
      </div>
    </div>
  );
}
