import { useCallback, useEffect, useRef, useState } from "react"
import { SlArrowLeft } from "react-icons/sl"
import { Button } from "../Button/Button"
import Input from "../Input/Input"
import type { DrawerProps } from "../Drawer/types"
import { loadKakaoMapSdk, renderKakaoMapDraggable } from "./kakao"
import common from "./common.module.css"
import styles from "./DetailedMap.module.css"

type Coordinates = { latitude: number | null; longitude: number | null }

export default function DetailedMap({ onSelect, onSelectWithCoord, onClose }: DrawerProps) {
    const mapRef = useRef<HTMLDivElement>(null)
    const [coordinates, setCoordinates] = useState<Coordinates>({ latitude: null, longitude: null })
    const [coord, setCoord] = useState("")
    const [detailAddress, setDetailAddress] = useState("")
    const [isMapLoading, setIsMapLoading] = useState(true)

    const updateLocation = useCallback(() => {
        if (!navigator.geolocation) return
        navigator.geolocation.getCurrentPosition(
            ({ coords }) => setCoordinates({ latitude: coords.latitude, longitude: coords.longitude }),
            (error) => console.error("현재 위치를 가져오지 못했습니다:", error)
        )
    }, [])

    useEffect(() => {
        updateLocation()
    }, [updateLocation])

    useEffect(() => {
        const { latitude, longitude } = coordinates
        if (latitude === null || longitude === null || !mapRef.current) return

        let isCancelled = false
        setIsMapLoading(true)

        const run = async () => {
            try { await loadKakaoMapSdk() } catch (e) { console.error(e) }

            if (!isCancelled && mapRef.current) {
                setCoord(`${latitude},${longitude}`)
                renderKakaoMapDraggable(mapRef.current, latitude, longitude, (lat, lng) => {
                    setCoord(`${lat},${lng}`)
                })
                if (!isCancelled) setIsMapLoading(false)
            }
        }

        run()
        return () => { isCancelled = true }
    }, [coordinates])

    const handleConfirm = () => {
        if (onSelectWithCoord) {
            onSelectWithCoord(detailAddress, coord)
        } else {
            onSelect(detailAddress)
        }
    }

    return (
        <div className={common.container}>
            <div className={common.header}>
                <button className={common.backButton} type="button" onClick={onClose}>
                    <SlArrowLeft size={24} />
                </button>
                <span className={common.title}>거래 장소 선택</span>
                <div className={common.headerSpacer} />
            </div>
            <div className={common.mapSection}>
                <div ref={mapRef} className={common.map} />
                {isMapLoading && <div className={common.skeleton} />}
                <div className={styles.centerPin} />
            </div>
            <div className={common.footer}>
                <p className={styles.footerTitle}>자세한 거래 장소명을 입력해주세요</p>
                <p className={styles.footerSubtitle}>예) 서울역 1번 출구, 롯데백화점 정문 앞</p>
                <Input
                    placeholder="상세 주소를 입력해 주세요."
                    value={detailAddress}
                    onChange={(e) => setDetailAddress(e.target.value)}
                />
                <div className="space-60px"></div>
                <Button
                    variant="primary"
                    type="button"
                    disabled={!detailAddress || !coord}
                    onClick={handleConfirm}
                >
                    입력완료
                </Button>
            </div>
        </div>
    )
}
