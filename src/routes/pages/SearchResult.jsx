import NavBar from '../../components/NavBar';
import ProductList from '../../components/ProductList';
import styles from './SearchResult.module.css';
import { Link, useParams } from 'react-router-dom';
import {
  ChevronLeft,
  ChevronDown,
  Settings2Icon,
  Search as SearchIcon,
} from 'lucide-react';
import { useState } from 'react';
import { useProducts } from '../../utils/products';
export default function SearchResult() {
  const token = localStorage.getItem('token');
  let param = useParams();
  const [searchText, setSearchText] = useState('');
  const onSearchInputChange = (e) => {
    setSearchText(e.target.value);
  };
  const productsData = useProducts('search', token, {
    method: 'POST',
    body: JSON.stringify({
      title: param.searchText,
    }),
  });
  return (
    <>
      <div className={styles['header']}>
        <div className={styles['header-item']}>
          <Link to={'/'} className={styles['header-button']}>
            <ChevronLeft size={35} color={'black'} />
          </Link>
          <div className={styles['search-bar']}>
            <input
              type='search'
              name=''
              id=''
              placeholder='검색어를 입력해주세요'
              onChange={onSearchInputChange}
              defaultValue={param.searchText}
            />
            <Link to={`../search/result/${searchText}`}>
              <SearchIcon
                width={'15.61px'}
                height={'16.07px'}
                color={'#8d8d8d'}
              />
            </Link>
          </div>
        </div>
        <div className={styles['filter-container']}>
          <button className={styles['filter-button']}>
            <Settings2Icon width={'20px'} height={'20px'} />
          </button>
          <button className={styles['filter-detail-button']}>
            <div>
              성별
              <ChevronDown width={'15px'} height={'15px'} />
            </div>
          </button>
          <button className={styles['filter-detail-button']}>
            <div>
              가격
              <ChevronDown width={'15px'} height={'15px'} />
            </div>
          </button>
          <button className={styles['filter-detail-button']}>
            <div>
              장소
              <ChevronDown width={'15px'} height={'15px'} />
            </div>
          </button>
          <button className={styles['filter-detail-button']}>
            <div>
              사이즈
              <ChevronDown width={'15px'} height={'15px'} />
            </div>
          </button>
        </div>
      </div>
      <div className={styles['container']}>
        <ProductList
          products={productsData.map((product) => {
            return {
              ...product,
              title: product.name,
              price: product.rentalCost,
              date: product.rentalPeriod,
              image: product.imageUrl,
              price: product.rentalPeriod,
            };
          })}
        />
        <NavBar />
      </div>
    </>
  );
}
