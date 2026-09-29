import { useCallback, useEffect, useRef, useState } from 'react';
import { MdGpsFixed } from 'react-icons/md';
import {
  fetchKakaoAddressByCoords,
  loadKakaoMapSdk,
  renderKakaoMapWithMarker,
} from '../../../components/Map/getLocationMap';
import '../../../components/share.css';
import styles from './ChangeAddress.module.css';
import { useNavigate } from 'react-router-dom';
import Header from '../../../components/Header.tsx';
import BottomConfirmBar from '../../../components/BottomConfirmBar';
import { useChangeAddress } from '../hooks';
import { ApiError, getApiErrorMessage } from '../../../api/http';
import { getAccessToken } from '../../../api/token';

type Coordinates = {
  latitude: number | null;
  longitude: number | null;
};

export default function ChangeAddress() {
  const navigate = useNavigate();
  const token = getAccessToken();
  const changeAddress = useChangeAddress();

  const [coordinates, setCoordinates] = useState<Coordinates>({
    latitude: null,
    longitude: null,
  });
  const [addressText, setAddressText] = useState('현재 위치 기반 주소');
  const mapRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!token) navigate('/login');
  }, [token, navigate]);

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

  const submitAddress = () => {
    changeAddress.mutate(addressText, {
      onSuccess: () => {
        alert('주소 수정에 성공했습니다. 마이페이지로 이동합니다.');
        navigate('/MyPage');
      },
      onError: (error) => {
        if (error instanceof ApiError && error.status === 400) {
          alert(getApiErrorMessage(error, '요청이 올바르지 않습니다.'));
        } else if (error instanceof ApiError && error.status === 401) {
          alert('주소를 수정할 권한이 없습니다.');
        } else {
          alert('현재 주소 수정을 이용할 수 없습니다. 잠시후 이용해주세요.');
        }
      },
    });
  };

  return (
    <div className={styles.page}>
      <Header title="주소 변경" />
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
          <p className="SHinput-tittle">현재 위치 주소</p>
          <input
            className="SHinput"
            type="text"
            value={addressText}
            readOnly
            aria-label="현재 위치 주소"
          />
          <div className="SHinput-bar"></div>
          <button
            type="button"
            className={`SHsubmit check ${styles.resetButton}`}
            onClick={updateLocation}
          >
            <MdGpsFixed className={styles.resetIcon} />
            <span>위치 재설정</span>
          </button>
        </section>
      </main>
      <BottomConfirmBar>
        <button
          type="button"
          className="SHsubmit check"
          onClick={submitAddress}
        >
          주소 변경
        </button>
      </BottomConfirmBar>
    </div>
  );
}
