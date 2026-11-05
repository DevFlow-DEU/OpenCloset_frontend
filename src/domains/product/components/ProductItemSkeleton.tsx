import shimmer from './skeleton.module.css';
import styles from './ProductItemSkeleton.module.css';

// ProductItem과 동일한 치수의 로딩 placeholder.
// 실제 상품 API 연동 시 isPending(또는 isLoading) ? <ProductItemSkeleton /> : <ProductItem ... /> 로 교체해서 사용.
export default function ProductItemSkeleton() {
  return (
    <div className={styles.item}>
      <div className={`${styles.thumbnail} ${shimmer.shimmer}`} />
      <div className={styles.descriptionContainer}>
        <div className={`${styles.nameLine} ${shimmer.shimmer}`} />
        <div className={`${styles.nameLineShort} ${shimmer.shimmer}`} />
        <div className={`${styles.costLine} ${shimmer.shimmer}`} />
      </div>
    </div>
  );
}
