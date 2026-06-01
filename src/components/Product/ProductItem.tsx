import { Link } from "react-router-dom";
import styles from "./ProductItem.module.css";
import LikeGrayHeartIcon from "../../assets/icon/Like_gray_heart.svg?react";
import LikeRedHeartIcon from "../../assets/icon/Like_red_heart.svg?react";
import ItemNoImage from "../../assets/item_no_image.svg";
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
  status: "대여가능" | "예약중" | "대여중" | "반납가능";
  onSaveButtonClick?: () => void;
}

const getKoreanDay = (dateString: string) => {
  const koreanDays = ["일", "월", "화", "수", "목", "금", "토"];
  return koreanDays[new Date(dateString).getDay()];
};

const parseDate = (dateString: string) => {
  const date = new Date(dateString);
  return {
    year: date.getDate(),
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
  const image = imageUrls[0];
  const parsedStartDate = startDate ? parseDate(startDate) : null;
  const parsedEndDate = endDate ? parseDate(endDate) : null;

  return (
    <>
      <div className={styles.item}>
        <div className={styles.itemThumbnail}>
          {wished ? (
            <button className={styles.saveButton} onClick={onSaveButtonClick}>
              <LikeRedHeartIcon width={"16"} height={"14px"} />
            </button>
          ) : (
            <button className={styles.saveButton} onClick={onSaveButtonClick}>
              <LikeGrayHeartIcon width={"16px"} height={"14px"} />
            </button>
          )}
          <Link to={`/product/${id}`}>
            <img
              src={image ?? ItemNoImage}
              alt={String(id)}
              onError={(error) => (error.currentTarget.src = ItemNoImage)}
            />
            {status === "예약중" || status === "대여중" ? (
              <div className={styles.statusLabel}>{status}</div>
            ) : null}
          </Link>
        </div>
        <div className={styles.itemDescriptionContainer}>
          <div className={styles.itemName}>{name}</div>
          <div className={styles.costGroup}>
            <span className={styles.itemCost}>
              {rentalCost.toLocaleString("ko-kr", {
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
      </div>
    </>
  );
}
