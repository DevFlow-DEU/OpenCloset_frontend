import { useCallback, useEffect, useRef, useState } from 'react';
import { MdGpsFixed } from 'react-icons/md';
import {
  fetchKakaoAddressByCoords,
  loadKakaoMapSdk,
  renderKakaoMapWithMarker,
} from './getLocationMap';
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
  const [addressText, setAddressText] = useState('현재 위치 기반 주소');
  const mapRef = useRef<HTMLDivElement | null>(null);

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

  useEffect(() => {
    const { latitude, longitude } = coordinates;

    if (latitude === null || longitude === null || !mapRef.current) {
      return;
    }

    const lat = latitude;
    const lng = longitude;
    let isCancelled = false;

    setAddressText('주소를 불러오는 중입니다.');

    const renderMapAndFetchAddress = async () => {
      try {
        await loadKakaoMapSdk();
      } catch (error) {
        console.error('카카오 지도 SDK를 불러오지 못했습니다.', error);
      }

      if (!isCancelled && mapRef.current) {
        renderKakaoMapWithMarker(mapRef.current, lat, lng);
      }

      try {
        const regionAddress = await fetchKakaoAddressByCoords(lat, lng);
        if (isCancelled) {
          return;
        }
        setAddressText(regionAddress ?? '주소를 확인할 수 없습니다.');
      } catch (error) {
        if (isCancelled) {
          return;
        }
        console.error('좌표 기반 주소를 가져오지 못했습니다.', error);
        setAddressText('주소를 확인할 수 없습니다.');
      }
    };

    renderMapAndFetchAddress();

    return () => {
      isCancelled = true;
    };
  }, [coordinates]);

  return (
    <div className={styles.page}>
      <main className={styles.content}>
        <section className={styles.mapSection}>
          <div ref={mapRef} className={styles.mapContainer} />
          {coordinates.latitude === null || coordinates.longitude === null ? (
            <p className={styles.mapLoadingText}>
              현재 위치를 불러오는 중입니다.
            </p>
          ) : null}
        </section>

        <section className={styles.addressSection}>
          <input
            className={styles.addressInput}
            type='text'
            value={addressText}
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
