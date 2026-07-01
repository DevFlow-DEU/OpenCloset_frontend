import { useState } from 'react';

import Header from '../../../components/Header/Header';
import styles from './Like.module.css';
import RadioFilter from '../../../components/Filter/RadioFilter';
import NavigationBar from '../../../components/NavigationBar/NavigationBar';
import ProductItem from '../../../components/Product/ProductItem';
import SortIcon from '../../../assets/sort.svg?react';

const mockProducts = [
  {
    id: 1,
    imageUrls: [],
    name: '검정 정장 재킷',
    rentalCost: 15000,
    rentalPeriod: 3,
    wished: true,
    status: '대여가능' as const,
    startDate: '2026-06-20',
    endDate: '2026-06-22',
    category: '아우터',
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
    category: '상의',
  },
  {
    id: 3,
    imageUrls: [],
    name: '네이비 슬랙스',
    rentalCost: 12000,
    rentalPeriod: 3,
    wished: true,
    status: '대여가능' as const,
    category: '하의',
  },
  {
    id: 4,
    imageUrls: [],
    name: '베이지 코트',
    rentalCost: 25000,
    rentalPeriod: 5,
    wished: true,
    status: '대여중' as const,
    startDate: '2026-06-18',
    endDate: '2026-06-22',
    category: '아우터',
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
    category: '하의',
  },
  {
    id: 6,
    imageUrls: [],
    name: '스트라이프 셔츠',
    rentalCost: 9000,
    rentalPeriod: 3,
    wished: true,
    status: '반납가능' as const,
    category: '상의',
  },
];

export default function Like() {
  const [category, setCategory] = useState('전체');
  const filteredProducts =
    category === '전체'
      ? mockProducts
      : mockProducts.filter((product) => product.category === category);
  const likedCount = filteredProducts.length;
  const buttonText = '최신순';
  return (
    <>
      <Header.Root hasNotch>
        <Header.MainTitle title="좋아요" />
      </Header.Root>
      <div className={styles.container}>
        <div className={styles.fixedBar}>
          <RadioFilter
            type="category"
            onChange={setCategory}
            value={category}
          />
          <hr className={styles.divider} />
          <div className={styles.bar}>
            <div className={styles.info}>
              <span className={styles.label}>좋아요</span>
              <span className={styles.count}>{likedCount}</span>
            </div>
            <button className={styles.sort}>
              {buttonText}
              <SortIcon />
            </button>
          </div>
        </div>
        <div className={styles.productList}>
          {filteredProducts.map(({ category: _category, ...product }) => (
            <ProductItem key={product.id} {...product} />
          ))}
        </div>
        <NavigationBar />
      </div>
    </>
  );
}
