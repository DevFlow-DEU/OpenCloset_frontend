import { useEffect, useRef, useState, type ReactNode } from 'react';
import RefreshSpinner from './RefreshSpinner';
import styles from './PullToRefresh.module.css';

const PULL_THRESHOLD = 60;
const MAX_PULL = 80;
// 새로고침이 너무 빨리 끝나면 당겼던 게 바로 접혀서 반영됐는지 체감이 안 되니,
// 끝나도 이 시간만큼은 당겨진 상태를 유지했다가 접음.
const MIN_HOLD_MS = 400;

type Props = {
  onRefresh: () => Promise<unknown> | void;
  children: ReactNode;
  className?: string;
};

// 화면 맨 위에서 아래로 당기면 새로고침되는 래퍼.
// touchmove에서 네이티브 스크롤을 막아야 해서(preventDefault) React의 합성 이벤트 대신
// addEventListener(... { passive: false })로 직접 등록함.
// "맨 위"는 window 스크롤(el 자체는 안 스크롤되는 페이지)과 el 자체 스크롤(el이
// overflow-y:auto인 내부 리스트인 경우) 둘 다 올 수 있어서 둘 다 확인함.
export default function PullToRefresh({
  onRefresh,
  children,
  className,
}: Props) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const startY = useRef<number | null>(null);
  const dragging = useRef(false);

  const [pullDistance, setPullDistance] = useState(0);
  const [refreshing, setRefreshing] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    const el = wrapperRef.current;
    if (!el) return;

    const isAtTop = () => window.scrollY === 0 && el.scrollTop === 0;

    const handleTouchStart = (e: TouchEvent) => {
      if (refreshing || !isAtTop()) return;
      startY.current = e.touches[0].clientY;
      dragging.current = true;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!dragging.current || startY.current === null) return;

      const delta = e.touches[0].clientY - startY.current;
      if (delta <= 0 || !isAtTop()) {
        dragging.current = false;
        setIsDragging(false);
        setPullDistance(0);
        return;
      }

      e.preventDefault();
      setIsDragging(true);
      setPullDistance(Math.min(MAX_PULL, delta * 0.5));
    };

    const handleTouchEnd = async () => {
      if (!dragging.current) return;
      dragging.current = false;
      startY.current = null;
      setIsDragging(false);

      setPullDistance((current) => {
        if (current >= PULL_THRESHOLD) {
          setRefreshing(true);
          const startedAt = Date.now();
          Promise.resolve(onRefresh())
            .catch(() => {})
            .finally(() => {
              const remaining = MIN_HOLD_MS - (Date.now() - startedAt);
              setTimeout(
                () => {
                  setRefreshing(false);
                  setPullDistance(0);
                },
                Math.max(0, remaining)
              );
            });
          return PULL_THRESHOLD;
        }
        return 0;
      });
    };

    el.addEventListener('touchstart', handleTouchStart, { passive: true });
    el.addEventListener('touchmove', handleTouchMove, { passive: false });
    el.addEventListener('touchend', handleTouchEnd, { passive: true });

    return () => {
      el.removeEventListener('touchstart', handleTouchStart);
      el.removeEventListener('touchmove', handleTouchMove);
      el.removeEventListener('touchend', handleTouchEnd);
    };
  }, [onRefresh, refreshing]);

  const indicatorHeight = refreshing ? PULL_THRESHOLD : pullDistance;

  return (
    <div
      ref={wrapperRef}
      className={className ? `${styles.wrapper} ${className}` : styles.wrapper}
    >
      <div
        className={styles.indicator}
        style={{
          height: indicatorHeight,
          opacity: refreshing ? 1 : Math.min(1, pullDistance / PULL_THRESHOLD),
          transition: isDragging ? 'none' : undefined,
        }}
      >
        <RefreshSpinner />
      </div>
      {children}
    </div>
  );
}
