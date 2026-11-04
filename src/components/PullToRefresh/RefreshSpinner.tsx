import styles from './RefreshSpinner.module.css';

export default function RefreshSpinner() {
  return (
    <div className={styles.loader}>
      <div className={styles.spoke}>
        <div className={styles.dot} />
      </div>
      <div className={styles.spoke}>
        <div className={styles.dot} />
      </div>
      <div className={styles.spoke}>
        <div className={styles.dot} />
      </div>
    </div>
  );
}
