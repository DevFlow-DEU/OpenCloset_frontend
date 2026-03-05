import { useCallback, useEffect, useState } from 'react';
import { MdGpsFixed } from 'react-icons/md';
import styles from './GetLocation.module.css';

type Coordinates = {
  latitude: number | null;
  longitude: number | null;
};

export default function GetLocation() {
  const [coordinates, setCoordinates] = useState<Coordinates>({
    latitude: null,
    longitude: null,
  });

  const updateLocation = useCallback(() => {
    if (!navigator.geolocation) {
      console.error('이 브라우저에서는 위치 정보를 지원하지 않습니다.');
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const nextCoordinates = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        };

        setCoordinates(nextCoordinates);
        console.log('Current coordinates:', nextCoordinates);
      },
      (error) => {
        console.error('현재 위치를 가져오지 못했습니다:', error);
      }
    );
  }, []);

  useEffect(() => {
    updateLocation();
  }, [updateLocation]);

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
          <button
            type='button'
            className={styles.resetButton}
            onClick={updateLocation}
          >
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
