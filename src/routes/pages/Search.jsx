import { ChevronLeft } from 'lucide-react';
import { Search as SearchIcon, Trash2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import styles from './Search.module.css';
import { useState } from 'react';
export default function Search() {
  const [searchText, setSearchText] = useState('');
  const onSearchInputChange = (e) => {
    setSearchText(e.target.value);
  };
  return (
    <>
      <div className={styles['header']}>
        <div className={styles['header-item']}>
          <Link to={'/'} className={styles['header-button']}>
            <ChevronLeft size={35} color={'#8d8d8d'} />
          </Link>
          <div className={styles['search-bar']}>
            <input
              type='search'
              name=''
              id=''
              onChange={onSearchInputChange}
              placeholder='검색어를 입력해주세요'
            />
            <Link to={`/search/result/${searchText}`}>
              <SearchIcon
                width={'15.61px'}
                height={'16.07px'}
                color={'#8d8d8d'}
              />
            </Link>
          </div>
        </div>
        <div className={styles['search-history']}>
          <div className={styles['search-history-header']}>
            <h3>최근 검색어</h3>
            <button className={styles['delete-history-button']}>
              <Trash2 />
            </button>
          </div>
          <div className={styles['search-history-container']}>
            <div className={styles['word']}>후드집업</div>
            <div className={styles['word']}>바람막이</div>
            <div className={styles['word']}>버뮤다 팬츠</div>
            <div className={styles['word']}>가디건</div>
            <div className={styles['word']}>마인드 브릿지</div>
          </div>
        </div>
        <hr height='3px' color='#E9E9E9' />
        <div className={styles['search-rank']}>
          <h3>인기 검색어</h3>
          <ol>
            <li>셔츠</li>
            <li>가디건</li>
            <li>아디다스</li>
            <li>후드집업</li>
            <li>바람막이</li>
            <li>후드티</li>
            <li>레이어드</li>
            <li>뮬</li>
            <li>데님 자켓</li>
            <li>맨투맨</li>
          </ol>
        </div>
      </div>
    </>
  );
}
