import { Link, useNavigate } from 'react-router-dom';
import styles from './ProductItem.module.css';
import LikeGrayHeartIcon from '../../../assets/icon/Like_gray_heart.svg?react';
import LikeRedHeartIcon from '../../../assets/icon/Like_red_heart.svg?react';
import ItemNoImage from '../../../assets/item_no_image.svg';
import { getAccessToken } from '../../../api/token';
import { useWishlistToggle } from '../hooks';
export interface ProductItemProps {
  id: number;
  imageUrls: string[];
  name: string;
  rentalCost: number;
  rentalPeriod: number;
  wished: boolean;
  address?: string;
  startDate?: string;
  endDate?: string;
  status: '대여가능' | '예약중' | '대여중' | '반납가능';
  onSaveButtonClick?: () => void;
}

const getKoreanDay = (dateString: string) => {
  const koreanDays = ['일', '월', '화', '수', '목', '금', '토'];
  return koreanDays[new Date(dateString).getDay()];
};

const parseDate = (dateString: string) => {
  const date = new Date(dateString);
  return {
    year: date.getFullYear(),
    month: date.getMonth() + 1,
    date: date.getDate(),
  };
};

export default function ProductItem({
  id,
  imageUrls,
  name,
  rentalCost,
  rentalPeriod,
  wished,
  startDate,
  endDate,
  status,
  onSaveButtonClick,
}: ProductItemProps) {
  const navigate = useNavigate();
  const toggle = useWishlistToggle(id);
  const image = imageUrls?.[0];
  const parsedStartDate = startDate ? parseDate(startDate) : null;
  const parsedEndDate = endDate ? parseDate(endDate) : null;

  // onSaveButtonClick이 없으면(Home/SearchResult 등 리스트) 기본 토글 동작 사용.
  // wished의 낙관적 반영/롤백은 productQueries.toggleWishlist에서 처리.
  const handleToggleWishlist = () => {
    // 비로그인 시 기존 프로젝트 패턴대로 로그인 페이지로 이동.
    if (!getAccessToken()) {
      navigate('/login');
      return;
    }
    toggle.mutate();
  };

  return (
    <>
      <div className={styles.item}>
        <div className={styles.itemThumbnail}>
          <button
            className={styles.saveButton}
            type="button"
            aria-label={wished ? '좋아요 취소' : '좋아요'}
            onClick={onSaveButtonClick ?? handleToggleWishlist}
          >
            {wished ? (
              <LikeRedHeartIcon width={'16'} height={'14px'} />
            ) : (
              <LikeGrayHeartIcon width={'16px'} height={'14px'} />
            )}
          </button>
          <Link to={`/product/${id}`}>
            <img
              src={image ?? ItemNoImage}
              alt={String(id)}
              onError={(error) => {
                error.currentTarget.onerror = null;
                error.currentTarget.src = ItemNoImage;
              }}
            />
            {status === '예약중' || status === '대여중' ? (
              <div className={styles.statusLabel}>{status}</div>
            ) : null}
          </Link>
        </div>

        <Link to={`/product/${id}`}>
          <div className={styles.itemDescriptionContainer}>
            <div className={styles.itemName}>{name}</div>
            <div className={styles.costGroup}>
              <span className={styles.itemCost}>
                {rentalCost.toLocaleString('ko-kr', {
                  maximumFractionDigits: 4,
                })}
                원
              </span>
              <span className={styles.itemPeriod}> / {rentalPeriod}Day</span>
            </div>
            {startDate && parsedStartDate && endDate && parsedEndDate && (
              <div className={styles.itemDate}>
                {parsedStartDate.month}.{parsedStartDate.date}(
                {getKoreanDay(startDate)}) ~ {parsedEndDate.month}.
                {parsedEndDate.date}({getKoreanDay(endDate)})
              </div>
            )}
          </div>
        </Link>
      </div>
    </>
  );
}
