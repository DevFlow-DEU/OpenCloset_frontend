import styles from './ChatBubble.module.css';

interface ChatBubbleProps {
  className?: string;
  children: React.ReactNode;
  variant?: 'me' | 'them';
}

export default function ChatBubble({
  children,
  className,
  variant = 'them',
}: ChatBubbleProps) {
  const variantStyle = variant === 'me' ? styles.fromMe : styles.fromThem;
  return (
    <>
      <div className={`${variantStyle} ${className || ''}`.trim()}>
        {typeof children === 'string' ? <p>{children}</p> : children}
      </div>
      <div className={styles.clear} />
    </>
  );
}
