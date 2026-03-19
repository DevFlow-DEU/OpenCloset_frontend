
import "./Login.css";
import { Link } from "react-router-dom";
import Logo_main from "../../assets/login-logo.svg?react";
import KakaoLogin from "../../components/KakaoLogin";
import KakaoLogo from "../../assets/kakaologo.png";

export default function LoginPage() {


  return (
    <div className="login-container">
      <div className="logo-main">
     <Logo_main />
     </div>
      <div className="login-content">

      <div className="kakao-login">
        <img src={KakaoLogo} alt="kakao" className="kakaologo" />
        <KakaoLogin />
        <span>카카오 로그인</span>
      </div>

      <Link to='/EmailLogin' >
      <div className="email-login">
        <span>이메일로 로그인</span>
        </div>
      </Link>

    <div className="login-links">
          <Link to="/PasswordFind" className="login-link">비밀번호 찾기</Link>
          <span>|</span>
          <Link to="/Sign_up" className="login-link">회원 가입</Link>
        </div>
    </div>
    </div>
  );
}