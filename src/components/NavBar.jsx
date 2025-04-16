import { Link } from 'react-router-dom';
import styles from '../routes/pages/Home.module.css';
import SaveIcon from '../assets/save.svg?react';
import MapIcon from '../assets/map.svg?react';
import ProfileIcon from '../assets/profile.svg?react';
import HomeIcon from '../assets/home.svg?react';
import ChatIcon from '../assets/chat.svg?react';
export default function NavBar() {
  return (
    <div className={styles['nav-bar']}>
      <Link to={'/map'}>
        <div>
          <MapIcon width={20.66} height={20.66} />
        </div>
        지도
      </Link>
      <Link to={'/chat'}>
        <div>
          <ChatIcon width={20.66} height={20.66} />
        </div>
        채팅
      </Link>
      <Link to={'/'}>
        <div>
          <HomeIcon width={20.66} height={20.66} />
        </div>
        홈
      </Link>
      <Link to={'/save'}>
        <div>
          <SaveIcon width={20.66} height={20.66} />
        </div>
        찜
      </Link>
      <Link to={'/profile'}>
        <div>
          <ProfileIcon width={20.66} height={20.66} />
        </div>
        내 정보
      </Link>
    </div>
  );
}
