import { Link,useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import NavBar from '../../components/NavBar'
import Header from '../../components/Header'
import './MyPage.css'
import { SlArrowRight } from "react-icons/sl";




export default function MyPage(){
    const [images, setImages] = useState('https://opencloset.jihongeek.workers.dev/src/assets/Default_Profile.png');
    const [error, setError] = useState('');
    const [nickname, setNickname] = useState('');
    const [address, setAddress] = useState('');
    const token = localStorage.getItem('token');
    const navigate = useNavigate() 
    const backUrl = import.meta.env.VITE_BACK_URL;
    
 useEffect(() => {
  const fetchData = async () => {
    try {
      const res = await fetch(`${backUrl}/mypage/profile`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) 
        navigate('/login');
      
    
      const jsonData = await res.json(); 
      // console.log(jsonData);

      const image = jsonData.profileImage;
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

const logOut = async () =>{
try {
      const res = await fetch(`${backUrl}/mypage/logout`, {
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });
      if (!res.ok) {
      throw new Error('로그아웃 실패');
    }
  } catch (err) {
    console.log(err);
  } finally {
    localStorage.removeItem('token');
  };
}
  return (
    <div>
      <Header></Header>
      <section>


        <article className='user-space'>
          
          <span><img src={images} alt="" /></span>
                    <span>
                        <p>{nickname}</p> <span>{error}</span>
                        <p>{address}</p>
                    </span> 
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
          <Link to={'/accountSettings'}>
            <span>계정 관리</span>{' '}
            <span>
              {' '}
              <SlArrowRight size={24} />{' '}
            </span>
          </Link>
        </article>
        <div className='article-bar'></div>










        <article className='menu-item'>
          <Link to={'/'} onClick={logOut}>
           <span>로그아웃</span> <span> <SlArrowRight size={24}/>  </span>
          </Link>
           </article>
          <div className='article-bar'></div>
  






       
      </section>






      <NavBar></NavBar>
    </div>
  );
}

