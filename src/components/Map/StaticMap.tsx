import { useEffect, useRef } from 'react';
import { loadKakaoMapSdk, renderKakaoMapWithMarker } from './kakao';
import styles from './StaticMap.module.css';

type Props = {
  latitude: number;
  longitude: number;
};

export default function StaticMap({ latitude, longitude }: Props) {
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mapRef.current) return;
    let isCancelled = false;

    const run = async () => {
      try {
        await loadKakaoMapSdk();
      } catch (e) {
        console.error(e);
        return;
      }
      if (!isCancelled && mapRef.current) {
        renderKakaoMapWithMarker(mapRef.current, latitude, longitude);
      }
    };

    run();
    return () => {
      isCancelled = true;
    };
  }, [latitude, longitude]);

  return <div ref={mapRef} className={styles.staticMap} />;
}
