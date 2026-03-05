const KAKAO_MAP_SCRIPT_ID = 'kakao-map-sdk';
const mapInstances = new WeakMap<
  HTMLDivElement,
  { map: KakaoMapInstance; marker: KakaoMarkerInstance }
>();

type KakaoLatLng = unknown;
type KakaoMapInstance = {
  setCenter: (latLng: KakaoLatLng) => void;
  relayout: () => void;
};
type KakaoMarkerInstance = {
  setPosition: (latLng: KakaoLatLng) => void;
};

export const loadKakaoMapSdk = async () => {
  if (window.kakao?.maps) {
    return;
  }

  const appKey = import.meta.env.VITE_KAKAO_JS;
  if (!appKey) {
    throw new Error('VITE_KAKAO_JS 환경 변수가 설정되지 않았습니다.');
  }

  await new Promise<void>((resolve, reject) => {
    const existingScript = document.getElementById(
      KAKAO_MAP_SCRIPT_ID
    ) as HTMLScriptElement | null;

    if (existingScript) {
      existingScript.addEventListener('load', () => resolve(), { once: true });
      existingScript.addEventListener(
        'error',
        () => reject(new Error('카카오 지도 SDK 로드에 실패했습니다.')),
        { once: true }
      );
      return;
    }

    const script = document.createElement('script');
    script.id = KAKAO_MAP_SCRIPT_ID;
    script.async = true;
    script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${appKey}&autoload=false`;
    script.addEventListener('load', () => resolve(), { once: true });
    script.addEventListener(
      'error',
      () => reject(new Error('카카오 지도 SDK 로드에 실패했습니다.')),
      { once: true }
    );

    document.head.appendChild(script);
  });
};

export const renderKakaoMapWithMarker = (
  container: HTMLDivElement,
  latitude: number,
  longitude: number
) => {
  if (!window.kakao?.maps) {
    return;
  }

  window.kakao.maps.load(() => {
    if (!window.kakao?.maps) {
      return;
    }

    const position = new window.kakao.maps.LatLng(latitude, longitude);
    const existingInstance = mapInstances.get(container);

    if (existingInstance) {
      existingInstance.map.setCenter(position);
      existingInstance.marker.setPosition(position);
      existingInstance.map.relayout();
      return;
    }

    const map = new window.kakao.maps.Map(container, {
      center: position,
      level: 3,
    }) as KakaoMapInstance;

    const marker = new window.kakao.maps.Marker({
      map,
      position,
    }) as KakaoMarkerInstance;

    mapInstances.set(container, { map, marker });
  });
};
