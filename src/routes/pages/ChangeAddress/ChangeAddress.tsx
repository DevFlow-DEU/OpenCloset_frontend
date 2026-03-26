import { useCallback, useEffect, useRef, useState } from 'react';
import { MdGpsFixed } from 'react-icons/md';
import {
  fetchKakaoAddressByCoords,
  loadKakaoMapSdk,
  renderKakaoMapWithMarker,
} from '../getLocationMap';
import styles from './ChangeAddress.module.css';
import { useNavigate } from 'react-router-dom';
import PageHeader from '../../../components/PageHeader';
import BottomConfirmBar from '../../../components/BottomConfirmBar';
import { client } from '../../../api/client';
import { useMutation } from '@tanstack/react-query';
type Coordinates = {
  latitude: number | null;
  longitude: number | null;
};

export default function ChangeAdress() {
  const token = localStorage.getItem('token');
  const mutation = useMutation({
    mutationFn: () =>
      client.PUT('/mypage/address', {
        body: {
          newAddress: addressText,
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
    onError: (error) => {
      alert(`에러 발생\n\n${error}`);
    },
    onSuccess: async (data) => {
      if (data.response.status === 200) {
        alert('주소 수정에 성공했습니다. 마이페이지로 이동합니다.');
        navigate('/MyPage');
      } else if (data.response.status === 400) {
        const errorBody = data.error as { message?: string };
        alert(errorBody?.message ?? '요청이 올바르지 않습니다.');
      } else if (data.response.status === 401) {
        alert('주소를 수정할 권한이 없습니다.');
      } else {
        alert('현재 주소 수정을 이용할 수 없습니다. 잠시후 이용해주세요.');
      }
    },
  });
  const navigate = useNavigate();
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
    if (!token) navigate('/login');
  }, [token, navigate]);
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
      <PageHeader title='주소 변경' />
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
      <BottomConfirmBar>
        <button
          type='button'
          className={styles.confirmButton}
          onClick={() => {
            mutation.mutate();
          }}
        >
          주소 변경
        </button>
      </BottomConfirmBar>
    </div>
  );
}
