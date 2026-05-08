import type { ButtonHTMLAttributes, ReactNode } from 'react';
import styles from './Button.module.css';
interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant: 'primary' | 'secondary';
  children: ReactNode;
}

const variants = {
  primary: styles.primary,
  secondary: styles.secondary,
};

export function Button({ variant, children, className, ...props }: Props) {
  return (
    <button
      className={`${styles.button} ${variants[variant]} ${
        props.disabled ? styles.disabled : ''
      } ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
