import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function KakaoCallback() {
  const navigate = useNavigate();

  useEffect(() => {
    const currentUrl = new URL(window.location.href);
    const code = currentUrl.searchParams.get("code");
    const error = currentUrl.searchParams.get("error");
    const errorDesc = currentUrl.searchParams.get("error_description");

    // 1) 카카오에서 error로 돌아온 경우
    if (error) {
      navigate("/error", {
        replace: true,
        state: { error, errorDesc: errorDesc || "카카오 서버 오류" },
      });
      return;
    }

    // 2) code가 없는 경우(이상 케이스)
    if (!code) {
      navigate("/error", {
        replace: true,
        state: { error: "code 없음", errorDesc: "카카오톡으로부터 코드를 받지 못함" },
      });
      return;
    }

    (async () => {
      try {
        const backCodeUrl = import.meta.env.VITE_BACK_CODE_URL;
        if (!backCodeUrl) {
          throw new Error("환경변수 문제");
        }

        const backendUrl = new URL(backCodeUrl);
        backendUrl.searchParams.set("code", code);

        console.log(backendUrl)

        const res = await fetch(backendUrl.toString(), {
          method: "GET",
          headers: { Accept: "application/json" },
        });
        console.log("backendUrl:", backendUrl.toString());

        const text = await res.text(); // 에러 메시지 확인용으로 먼저 text로 받기

        if (!res.ok) {
          throw new Error(`opencloset 서버 오류: ${res.status} ${text}`);
        }

        // 성공이면 JSON 파싱
        const data = JSON.parse(text);

        const accessToken = data?.accessToken;
        const refreshToken = data?.refreshToken;

        if (!accessToken) {
          throw new Error("토큰 에러: accessToken이 응답에 없음");
        }

        localStorage.setItem("accessToken", accessToken);
        if (refreshToken) localStorage.setItem("refreshToken", refreshToken);

        // code 제거(재진입/오류 예방)
        window.history.replaceState({}, document.title, "/kakaocheck");

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
