import styles from './ChatBubble.module.css';

interface ChatBubbleProps {
  children: React.ReactNode;
  variant?: 'me' | 'them';
}

export default function ChatBubble({
  children,
  variant = 'them',
}: ChatBubbleProps) {
  const className = variant === 'me' ? styles.fromMe : styles.fromThem;

  return (
    <div className={styles.wrapper}>
      <div className={className}>
        {typeof children === 'string' ? <p>{children}</p> : children}
      </div>
      <div className={styles.clear} />
    </div>
  );
}
