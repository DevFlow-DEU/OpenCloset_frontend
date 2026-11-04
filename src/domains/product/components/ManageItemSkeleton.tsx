import shimmer from './skeleton.module.css';
import styles from './ManageItemSkeleton.module.css';

// ManageItem과 동일한 치수의 로딩 placeholder.
// 실제 API 연동 시 isPending(또는 isLoading) ? <ManageItemSkeleton /> : <ManageItem ... /> 로 교체해서 사용.
export default function ManageItemSkeleton() {
  return (
    <div className={styles.item}>
      <div className={`${styles.image} ${shimmer.shimmer}`} />
      <div className={styles.content}>
        <div className={`${styles.nameLine} ${shimmer.shimmer}`} />
        <div className={`${styles.dateLine} ${shimmer.shimmer}`} />
        <div className={`${styles.priceLine} ${shimmer.shimmer}`} />
      </div>
    </div>
  );
}
