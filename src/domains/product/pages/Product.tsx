import { useEffect, useRef, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from '../../../components/Header/Header';
import { Button } from '../../../components/Button/Button';
import StaticMap from '../../../components/Map/StaticMap';
import List from '../../../components/Drawer/List';
import listStyles from '../../../components/Drawer/List.module.css';
import {
  fetchKakaoAddressByCoords,
  loadKakaoMapSdk,
} from '../../../components/Map/kakao';
import LikeRedHeartIcon from '../../../assets/icon/Like_red_heart.svg?react';
import LikeGrayHeartIcon from '../../../assets/icon/Like_gray_heart.svg?react';
import { useProductDetail, useUpdateBoardStatus } from '../hooks';
import { getApiErrorMessage } from '../../../api/http';
import '../../../components/share.css';
import styles from './Product.module.css';

const categoryLabelMap: Record<string, string> = {
  top: '상의',
  pants: '하의',
  outer: '아우터',
  bag: '가방',
  jewelry: '쥬얼리',
  onepiece: '원피스',
  shoes: '신발',
  accessory: '액세서리',
};

const DAYS = ['일', '월', '화', '수', '목', '금', '토'];

function formatDate(dateStr: string | undefined) {
  if (!dateStr) return '';
  const d = new Date(dateStr);
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${month}.${day}(${DAYS[d.getDay()]})`;
}

export default function Product() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data, isPending, isError, error } = useProductDetail(id ?? '');
  const updateStatus = useUpdateBoardStatus(id ?? '');

  const [liked, setLiked] = useState(false);
  const [address, setAddress] = useState('');
  const [statusDrawerOpen, setStatusDrawerOpen] = useState(false);

  const [currentIndex, setCurrentIndex] = useState(0);
  const touchStartX = useRef(0);
  const isMouseDown = useRef(false);

  useEffect(() => {
    if (data) setLiked(data.wished ?? false);
  }, [data]);

  useEffect(() => {
    if (!data) return;
    const { latitude, longitude } = data;
    if (latitude == null || longitude == null) return;
    let isCancelled = false;

    (async () => {
      try {
        await loadKakaoMapSdk();
        const result = await fetchKakaoAddressByCoords(latitude, longitude);
        if (!isCancelled) setAddress(result ?? '주소를 확인할 수 없습니다.');
      } catch {
        if (!isCancelled) setAddress('주소를 확인할 수 없습니다.');
      }
    })();

    return () => {
      isCancelled = true;
    };
  }, [data]);

  const images = data?.images ?? [];

  const handleSwipe = (start: number, end: number) => {
    const delta = start - end;
    if (delta > 50) {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    } else if (delta < -50) {
      setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
    }
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const handleTouchEnd = (e: React.TouchEvent) => {
    handleSwipe(touchStartX.current, e.changedTouches[0].clientX);
  };
  const handleMouseDown = (e: React.MouseEvent) => {
    isMouseDown.current = true;
    touchStartX.current = e.clientX;
  };
  const handleMouseUp = (e: React.MouseEvent) => {
    if (!isMouseDown.current) return;
    isMouseDown.current = false;
    handleSwipe(touchStartX.current, e.clientX);
  };

  const handleStatusSelect = (status: string) => {
    setStatusDrawerOpen(false);

    if (data?.status === '대여가능') {
      navigate('/chat');
      return;
    }

    updateStatus.mutate({ status });
  };

  if (isPending) return <div>로딩 중...</div>;
  if (isError) {
    return (
      <div>
        에러 발생: {getApiErrorMessage(error, '상품을 불러오지 못했습니다.')}
      </div>
    );
  }
  if (!data) return <div>로딩 중...</div>;

  return (
    <div>
      <Header.Root hasNotch hasCamera>
        <Header.BackButton />
        <Header.LinkGroup>
          <Header.SearchLink />
        </Header.LinkGroup>
      </Header.Root>

      <div
        className={styles.imageSlider}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
      >
        <div
          className={styles.sliderTrack}
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {images.map((src, index) => (
            <div key={index} className={styles.slide}>
              <img
                src={src}
                alt={`상품 이미지 ${index + 1}`}
                draggable={false}
              />
            </div>
          ))}
        </div>
      </div>

      <div className={styles.userSection}>
        <img
          src="https://opencloset.jihongeek.workers.dev/src/assets/Default_Profile.png"
          alt=""
          className={styles.userAvatar}
        />
        <span className={styles.userName}>{data.sellerNickname}</span>
      </div>

      <div className={styles.dividerFull} />

      <div className={styles.infoContainer}>
        <p className={styles.category}>
          {categoryLabelMap[data.category ?? ''] ?? data.category}
        </p>
        <div className={styles.gap20} />
        <p className={styles.productName}>{data.title}</p>
        <div className={styles.gap12} />
        <div className={styles.priceRow}>
          <span className={styles.price}>
            {(data.price ?? 0).toLocaleString()}원
          </span>
          <span className={styles.rentalDays}>/ {data.rentalDays ?? 0}일</span>
        </div>
        <div className={styles.gap12} />
        <div className={styles.divider} />
        <div className={styles.gap20} />

        <div className={styles.infoRows}>
          <div className={styles.infoRow}>
            <span className={styles.infoLabel}>대여기간</span>
            <span
              className={`${styles.infoValue} ${styles.infoValueUnderline}`}
            >
              {formatDate(data.startDate)} ~ {formatDate(data.endDate)}
            </span>
          </div>
          <div className={styles.infoRow}>
            <span className={styles.infoLabel}>사이즈</span>
            <span className={styles.infoValue}>{data.size}</span>
          </div>
          <div className={styles.infoRow}>
            <span className={styles.infoLabel}>성별</span>
            <span className={styles.infoValue}>{data.sex}</span>
          </div>
        </div>

        <div className={styles.gap20} />
        <div className={styles.divider} />
        <div className={styles.gap20} />

        <p className={styles.description}>{data.description}</p>

        <div className={styles.gap20} />
        <p className={styles.placeLabel}>거래 장소</p>
        <div className={styles.gap12} />
        <StaticMap
          latitude={data.latitude ?? 0}
          longitude={data.longitude ?? 0}
        />
        <p className={styles.placeAddress}>{address}</p>

        <div className={styles.gap20} />
        <div className={styles.divider} />

        <div className={styles.bottomSpacer} />
      </div>

      <div className={`button-space ${styles.footer}`}>
        <button
          type="button"
          className={styles.likeButton}
          onClick={() => setLiked((prev) => !prev)}
        >
          {liked ? (
            <LikeRedHeartIcon width={32} height={32} />
          ) : (
            <LikeGrayHeartIcon width={32} height={32} />
          )}
        </button>
        <div className={styles.chatButtonWrap}>
          {data.owner ? (
            <Button
              variant="primary"
              type="button"
              onClick={() => setStatusDrawerOpen(true)}
            >
              변경하기
            </Button>
          ) : (
            <Button
              variant="primary"
              type="button"
              onClick={() => navigate('/chat')}
            >
              채팅하기
            </Button>
          )}
        </div>
      </div>

      {statusDrawerOpen && (
        <List
          type="status"
          selected={data.status}
          onSelect={handleStatusSelect}
          onClose={() => setStatusDrawerOpen(false)}
          topContent={
            <button
              type="button"
              className={listStyles.item}
              onClick={() => navigate(`/product/${id}/edit`)}
            >
              게시물 수정
            </button>
          }
        />
      )}
    </div>
  );
}
