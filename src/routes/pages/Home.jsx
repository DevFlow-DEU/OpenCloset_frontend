import { Link } from 'react-router-dom';
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
import NavBar from '../../components/NavBar';
import ProductList from '../../components/ProductList';
import { useProducts } from '../../utils/products';
export default function Home() {
  const token = localStorage.getItem('token');
  const products = useProducts('board/All', token);
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
          <ProductList products={products} />
        </div>
        <Link to='/add_product' className={styles['add-button']}>
          <AddProductIcon />
        </Link>
      </div>
      <NavBar />
    </>
  );
}
