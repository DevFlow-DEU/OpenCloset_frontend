import shimmer from './skeleton.module.css';
import productStyles from '../pages/Product.module.css';
import styles from './ProductDetailSkeleton.module.css';

// 상품 상세페이지(Product.tsx)와 동일한 레이아웃의 로딩 placeholder.
// 실제로는 useProductDetail()의 isPending일 때 <ProductDetailSkeleton /> 을 보여주고 있음.
export default function ProductDetailSkeleton() {
  return (
    <div>
      <div className={`${styles.imageSlider} ${shimmer.shimmer}`} />

      <div className={styles.userSection}>
        <div className={`${styles.userAvatar} ${shimmer.shimmer}`} />
        <div className={`${styles.userName} ${shimmer.shimmer}`} />
      </div>

      <div className={productStyles.dividerFull} />

      <div className={styles.infoContainer}>
        <div className={`${styles.categoryLine} ${shimmer.shimmer}`} />
        <div className={productStyles.gap20} />
        <div className={`${styles.titleLine} ${shimmer.shimmer}`} />
        <div className={productStyles.gap12} />
        <div className={`${styles.priceLine} ${shimmer.shimmer}`} />
        <div className={productStyles.gap12} />
        <div className={productStyles.divider} />
        <div className={productStyles.gap20} />

        <div className={productStyles.infoRows}>
          <div className={styles.infoRow}>
            <div className={`${styles.infoLabel} ${shimmer.shimmer}`} />
            <div className={`${styles.infoValue} ${shimmer.shimmer}`} />
          </div>
          <div className={styles.infoRow}>
            <div className={`${styles.infoLabel} ${shimmer.shimmer}`} />
            <div className={`${styles.infoValue} ${shimmer.shimmer}`} />
          </div>
          <div className={styles.infoRow}>
            <div className={`${styles.infoLabel} ${shimmer.shimmer}`} />
            <div className={`${styles.infoValue} ${shimmer.shimmer}`} />
          </div>
        </div>

        <div className={productStyles.gap20} />
        <div className={productStyles.divider} />
        <div className={productStyles.gap20} />

        <div
          className={`${styles.descriptionLine} ${shimmer.shimmer}`}
          style={{ width: '100%' }}
        />
        <div
          className={`${styles.descriptionLine} ${shimmer.shimmer}`}
          style={{ width: '90%' }}
        />
        <div
          className={`${styles.descriptionLine} ${shimmer.shimmer}`}
          style={{ width: '70%' }}
        />
        <div
          className={`${styles.descriptionLine} ${shimmer.shimmer}`}
          style={{ width: '95%' }}
        />
        <div
          className={`${styles.descriptionLine} ${shimmer.shimmer}`}
          style={{ width: '60%' }}
        />
        <div
          className={`${styles.descriptionLine} ${shimmer.shimmer}`}
          style={{ width: '80%' }}
        />
        <div
          className={`${styles.descriptionLine} ${shimmer.shimmer}`}
          style={{ width: '50%' }}
        />

        <div className={productStyles.gap20} />
        <div className={`${styles.placeLabel} ${shimmer.shimmer}`} />
        <div className={productStyles.gap12} />
        <div className={`${styles.mapBox} ${shimmer.shimmer}`} />
        <div className={`${styles.placeAddress} ${shimmer.shimmer}`} />

        <div className={productStyles.gap20} />
        <div className={productStyles.divider} />

        <div className={productStyles.bottomSpacer} />
      </div>
    </div>
  );
}
