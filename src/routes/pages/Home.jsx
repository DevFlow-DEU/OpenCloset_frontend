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
import TopsIcon from '../../assets/icon/Category/Tops.svg?react';
import PantsIcon from '../../assets/icon/Category/Pants.svg?react';
import OuterIcon from '../../assets/icon/Category/Outer.svg?react';
import BagIcon from '../../assets/icon/Category/Bag.svg?react';
import JewelryIcon from '../../assets/icon/Category/Jewelry.svg?react';
import OnePieceIcon from '../../assets/icon/Category/OnePiece.svg?react';
import ShoesIcon from '../../assets/icon/Category/Shoes.svg?react';
import AccessoryIcon from '../../assets/icon/Category/Accessory.svg?react';
import LikeGrayHeartIcon from '../../assets/icon/Like_gray_heart.svg?react';
import LikeRedHeartIcon from '../../assets/icon/Like_red_heart.svg?react';
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
            <div className={styles['item']}>
              <Link>
                <button className={styles['save-button']}>
                  <LikeRedHeartIcon width={'16.06px'} height={'14.34px'} />
                </button>
                <div className={styles['item-thumbnail']}>
                  <img
                    src='/hoodie.png'
                    alt='hoodie'
                    width='170.13px'
                    height='169.56px'
                  />
                </div>
                <div className={styles['item-description-container']}>
                  <div className={styles['item-name']}>
                    Script Logo Heavyweigh...
                  </div>
                  <div>
                    <span className={styles['item-cost']}>3,700원</span>
                    <span className={styles['item-period']}> / 3일</span>
                  </div>
                  <div className={styles['item-location']}>중앙동</div>
                </div>
              </Link>
            </div>
            <div className={styles['item']}>
              <Link>
                <button className={styles['save-button']}>
                  <LikeGrayHeartIcon width={'16.06px'} height={'14.34px'} />
                </button>
                <div className={styles['item-thumbnail']}>
                  <img
                    src='/windbreaker.png'
                    alt='windbreaker'
                    width='170.13px'
                    height='169.56px'
                  />
                </div>
                <div className={styles['item-description-container']}>
                  <div className={styles['item-name']}>
                    Script Logo Heavyweigh...
                  </div>
                  <div>
                    <span className={styles['item-cost']}>3,700원</span>
                    <span className={styles['item-period']}> / 3일</span>
                  </div>
                  <div className={styles['item-location']}>중앙동</div>
                </div>
              </Link>
            </div>
            <div className={styles['item']}>
              <Link>
                <button className={styles['save-button']}>
                  <LikeGrayHeartIcon width={'16.06px'} height={'14.34px'} />
                </button>
                <div className={styles['item-thumbnail']}>
                  <img
                    src='/pants.png'
                    alt='pants'
                    width='170.13px'
                    height='169.56px'
                  />
                </div>
                <div className={styles['item-description-container']}>
                  <div className={styles['item-name']}>
                    Script Logo Heavyweigh...
                  </div>
                  <div>
                    <span className={styles['item-cost']}>3,700원</span>
                    <span className={styles['item-period']}> / 3일</span>
                  </div>
                  <div className={styles['item-location']}>중앙동</div>
                </div>
              </Link>
            </div>
            <div className={styles['item']}>
              <Link>
                <button className={styles['save-button']}>
                  <LikeGrayHeartIcon width={'16.06px'} height={'14.34px'} />
                </button>
                <div className={styles['item-thumbnail']}>
                  <img
                    src='/pants1.png'
                    alt='pants1'
                    width='170.13px'
                    height='169.56px'
                  />
                </div>
                <div className={styles['item-description-container']}>
                  <div className={styles['item-name']}>
                    Script Logo Heavyweigh...
                  </div>
                  <div>
                    <span className={styles['item-cost']}>3,700원</span>
                    <span className={styles['item-period']}> / 3일</span>
                  </div>
                  <div className={styles['item-location']}>중앙동</div>
                </div>
              </Link>
            </div>
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
