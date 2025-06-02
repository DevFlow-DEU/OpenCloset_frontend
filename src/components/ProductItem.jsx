import { Link } from 'react-router-dom';
import styles from './ProductItem.module.css';
import LikeGrayHeartIcon from '../assets/icon/Like_gray_heart.svg?react';
import LikeRedHeartIcon from '../assets/icon/Like_red_heart.svg?react';
export default function ProductItem({
  id,
  image,
  createdAt,
  title,
  price,
  date,
  isSaved,
  location,
}) {
  return (
    <div className={styles['item']}>
      <Link to={`/product/${id}`}>
        {isSaved ? (
          <button className={styles['save-button']}>
            <LikeRedHeartIcon width={'16.06px'} height={'14.34px'} />
          </button>
        ) : (
          <button className={styles['save-button']}>
            <LikeGrayHeartIcon width={'16.06px'} height={'14.34px'} />
          </button>
        )}

        <div className={styles['item-thumbnail']}>
          <img src={image} alt={id} width='170.13px' height='169.56px' />
        </div>
        <div className={styles['item-description-container']}>
          <div className={styles['item-name']}>{title}</div>
          <div>
            <span className={styles['item-cost']}>
              {price.toLocaleString('ko-kr', {
                maximumFractionDigits: 4,
              })}
              원
            </span>
            <span className={styles['item-period']}> / {date}일</span>
          </div>
          <div className={styles['item-location']}>{location}</div>
        </div>
      </Link>
    </div>
  );
}
