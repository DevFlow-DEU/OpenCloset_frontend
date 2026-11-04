import shimmer from './skeleton.module.css';
import styles from './BannerSkeleton.module.css';

// 홈 상단 배너(2:1 비율)의 로딩 placeholder.
// 실제 배너 API 연동 시 isPending(또는 isLoading) ? <BannerSkeleton /> : <Swiper ... /> 로 교체해서 사용.
export default function BannerSkeleton() {
  return <div className={`${styles.banner} ${shimmer.shimmer}`} />;
}
