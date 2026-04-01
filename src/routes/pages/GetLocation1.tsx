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

type GetLocationProps = {
  onSelectAddress: (address: string) => void;
  onClose?: () => void;
};

export default function GetLocation({
  onSelectAddress,
  onClose,
}: GetLocationProps) {
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
        setCoordinates({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
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

    if (latitude === null || longitude === null || !mapRef.current) return;

    let isCancelled = false;

    setAddressText('주소를 불러오는 중입니다.');

    const renderMapAndFetchAddress = async () => {
      try {
        await loadKakaoMapSdk();

        if (!isCancelled && mapRef.current) {
          renderKakaoMapWithMarker(mapRef.current, latitude, longitude);
        }

        const regionAddress = await fetchKakaoAddressByCoords(
          latitude,
          longitude
        );

        if (!isCancelled) {
          setAddressText(regionAddress ?? '주소를 확인할 수 없습니다.');
        }
      } catch (error) {
        if (!isCancelled) {
          console.error(error);
          setAddressText('주소를 확인할 수 없습니다.');
        }
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
            type="text"
            value={addressText}
            readOnly
            aria-label="현재 위치 주소"
          />

          <button
            type="button"
            className={styles.resetButton}
            onClick={updateLocation}
          >
            <MdGpsFixed className={styles.resetIcon} />
            <span>위치 재설정</span>
          </button>

          <button
            type="button"
            className={styles.confirmButton}
            onClick={() => {
              onSelectAddress(addressText);
              onClose?.();
            }}
          >
            확인
          </button>
        </section>
      </main>
    </div>
  );
}