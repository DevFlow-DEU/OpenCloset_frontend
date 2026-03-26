import { useState } from 'react';
import ActionButton from '../../../components/ActionButton';
import BottomConfirmBar from '../../../components/BottomConfirmBar';
import PageHeader from '../../../components/PageHeader';
import styles from './DeleteAccount.module.css';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { client } from '../../../api/client';
import { useMutation } from '@tanstack/react-query';
export default function DeleteAccount() {
  const [password, setPassword] = useState('');
  const isDisabled = password.trim().length === 0;
  const token = localStorage.getItem('token');
  const navigate = useNavigate();
  const mutation = useMutation({
    mutationFn: () =>
      client.DELETE('/auth/delete', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
    onError: (error) => {
      alert(`에러 발생\n\n${error}`);
    },
    onSuccess: async (data) => {
      if (data.response.status === 200) {
        alert('회원탈퇴가 완료되었습니다. 로그인 페이지로 이동합니다');
        navigate('/login');
      } else if (data.response.status === 401) {
        alert('비밀번호가 일치하지 않거나 탈퇴 권한이 없습니다.');
      } else {
        alert('현재 회원탈퇴를 이용할 수 없습니다. 잠시후 이용해주세요.');
      }
    },
  });
  useEffect(() => {
    if (!token) navigate('/login');
  }, [token, navigate]);
  return (
    <div className={styles.page}>
      <PageHeader title='회원탈퇴' />
      <main className={styles.content}>
        <section className={styles.formSection}>
          <label htmlFor='delete-account-password' className={styles.label}>
            비밀번호 확인
          </label>
          <div className={styles.passwordField}>
            <input
              id='delete-account-password'
              type='password'
              className={styles.passwordInput}
              placeholder='비밀번호 입력'
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              aria-label='비밀번호 입력'
            />
          </div>
        </section>
      </main>
      <BottomConfirmBar>
        <ActionButton
          type='button'
          fullWidth
          disabled={isDisabled}
          className={styles.submitButton}
          onClick={() => {
            mutation.mutate();
          }}
        >
          탈퇴하기
        </ActionButton>
      </BottomConfirmBar>
    </div>
  );
}
