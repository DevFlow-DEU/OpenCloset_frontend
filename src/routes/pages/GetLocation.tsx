import { MdGpsFixed } from 'react-icons/md';
import styles from './GetLocation.module.css';

export default function GetLocation() {
  return (
    <div className={styles.page}>
      <main className={styles.content}>
        <section className={styles.mapSection}>
          <div className={styles.mapPlaceholder}>
            <h1 className={styles.mapTitle}>지도</h1>
          </div>
        </section>

        <section className={styles.addressSection}>
          <input
            className={styles.addressInput}
            type='text'
            value='현재 위치 기반 주소'
            readOnly
            aria-label='현재 위치 주소'
          />
          <button type='button' className={styles.resetButton}>
            <MdGpsFixed className={styles.resetIcon} />
            <span>위치 재설정</span>
          </button>
        </section>
      </main>
      <div className={styles.confirmBar}>
        <div className={styles.confirmDivider} />
        <button type='button' className={styles.confirmButton}>
          확인
        </button>
      </div>
    </div>
  );
}
