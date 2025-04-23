import NavBar from '../../components/NavBar';
import ProductList from '../../components/ProductList';
import styles from './SearchResult.module.css';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronDown, Settings2Icon } from 'lucide-react';
import { Search as SearchIcon } from 'lucide-react';
export default function SearchResult() {
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
            />
            <SearchIcon
              width={'15.61px'}
              height={'16.07px'}
              color={'#8d8d8d'}
            />
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
        <ProductList products={mockProductsData} />
        <NavBar />
      </div>
    </>
  );
}
