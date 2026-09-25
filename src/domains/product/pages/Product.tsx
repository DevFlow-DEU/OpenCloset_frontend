import { useEffect, useRef, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from '../../../components/Header/Header';
import { Button } from '../../../components/Button/Button';
import StaticMap from '../../../components/Map/StaticMap';
import List from '../../../components/Drawer/List';
import {
  fetchKakaoAddressByCoords,
  loadKakaoMapSdk,
} from '../../../components/Map/kakao';
import LikeRedHeartIcon from '../../../assets/icon/Like_red_heart.svg?react';
import LikeGrayHeartIcon from '../../../assets/icon/Like_gray_heart.svg?react';
import '../../../components/share.css';
import styles from './Product.module.css';

type ProductData = {
  id: number;
  title: string;
  description: string;
  images: string[];
  size: string;
  sex: string;
  latitude: number;
  longitude: number;
  startDate: string;
  endDate: string;
  category: string;
  price: number;
  rentalDays: number;
  status: string;
  sellerId: number;
  sellerNickname: string;
  buyerId: number | null;
  buyerNickname: string | null;
  createAt: string;
  wished: boolean;
  owner: boolean;
};

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

function formatDate(dateStr: string) {
  const d = new Date(dateStr);
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${month}.${day}(${DAYS[d.getDay()]})`;
}

export default function Product() {
  const { id } = useParams();
  const token = localStorage.getItem('token');
  const backUrl = import.meta.env.VITE_BACK_URL;

  const [data, setData] = useState<ProductData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [liked, setLiked] = useState(false);
  const [address, setAddress] = useState('');
  const [statusDrawerOpen, setStatusDrawerOpen] = useState(false);

  const [currentIndex, setCurrentIndex] = useState(0);
  const touchStartX = useRef(0);
  const isMouseDown = useRef(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`${backUrl}/board/${id}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) throw new Error('서버 응답 실패');

        const jsonData: ProductData = await res.json();
        setData(jsonData);
        setLiked(jsonData.wished);
      } catch (err) {
        setError((err as Error).message);
      }
    };

    fetchData();
  }, [backUrl, id, token]);

  useEffect(() => {
    if (!data) return;
    let isCancelled = false;

    (async () => {
      try {
        await loadKakaoMapSdk();
        const result = await fetchKakaoAddressByCoords(
          data.latitude,
          data.longitude
        );
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

  const handleStatusSelect = async (status: string) => {
    setStatusDrawerOpen(false);

    if (status === '예약중') {
      navigate('/chat');
      return;
    }

    try {
      const params = new URLSearchParams({ status });
      const res = await fetch(
        `${backUrl}/board/${id}/status?${params.toString()}`,
        {
          method: 'PATCH',
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (!res.ok) throw new Error('상태 변경에 실패했습니다.');

      const updated: ProductData = await res.json();
      setData(updated);
    } catch (err) {
      alert((err as Error).message);
    }
  };

  if (error) return <div>에러 발생: {error}</div>;
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
          {categoryLabelMap[data.category] ?? data.category}
        </p>
        <div className={styles.gap20} />
        <p className={styles.productName}>{data.title}</p>
        <div className={styles.gap12} />
        <div className={styles.priceRow}>
          <span className={styles.price}>{data.price.toLocaleString()}원</span>
          <span className={styles.rentalDays}>/ {data.rentalDays}일</span>
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
        <StaticMap latitude={data.latitude} longitude={data.longitude} />
        <p className={styles.placeAddress}>{address}</p>

        <div className={styles.gap20} />
        <div className={styles.divider} />

        <div className={styles.bottomSpacer} />
      </div>

      <div className="button-space">
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
        />
      )}
    </div>
  );
}
