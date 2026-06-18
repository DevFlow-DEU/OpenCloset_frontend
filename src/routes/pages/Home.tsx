import styles from './Home.module.css';
import NavigationBar from '../../components/NavigationBar/NavigationBar';
import Header from '../../components/Header/Header';
import CategoryLink from '../../components/CategoryLink/CategoryLink';
import ProductItem from '../../components/Product/ProductItem';

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

const mockProducts = [
  {
    id: 1,
    imageUrls: [],
    name: '검정 정장 재킷',
    rentalCost: 15000,
    rentalPeriod: 3,
    wished: false,
    status: '대여가능' as const,
    startDate: '2026-06-20',
    endDate: '2026-06-22',
  },
  {
    id: 2,
    imageUrls: [],
    name: '흰색 블라우스',
    rentalCost: 10000,
    rentalPeriod: 3,
    wished: true,
    status: '예약중' as const,
    startDate: '2026-06-25',
    endDate: '2026-06-27',
  },
  {
    id: 3,
    imageUrls: [],
    name: '네이비 슬랙스',
    rentalCost: 12000,
    rentalPeriod: 3,
    wished: false,
    status: '대여가능' as const,
  },
  {
    id: 4,
    imageUrls: [],
    name: '베이지 코트',
    rentalCost: 25000,
    rentalPeriod: 5,
    wished: false,
    status: '대여중' as const,
    startDate: '2026-06-18',
    endDate: '2026-06-22',
  },
  {
    id: 5,
    imageUrls: [],
    name: '플리츠 스커트',
    rentalCost: 8000,
    rentalPeriod: 3,
    wished: true,
    status: '대여가능' as const,
    startDate: '2026-07-01',
    endDate: '2026-07-03',
  },
  {
    id: 6,
    imageUrls: [],
    name: '스트라이프 셔츠',
    rentalCost: 9000,
    rentalPeriod: 3,
    wished: false,
    status: '반납가능' as const,
  },
];

export default function Home() {
  const location = '가야동';
  return (
    <>
      <Header.Root hasNotch>
        <div className={styles.headerGroup}>
          <Header.Logo />
          <span className={styles.locationText}>{location}</span>
        </div>
        <Header.SearchLink />
      </Header.Root>
      <div className={styles.container}>
        <div className="slider">
          <img src="/광고창.png" alt="광고창" width="100%" />
        </div>
        <div className="category-list">
          <div className={styles.categoryHeader}>카테고리</div>
          <div className={styles.categoryContainer}>
            {categories.map((category) => (
              <CategoryLink to={category} clothType={category} />
            ))}
          </div>
        </div>
        <h2 className={styles.itemListHeader}>추천 상품</h2>
        <div className={styles.itemList}>
          {mockProducts.map((product) => (
            <ProductItem key={product.id} {...product} />
          ))}
        </div>
      </div>
      <NavigationBar />
    </>
  );
}
