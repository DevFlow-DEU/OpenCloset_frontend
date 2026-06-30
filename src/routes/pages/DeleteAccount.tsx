import './share.css';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import Header from '../../components/Header/Header';
import { Button } from '../../components/Button/Button';
import Input from '../../components/Input/Input';
import Alert from '../../components/Alert/Alert';
import { client } from '../../api/client';

type AlertState =
  | { type: 'confirm' }
  | { type: 'error'; message: string };

export default function DeleteAccount() {
  const [password, setPassword] = useState('');
  const [alertState, setAlertState] = useState<AlertState | null>(null);
  const token = localStorage.getItem('token');
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) navigate('/login');
  }, [token, navigate]);

  const mutation = useMutation({
    mutationFn: (password: string) =>
      client.DELETE('/auth/delete', {
        headers: { Authorization: `Bearer ${token}` },
        body: { password },
      }),
    onError: (error) => {
      setAlertState({ type: 'error', message: `에러 발생\n${error}` });
    },
    onSuccess: (data) => {
      if (data.response.status === 200) {
        navigate('/DeleteAccountComplete');
      } else if (data.response.status === 401) {
        setAlertState({ type: 'error', message: '탈퇴 권한이 없습니다.' });
      } else if (data.response.status === 400) {
        setAlertState({ type: 'error', message: '비밀번호가 일치하지 않습니다.' });
      } else {
        setAlertState({ type: 'error', message: '현재 회원탈퇴를 이용할 수 없습니다. 잠시후 이용해주세요.' });
      }
    },
  });

  return (
    <>
      <Header.Root hasNotch hasCamera>
        <Header.BackButton />
        <Header.CenterTitle title="회원 탈퇴" />
      </Header.Root>

      <div className="SHcontainer">
        <div className="space-40px" />
        <Input
          label="비밀번호 확인"
          type="password"
          placeholder="비밀번호 입력"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      <div className="fixed-bottom">
        <Button
          variant="primary"
          type="button"
          disabled={password.trim().length === 0}
          style={{ marginTop: '12px' }}
          onClick={() => setAlertState({ type: 'confirm' })}
        >
          탈퇴하기
        </Button>
      </div>

      {alertState?.type === 'confirm' && (
        <Alert
          icon="warning"
          title="정말 오픈 클로젯을 떠나시겠어요?"
          description={<>탈퇴 후에는 기존 계정으로 로그인할 수 없으며,<br />대여 내역, 관심 상품, 등록한 옷 정보가 삭제됩니다.</>}
          buttons="delete"
          onConfirm={() => {
            setAlertState(null);
            mutation.mutate(password);
          }}
          onCancel={() => setAlertState(null)}
        />
      )}

      {alertState?.type === 'error' && (
        <Alert
          icon="warning"
          title="오류"
          description={alertState.message}
          buttons="confirm"
          onConfirm={() => setAlertState(null)}
        />
      )}
    </>
  );
}
