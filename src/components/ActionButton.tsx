import type { ButtonHTMLAttributes } from 'react';
import styles from './ActionButton.module.css';

interface ActionButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  fullWidth?: boolean;
}

export default function ActionButton({
  children,
  className,
  fullWidth = false,
  ...buttonProps
}: ActionButtonProps) {
  const buttonClassName = [
    styles.button,
    fullWidth ? styles.fullWidth : '',
    className ?? '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <button {...buttonProps} className={buttonClassName}>
      {children}
    </button>
  );
}
