import { useNavigate } from "react-router-dom";



export default function KakaoLoginButton() {
  
const navigate = useNavigate();
  const handleKakaoLogin = () => {
    if (!window.Kakao) {
        navigate("/error", {
        replace: true,
        state: { error: "SDK 스크립트 오류", errorDesc: "index의 SDK스크립트 수정" },
      });
      return;
    }
    if (!window.Kakao.isInitialized()) {
         navigate("/error", {
        replace: true,
        state: { error: "init오류", errorDesc: "main.jsx 수정" },
      });
      return;
    }
    const checkurl = import.meta.env.VITE_KAKAO_CHECK_URL ;
    window.Kakao.Auth.authorize({
      redirectUri: `${checkurl}`,//주소는 나중에 배포하면 수정해야함
      throughTalk: false, //앱이 아닌 웹으로 로그인
     
    });
  };

  return (
    <button onClick={handleKakaoLogin} className="comkalo" >
    </button>
  );
}
