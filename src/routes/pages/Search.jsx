import { ChevronLeft } from 'lucide-react';
import { Search as SearchIcon, Trash2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import styles from './Search.module.css';
export default function Search() {
  return (
    <>
      <div className={styles['header']}>
        <div className={styles['header-item']}>
          <Link to={'/'} className={styles['header-button']}>
            <ChevronLeft size={35} color={'#8d8d8d'} />
          </Link>
          <div className={styles['search-bar']}>
            <input
              type='text'
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
        <div>
          <div>
            <h3>최근 검색어</h3>
            <button className={styles['delete-history-button']}>
              <Trash2 />
            </button>
          </div>
          <div>
            <div className='word'>후드집업</div>
            <div className='word'>바람막이</div>
            <div className='word'>버뮤다 팬츠</div>
            <div className='word'>가디건</div>
            <div className='word'>마인드 브릿지</div>
          </div>
        </div>
      </div>
    </>
  );
}
