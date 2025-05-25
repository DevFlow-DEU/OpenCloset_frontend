import React, { useState } from 'react';
import './Login.css';
import { Link, useNavigate } from 'react-router-dom';
import Logo_main from '../../assets/logo_main.svg?react';


const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);//로그인 버튼 로딩용
  const navigate = useNavigate();
  
  
  function validation(value) {
  return value.length > 0 // && value.length <= 20
}







  //------------------------------------------------------------------------------------------------
  const handleLogin = async (e) => {
    setLoading(true); // 시작 시 로딩 아이콘(로그인 버튼에 씀)
    e.preventDefault();

// async: 비동기(await 사용하려면 필수수)
// , preventDefault: 새로고침 막기 (form은 자동으로 새로고침 됨)

//예외 처리
    try {   

      if (!validation(username)) {
    setMessage('아이디를 입력해주세요.');
    return;
  }
  if (!validation(password)) {
    setMessage('비밀번호를 입력해주세요.');
    return;
  }


      //기본양식식
      const res = await fetch('http://113.198.229.158:8880/auth/login', {//await 비동기 처리 (굳이 싶지만 하면 좋으니깐 ^^)
        method: 'POST',
        headers:{'content-type': 'application/json'},
        body: JSON.stringify({
          username,
          password,
        }),
      });



      const data = await res.json(); // await fetch 값 date에 넣기
      
      if (res.ok) {// 토큰 받았을 때
        // console.log('서버 응답:', data); //디버그용용
        localStorage.setItem('token', data.accessToken); // 토큰저장 토큰 형식은 알아서 바꿔야 함
        navigate('/home');//로그인 되면 홈으로 가도록
      } else { //토큰 못 받았을 때
        setMessage(`아이디 또는 비밀번호가 일치하지 않습니다`);
      }
    } catch (error) {// 에러
      // console.error('서버 오류:', error); 디버그용용
      setMessage('error');
    }finally { // 로딩 아이콘, 초기화
    setLoading(false);
    setUsername('');
    setPassword('');
    }
  };
//--------------------------------------------------------------------------------------------------------




  //----------------------------------------------------------------------------------------------------
  return (
    <div className="login-container">
    
      <form className="login-form" onSubmit={handleLogin}>



        <div className="logo-container">

          {/* <img src="main_logo" alt="logo" /> */}
          <Logo_main />


          {/* <img src="/logo_main.svg" /> */}
        </div>

        <div className='inputmargin'>
        <input className='logininput'
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        

        <input className='logininput'
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        </div>  


{/* 로그인 버튼   ----------------------------------------------------------------------------*/}
        <button type="submit" disabled={loading}>
         {loading ? `loading...` : 'Log in'}
        </button>





        <div className="login-links">

          <Link to={'/username_search'} className='login-link'>
            아이디 찾기</Link>
          <div></div>
          <Link to={'/password_search'} className='login-link'>
            비밀번호 찾기</Link>
          <div></div>
          <Link to={'/Sign_up'} className='login-link'>
           회원 가입</Link>
          {/* 찾기 버튼튼 */}
        </div>



        {message && <p className="login-message">{message}</p>}
        {/* 오류 상태 표시시 */}



      </form>
    </div>
  );
};

export default LoginPage;
