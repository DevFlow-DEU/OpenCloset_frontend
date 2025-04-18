import { Link } from 'react-router-dom';
import { useState } from 'react';
import styles from './Home.module.css';
import Logo from '../../assets/logo.svg?react';
import HamburgerIcon from '../../assets/hamburger.svg?react';
import SearchIcon from '../../assets/search.svg?react';
import TopsIcon from '../../assets/icon/Category/Tops.svg?react';
import PantsIcon from '../../assets/icon/Category/Pants.svg?react';
import OuterIcon from '../../assets/icon/Category/Outer.svg?react';
import BagIcon from '../../assets/icon/Category/Bag.svg?react';
import JewelryIcon from '../../assets/icon/Category/Jewelry.svg?react';
import OnePieceIcon from '../../assets/icon/Category/OnePiece.svg?react';
import ShoesIcon from '../../assets/icon/Category/Shoes.svg?react';
import AccessoryIcon from '../../assets/icon/Category/Accessory.svg?react';
import AddProductIcon from '../../assets/icon/Add_product.svg?react';
import ProductItem from '../../components/ProductItem';
import NavBar from '../../components/NavBar';
export default function Home() {
  const mockProductsData = [
    {
      id: 5, // 매물에 대한 ID (정수)
      name: 'Script Logo Heavyweigh...', // 매물 제품명
      rentalPeriod: 3, // 대여 일 수 (정수, 예: 7일)
      rentalCost: 3700, // 대여 비용 (정수, 예: 15000원)
      location: '중앙동', // 지역명
      imageUrl: '/hoodie.png', // 대표 이미지 URL
      createdAt: '2025-04-08T10:00:00Z', // 생성된 날짜 (ISO 8601 포맷 추천)
      isSaved: true,
    },
    {
      id: 2,
      name: '윈드브레이커 자켓_블랙',
      rentalPeriod: 7,
      rentalCost: 5300,
      location: '범일동',
      imageUrl: '/windbreaker.png',
      createdAt: '2025-04-07T15:30:00Z',
      isSaved: false,
    },
    {
      id: 7,
      name: 'Script Logo Heavyweigh...',
      rentalPeriod: 14,
      rentalCost: 10700,
      location: '가야동',
      imageUrl: '/pants.png',
      createdAt: '2025-04-07T15:30:00Z',
      isSaved: false,
    },
    {
      id: 1,
      name: '와이드 롱 스웨트 팬츠',
      rentalPeriod: 5,
      rentalCost: 7300,
      location: '남포동',
      imageUrl: '/pants1.png',
      createdAt: '2025-04-07T15:30:00Z',
      isSaved: false,
    },
  ];
  const [products, setProducts] = useState(mockProductsData);
  return (
    <>
      <header>
        <Link className='hamburger-button'>
          <HamburgerIcon height={16.92} width={22.38} />
        </Link>
        <Logo height={20} width={118} />
        <Link to={'/search'} className='search-button'>
          <SearchIcon height={16.92} width={22.38} />
        </Link>
      </header>
      <div className={styles.container}>
        <div className='slider'>
          <img src='/광고창.png' alt='광고창' width='100%' />
        </div>
        <div className='category-list'>
          <div className={styles['category-header']}>Categories</div>
          <div className={styles['category-container']}>
            <div className={styles['category-item']}>
              <Link>
                <div className={styles['category-icon']}>
                  <TopsIcon width='39.26px' height='39.26px' />
                </div>
                상의
              </Link>
            </div>
            <div className={styles['category-item']}>
              <Link>
                <div className={styles['category-icon']}>
                  <PantsIcon width='39.26px' height='39.26px' />
                </div>
                하의
              </Link>
            </div>
            <div className={styles['category-item']}>
              <Link>
                <div className={styles['category-icon']}>
                  <OuterIcon width='39.26px' height='39.26px' />
                </div>
                아우터
              </Link>
            </div>
            <div className={styles['category-item']}>
              <Link>
                <div className={styles['category-icon']}>
                  <JewelryIcon width='39.26px' height='39.26px' />
                </div>
                주얼리
              </Link>
            </div>
            <div className={styles['category-item']}>
              <Link>
                <div className={styles['category-icon']}>
                  <OnePieceIcon width='39.26px' height='39.26px' />
                </div>
                원피스
              </Link>
            </div>
            <div className={styles['category-item']}>
              <Link>
                <div className={styles['category-icon']}>
                  <ShoesIcon width='39.26px' height='39.26px' />
                </div>
                신발
              </Link>
            </div>
            <div className={styles['category-item']}>
              <Link>
                <div className={styles['category-icon']}>
                  <BagIcon width='39.26px' height='39.26px' />
                </div>
                가방
              </Link>
            </div>
            <div className={styles['category-item']}>
              <Link>
                <div className={styles['category-icon']}>
                  <AccessoryIcon width='39.26px' height='39.26px' />
                </div>
                악세서리
              </Link>
            </div>
          </div>
        </div>
        <div className='item-list'>
          <h2 className={styles['item-list-header']}>
            오늘의 <br /> 추천 상품
          </h2>
          <div className={styles['item-container']}>
            {products.map((product) => (
              <ProductItem key={product.id} {...product} />
            ))}
          </div>
        </div>
        <Link to='/add_product' className={styles['add-button']}>
          <AddProductIcon />
        </Link>
      </div>
      <NavBar />
    </>
  );
}