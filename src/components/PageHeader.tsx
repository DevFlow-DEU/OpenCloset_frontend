import { ChevronLeft } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import styles from './PageHeader.module.css';

type PageHeaderProps = {
  title: string;
  to?: string;
};

export default function PageHeader({ title, to }: PageHeaderProps) {
  const navigate = useNavigate();

  return (
    <div className={styles.header}>
      <div className={styles.notch} />
      <div className={styles.content}>
        {to ? (
          <Link to={to} className={styles.backButton} aria-label='뒤로가기'>
            <ChevronLeft size={35} />
          </Link>
        ) : (
          <button
            type='button'
            className={styles.backButton}
            onClick={() => navigate(-1)}
            aria-label='뒤로가기'
          >
            <ChevronLeft size={35} />
          </button>
        )}
        <h2>{title}</h2>
      </div>
    </div>
  );
}
