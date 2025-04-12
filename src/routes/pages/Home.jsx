import { Link } from 'react-router-dom';
import styles from './Home.module.css';
import Logo from '../../assets/logo.svg?react';
import HamburgerIcon from '../../assets/hamburger.svg?react';
import SearchIcon from '../../assets/search.svg?react';
import SaveIcon from '../../assets/save.svg?react';
import MapIcon from '../../assets/map.svg?react';
import ProfileIcon from '../../assets/profile.svg?react';
import HomeIcon from '../../assets/home.svg?react';
import ChatIcon from '../../assets/chat.svg?react';
export default function Home() {
  return (
    <>
      <header>
        <Link className='hamburger-button'>
          <HamburgerIcon height={16.92} width={22.38} />
        </Link>
        <Logo height={20} width={118} />
        <Link className='search-button'>
          <SearchIcon height={16.92} width={22.38} />
        </Link>
      </header>
      <div className={styles.container}>
        <div className='slider'>
          <img src='/광고창.png' alt='광고창' width='100%' />
        </div>
        <div className='category-list'>
          <div className='category-header'>Categories</div>
          <div className='category-container'>
            <div className='category-item'>
              <Link>
                <div>
                  <img src='' alt='' />
                </div>
                상의
              </Link>
            </div>
            <div className='category-item'>
              <Link>
                <img src='' alt='' />
                하의
              </Link>
            </div>
            <div className='category-item'>
              <Link>
                <img src='' alt='' />
                아우터
              </Link>
            </div>
            <div className='category-item'>
              <Link>
                <img src='' alt='' />
                주얼리
              </Link>
            </div>
            <div className='category-item'>
              <Link>
                <img src='' alt='' />
                원피스
              </Link>
            </div>
            <div className='category-item'>
              <Link>
                <img src='' alt='' />
                신발
              </Link>
            </div>
            <div className='category-item'>
              <Link>
                <img src='' alt='' />
                가방
              </Link>
            </div>
            <div className='category-item'>
              <Link>
                <img src='' alt='' />
                악세서리
              </Link>
            </div>
          </div>
        </div>
        <div className='item-list'>
          <div className='item-list-header'>오늘의 추천 상품</div>
          <div className='item'>
            <Link>
              <button className='save-button'>
                <img src='' alt='' />
              </button>
              <div className='item-thumbnail'>
                <img src='' alt='' />
              </div>
              <div className='item-name'>Script Logo Heavyweigh...</div>
              <div className='item-cost'>3,700원</div> /
              <div className='item-period'>3일</div>
              <div className='item-location'>중앙동</div>
            </Link>
          </div>
          <div className='item'>
            <button className='save-button'>
              <img src='' alt='' />
            </button>
            <div className='item-thumbnail'>
              <img src='' alt='' />
            </div>
            <div className='item-name'>Script Logo Heavyweigh...</div>
            <div className='item-cost'>3,700원</div> /
            <div className='item-period'>3일</div>
            <div className='item-location'>중앙동</div>
          </div>
          <div className='item'>
            <button className='save-button'>
              <img src='' alt='' />
            </button>
            <div className='item-thumbnail'>
              <img src='' alt='' />
            </div>
            <div className='item-name'>Script Logo Heavyweigh...</div>
            <div className='item-cost'>3,700원</div> /
            <div className='item-period'>3일</div>
            <div className='item-location'>중앙동</div>
          </div>
          <div className='item'>
            <button className='save-button'>
              <img src='' alt='' />
            </button>
            <div className='item-thumbnail'>
              <img src='' alt='' />
            </div>
            <div className='item-name'>Script Logo Heavyweigh...</div>
            <div className='item-cost'>3,700원</div> /
            <div className='item-period'>3일</div>
            <div className='item-location'>중앙동</div>
          </div>
        </div>
      </div>
      <button className='add-button'>
        <img />
      </button>
      <div className={styles['nav-bar']}>
        <Link>
          <div>
            <MapIcon width={20.66} height={20.66} />
          </div>
          지도
        </Link>

        <Link>
          <div>
            <ChatIcon width={20.66} height={20.66} />
          </div>
          채팅
        </Link>
        <Link>
          <div>
            <HomeIcon width={20.66} height={20.66} />
          </div>
          홈
        </Link>
        <Link>
          <div>
            <SaveIcon width={20.66} height={20.66} />
          </div>
          찜
        </Link>
        <Link>
          <div>
            <ProfileIcon width={20.66} height={20.66} />
          </div>
          내 정보
        </Link>
      </div>
    </>
  );
}
