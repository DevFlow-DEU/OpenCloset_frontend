import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import NavBar from '../../components/NavBar';
import Header from '../../components/Header';
import './MyPage.css';
import { SlArrowRight } from 'react-icons/sl';

export default function MyPage() {
  const [images, setImages] = useState('');
  const [error, setError] = useState('');
  const [nickname, setNickname] = useState('');
  const [address, setAddress] = useState('');
  const token = localStorage.getItem('token');
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('백엔드 주소', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) throw new Error('서버 응답 실패');

        const jsonData = await res.json();

        const image = jsonData.image;
        const nickname = jsonData.nickname;
        const address = jsonData.address;

        setImages(image);
        setNickname(nickname);
        setAddress(address);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchData();
  }, []);

  const logOut = () => {
    localStorage.removeItem('token');
  };

  return (
    <div>
      <Header></Header>
      <section>
        <article className='user-space'>
          <span>
            <img
              src='https://tistory1.daumcdn.net/tistory/4004376/attach/b8d060dd75504b4bba978219138fc926'
              alt=''
            />
          </span>
          <span>
            <p> USER1234</p>
            <p>부산광역시 진구 가야동</p>
          </span>
          {/* <span><img src={images} alt="" /></span>
                    <span>
                        <p>{nickname}</p> <span>{error}</span>
                        <p>{address}</p>
                    </span> */}
        </article>
        <div className='article-bar'></div>

        <article className='menu-item'>
          <Link to={'/'}>
            <span>상품 관리</span>{' '}
            <span>
              {' '}
              <SlArrowRight size={24} />{' '}
            </span>
          </Link>
        </article>
        <div className='article-bar'></div>

        <article className='menu-item'>
          <Link to={'/change-address'}>
            <span>주소 변경</span>{' '}
            <span>
              {' '}
              <SlArrowRight size={24} />{' '}
            </span>
          </Link>
        </article>
        <div className='article-bar'></div>

        <article className='menu-item'>
          <Link to={'/PasswordChange'}>
            <span>비밀번호 변경</span>{' '}
            <span>
              {' '}
              <SlArrowRight size={24} />{' '}
            </span>
          </Link>
        </article>
        <div className='article-bar'></div>

        <article className='menu-item'>
          <Link to={'/'} onClick={logOut}>
            <span>로그아웃</span>{' '}
            <span>
              {' '}
              <SlArrowRight size={24} />{' '}
            </span>
          </Link>
        </article>
        <div className='article-bar'></div>

        <article className='menu-item'>
          <Link to={'/delete-account'}>
            <span>회원탈퇴</span>{' '}
            <span>
              {' '}
              <SlArrowRight size={24} />{' '}
            </span>
          </Link>
        </article>
        <div className='article-bar'></div>
      </section>

      <NavBar></NavBar>
    </div>
  );
}
