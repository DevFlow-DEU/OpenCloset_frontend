import styles from './Home.module.css';
import NavigationBar from '../../../components/NavigationBar/NavigationBar';
import Header from '../../../components/Header/Header';
import CategoryLink from '../components/CategoryLink';
import ProductItem from '../components/ProductItem';
import BannerSkeleton from '../components/BannerSkeleton';
import ProductItemSkeleton from '../components/ProductItemSkeleton';
import PullToRefresh from '../../../components/PullToRefresh/PullToRefresh';
import { getAccessToken } from '../../../api/token';
import { useAllProducts } from '../hooks';
import { toProductItemProps } from '../mappers';
import { useMyProfile } from '../../my/hooks';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
type clothType =
  | 'top'
  | 'pants'
  | 'outer'
  | 'bag'
  | 'jewelry'
  | 'onepiece'
  | 'shoes'
  | 'accessory';

const categories: clothType[] = [
  'top',
  'pants',
  'outer',
  'bag',
  'jewelry',
  'onepiece',
  'shoes',
  'accessory',
];

const BANNER_COUNT = 3;
const SKELETON_COUNT = 4;

// 배너로 쓸 상품 이미지가 없을 때 보여주는 기본 배너(2:1).
const defaultBannerImages = [
  'https://picsum.photos/seed/banner1/600/300',
  'https://picsum.photos/seed/banner2/600/300',
  'https://picsum.photos/seed/banner3/600/300',
];

export default function Home() {
  // 홈은 비로그인으로도 열람 가능. /mypage/profile은 인증이 필요해서
  // 토큰 있을 때만 조회(그렇지 않으면 401 → middleware가 /login으로 보냄).
  const isLoggedIn = Boolean(getAccessToken());
  const productsQuery = useAllProducts();
  const profileQuery = useMyProfile(isLoggedIn);

  const location = profileQuery.data?.address ?? '';

  const products = (productsQuery.data?.items ?? []).map(toProductItemProps);
  // 배너 전용 API가 없어서 당장은 실제 상품 사진으로 배너를 채움.
  const bannerImages = products
    .map((product) => product.imageUrls[0])
    .filter((url): url is string => Boolean(url))
    .slice(0, BANNER_COUNT);

  // 당겨서 새로고침 = 상품(로그인돼 있으면 프로필도) 쿼리 refetch.
  const handleRefresh = () =>
    Promise.all([
      productsQuery.refetch(),
      isLoggedIn ? profileQuery.refetch() : Promise.resolve(),
    ]);

  return (
    <>
      <Header.Root hasNotch>
        <div className={styles.headerGroup}>
          <Header.Logo />
          {location && <span className={styles.locationText}>{location}</span>}
        </div>
        <Header.SearchLink />
      </Header.Root>
      <PullToRefresh onRefresh={handleRefresh}>
        <div className={styles.container}>
          {productsQuery.isPending ? (
            <BannerSkeleton />
          ) : (
            <Swiper>
              {(bannerImages.length > 0
                ? bannerImages
                : defaultBannerImages
              ).map((url, index) => (
                <SwiperSlide key={`${url}-${index}`}>
                  <img
                    src={url}
                    alt={`배너 ${index + 1}`}
                    className={styles.bannerImage}
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          )}
          <div className="category-list">
            <div className={styles.categoryHeader}>카테고리</div>
            <div className={styles.categoryContainer}>
              {categories.map((category) => (
                <CategoryLink
                  to={category}
                  key={category}
                  clothType={category}
                />
              ))}
            </div>
          </div>
          <h2 className={styles.itemListHeader}>추천 상품</h2>
          {productsQuery.isPending ? (
            <div className={styles.itemList}>
              {Array.from({ length: SKELETON_COUNT }, (_, index) => (
                <ProductItemSkeleton key={index} />
              ))}
            </div>
          ) : products.length > 0 ? (
            <div className={styles.itemList}>
              {products.map((product) => (
                <ProductItem key={product.id} {...product} />
              ))}
            </div>
          ) : (
            <p className={styles.empty}>
              {productsQuery.isError
                ? '상품을 불러오지 못했습니다.'
                : '아직 등록된 상품이 없습니다.'}
            </p>
          )}
        </div>
      </PullToRefresh>
      <NavigationBar />
    </>
  );
}
