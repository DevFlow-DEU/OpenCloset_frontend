import { useCallback, useEffect, useRef, useState } from 'react';
import { SlArrowLeft } from 'react-icons/sl';
import { MdGpsFixed } from 'react-icons/md';
import { Button } from '../Button/Button';
import type { DrawerProps } from '../Drawer/types';
import {
  loadKakaoMapSdk,
  renderKakaoMapWithMarker,
  fetchKakaoAddressByCoords,
} from './kakao';
import common from './common.module.css';
import styles from './Map.module.css';

type Coordinates = { latitude: number | null; longitude: number | null };

export default function Map({ onSelect, onClose }: DrawerProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const [coordinates, setCoordinates] = useState<Coordinates>({
    latitude: null,
    longitude: null,
  });
  const [addressText, setAddressText] = useState('주소를 불러오는 중입니다.');
  const [isMapLoading, setIsMapLoading] = useState(true);

  const updateLocation = useCallback(() => {
    if (!navigator.geolocation) return;
    navigator.geolocation.getCurrentPosition(
      ({ coords }) =>
        setCoordinates({
          latitude: coords.latitude,
          longitude: coords.longitude,
        }),
      (error) => console.error('현재 위치를 가져오지 못했습니다:', error)
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
    setIsMapLoading(true);

    const run = async () => {
      try {
        await loadKakaoMapSdk();
      } catch (e) {
        console.error(e);
      }

      if (!isCancelled && mapRef.current) {
        renderKakaoMapWithMarker(mapRef.current, latitude, longitude);
        if (!isCancelled) setIsMapLoading(false);
      }

      try {
        const address = await fetchKakaoAddressByCoords(latitude, longitude);
        if (!isCancelled)
          setAddressText(address ?? '주소를 확인할 수 없습니다.');
      } catch (e) {
        if (!isCancelled) {
          console.error(e);
          setAddressText('주소를 확인할 수 없습니다.');
        }
      }
    };

    run();
    return () => {
      isCancelled = true;
    };
  }, [coordinates]);

  return (
    <div className={common.container}>
      <button className={common.backButton} type="button" onClick={onClose}>
        <SlArrowLeft size={24} />
      </button>

      <div className={styles.headerbar} />
      <div className={common.mapSection}>
        <div ref={mapRef} className={common.map} />
        {isMapLoading && <div className={common.skeleton} />}
      </div>
      <div className={common.footer}>
        <p className={styles.addressLabel}>현재 위치 주소</p>
        <input className={styles.addressInput} value={addressText} readOnly />
        <Button variant="secondary" type="button" onClick={updateLocation}>
          <MdGpsFixed size={18} />
          위치 재설정
        </Button>
        <div className="space-40px" />
        <Button
          variant="primary"
          type="button"
          disabled={!addressText || addressText === '주소를 불러오는 중입니다.'}
          onClick={() => onSelect(addressText)}
        >
          선택완료
        </Button>
      </div>
    </div>
  );
}
