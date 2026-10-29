import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { getMyProfile } from '../../my/api';
import { setTokens } from '../../../api/token';
import { useKakaoCallback } from '../hooks';
import { getApiErrorMessage } from '../../../api/http';

export default function KakaoCallback() {
  const navigate = useNavigate();
  const kakaoCallback = useKakaoCallback();
  const hasRun = useRef(false);

  useEffect(() => {
    if (hasRun.current) return;
    hasRun.current = true;

    const currentUrl = new URL(window.location.href);
    const code = currentUrl.searchParams.get('code');
    const error = currentUrl.searchParams.get('error');
    const errorDesc = currentUrl.searchParams.get('error_description');

    // 1) 카카오에서 error로 돌아온 경우
    if (error) {
      navigate('/error', {
        replace: true,
        state: { error, errorDesc: errorDesc || '카카오 서버 오류' },
      });
      return;
    }

    // 2) code가 없는 경우(이상 케이스)
    if (!code) {
      navigate('/error', {
        replace: true,
        state: {
          error: 'code 없음',
          errorDesc: '카카오톡으로부터 코드를 받지 못함',
        },
      });
      return;
    }

    kakaoCallback.mutate(code, {
      onSuccess: async (data) => {
        if (!data?.accessToken) {
          navigate('/error', {
            replace: true,
            state: {
              error: '토큰 에러',
              errorDesc: 'accessToken이 응답에 없음',
            },
          });
          return;
        }

        setTokens(data.accessToken, data.refreshToken);

        // code 제거(재진입/오류 예방)
        window.history.replaceState({}, document.title, '/kakaocheck');

        try {
          const profile = await getMyProfile();
          if (!profile?.address) {
            navigate('/KakaoSignUp', { replace: true });
            return;
          }
        } catch (profileError) {
          console.error('프로필 조회 실패:', profileError);
        }

        navigate('/', { replace: true });
      },
      onError: (err) => {
        navigate('/error', {
          replace: true,
          state: {
            error: '로그인 실패',
            errorDesc: getApiErrorMessage(err, '로그인에 실패했습니다.'),
          },
        });
      },
    });
  }, [navigate, kakaoCallback]);

  return <div>카카오 로그인 처리 중...</div>;
}
