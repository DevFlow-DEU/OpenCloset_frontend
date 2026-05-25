const KAKAO_MAP_SCRIPT_ID = 'kakao-map-sdk'

type KakaoLatLng = unknown
type KakaoMapInstance = {
    setCenter: (latLng: KakaoLatLng) => void
    relayout: () => void
    getCenter: () => { getLat: () => number; getLng: () => number }
}
type KakaoMarkerInstance = {
    setPosition: (latLng: KakaoLatLng) => void
}

const mapInstances = new WeakMap<
    HTMLDivElement,
    { map: KakaoMapInstance; marker: KakaoMarkerInstance }
>()


export const loadKakaoMapSdk = async () => {
    if (window.kakao?.maps) return

    const appKey = import.meta.env.VITE_KAKAO_JS
    if (!appKey) throw new Error('VITE_KAKAO_JS 환경 변수가 설정되지 않았습니다.')

    await new Promise<void>((resolve, reject) => {
        const existing = document.getElementById(KAKAO_MAP_SCRIPT_ID) as HTMLScriptElement | null
        if (existing) {
            existing.addEventListener('load', () => resolve(), { once: true })
            existing.addEventListener('error', () => reject(new Error('카카오 지도 SDK 로드 실패')), { once: true })
            return
        }
        const script = document.createElement('script')
        script.id = KAKAO_MAP_SCRIPT_ID
        script.async = true
        script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${appKey}&autoload=false&libraries=services`
        script.addEventListener('load', () => resolve(), { once: true })
        script.addEventListener('error', () => reject(new Error('카카오 지도 SDK 로드 실패')), { once: true })
        document.head.appendChild(script)
    })
}

export const renderKakaoMapWithMarker = (
    container: HTMLDivElement,
    latitude: number,
    longitude: number
) => {
    const maps = window.kakao?.maps
    if (!maps) return

    maps.load(() => {
        const maps2 = window.kakao?.maps
        if (!maps2) return

        const position = new maps2.LatLng(latitude, longitude)
        const existing = mapInstances.get(container)

        if (existing) {
            existing.map.setCenter(position)
            existing.marker.setPosition(position)
            existing.map.relayout()
            return
        }

        const map = new maps2.Map(container, { center: position, level: 3 }) as KakaoMapInstance
        const marker = new maps2.Marker({ map, position }) as KakaoMarkerInstance
        mapInstances.set(container, { map, marker })
    })
}

export const renderKakaoMapDraggable = (
    container: HTMLDivElement,
    latitude: number,
    longitude: number,
    onDragEnd: (lat: number, lng: number) => void
) => {
    const maps = window.kakao?.maps
    if (!maps) return

    maps.load(() => {
        const maps2 = window.kakao?.maps
        if (!maps2) return

        const position = new maps2.LatLng(latitude, longitude)
        const map = new maps2.Map(container, { center: position, level: 3 }) as KakaoMapInstance

        maps2.event.addListener(map, 'dragend', () => {
            const center = map.getCenter()
            onDragEnd(center.getLat(), center.getLng())
        })
    })
}

export const fetchKakaoAddressByCoords = (
    latitude: number,
    longitude: number
): Promise<string | null> => {
    return new Promise((resolve) => {
        const maps = window.kakao?.maps
        if (!maps) { resolve(null); return }

        maps.load(() => {
            const kakao = (window as any).kakao
            if (!kakao?.maps?.services) { resolve(null); return }

            const geocoder = new kakao.maps.services.Geocoder()
            geocoder.coord2RegionCode(longitude, latitude, (result: any[], status: string) => {
                if (status !== kakao.maps.services.Status.OK) { resolve(null); return }

                const region = result.find((r: any) => r.region_type === 'H') || result[0]
                if (!region) { resolve(null); return }

                const parts = [
                    region.region_1depth_name,
                    region.region_2depth_name,
                    region.region_3depth_name,
                ].filter((p: string) => Boolean(p?.trim()))

                resolve(parts.length > 0 ? parts.join(' ') : null)
            })
        })
    })
}
