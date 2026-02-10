import { useEffect } from "react";
import { useNavigate } from "react-router-dom";


export default function KakaoCallback() {
  const navigate = useNavigate();

  useEffect(() => {
    const url = new URL(window.location.href);
    const code = url.searchParams.get("code");
    const error = url.searchParams.get("error");
    const errorDesc = url.searchParams.get("error_description");

    // 1) 카카오에서 error로 돌아온 경우
    if (error) {
      navigate("/error", {
        replace: true,
        state: { error, errorDesc:"카카오 서버 오류" },
      });
      return;
    }

    // code가 없는 경우(이상 케이스)
    if (!code) {
      navigate("/error", {
        replace: true,
        state: { error: "code 없음", errorDesc: "카카오톡으로부터 코드를 받지 못함" },
      });
      return;
    }

    //  code를 백엔드로 전달 → 우리 서비스 토큰 받기
    (async () => {
      try {
        const BackCodeUrl = import.meta.env.VITE_BACK_CODE_URL

        const res = await fetch(`${BackCodeUrl}`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ code }),
        });

        // 백엔드가 에러를 준 경우
        if (!res.ok) {
          const text = await res.text().catch(() => "");
          throw new Error(`opencloset 서버 오류 (error message:${res.status} ${text})`);
        }

        const data = await res.json();//값 받아오기

        if (!data?.Token) {
          throw new Error("토큰 에러");
        }

        localStorage.setItem("token", data.Token);

        // code 제거(오류 예방)
        window.history.replaceState({}, document.title, "/kakaocheck");

        // 홈으로 이동
        navigate("/", { replace: true });
      } catch (e) {
        navigate("/error", {
          replace: true,
          state: { error: "로그인 실패", errorDesc: String(e?.message || e) },
        });
      }
    })();
  }, [navigate]);

  return <div>카카오 로그인 처리 중...</div>;
}
