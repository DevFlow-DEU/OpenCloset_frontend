import type { ReactNode } from 'react';
import styles from './BottomConfirmBar.module.css';

type BottomConfirmBarProps = {
  children: ReactNode;
  showDivider?: boolean;
  className?: string;
};

export default function BottomConfirmBar({
  children,
  showDivider = true,
  className,
}: BottomConfirmBarProps) {
  const barClassName = className ? `${styles.bar} ${className}` : styles.bar;

  return (
    <div className={barClassName}>
      {showDivider ? <div className={styles.divider} /> : null}
      {children}
    </div>
  );
}
