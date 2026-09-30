import { Link, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import NavigationBar from '../../../components/NavigationBar/NavigationBar';
import Header from '../../../components/Header/Header';
import '../../../components/MyPage.css';
import { SlArrowRight } from 'react-icons/sl';
import { useLogout, useMyProfile } from '../hooks';

const DEFAULT_PROFILE_IMAGE =
  'https://opencloset.jihongeek.workers.dev/src/assets/Default_Profile.png';

export default function MyPage() {
  const navigate = useNavigate();
  const { data, isError } = useMyProfile();
  const logout = useLogout();

  useEffect(() => {
    if (isError) navigate('/login');
  }, [isError, navigate]);

  const images = data?.profileImage ?? DEFAULT_PROFILE_IMAGE;
  const nickname = data?.nickname ?? '';
  const address = data?.address ?? '';

  return (
    <div>
      <Header.Root hasNotch hasCamera>
        <Header.MainTitle title="내 정보" />
      </Header.Root>
      <section>
        <article className="user-space">
          <span>
            <img src={images} alt="" />
          </span>
          <span>
            <p>{nickname}</p>
            <p>{address}</p>
          </span>
        </article>
        <div className="article-bar"></div>

        <article className="menu-item">
          <Link to={'/ProductManage'}>
            <span>상품 관리</span>{' '}
            <span>
              {' '}
              <SlArrowRight size={24} />{' '}
            </span>
          </Link>
        </article>
        <div className="article-bar"></div>

        <article className="menu-item">
          <Link to={'/accountSettings'}>
            <span>내 정보 관리</span>{' '}
            <span>
              {' '}
              <SlArrowRight size={24} />{' '}
            </span>
          </Link>
        </article>
        <div className="article-bar"></div>

        <article className="menu-item">
          <Link to={'/'} onClick={() => logout.mutate()}>
            <span>로그아웃</span>{' '}
            <span>
              {' '}
              <SlArrowRight size={24} />{' '}
            </span>
          </Link>
        </article>
        <div className="article-bar"></div>
      </section>

      <NavigationBar />
    </div>
  );
}
