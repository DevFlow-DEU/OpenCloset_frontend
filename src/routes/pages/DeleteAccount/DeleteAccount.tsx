import { useState } from 'react';
import ActionButton from '../../../components/ActionButton';
import BottomConfirmBar from '../../../components/BottomConfirmBar';
import Header from '../../../components/Header';
import styles from './DeleteAccount.module.css';

export default function DeleteAccount() {
  const [password, setPassword] = useState('');
  const isDisabled = password.trim().length === 0;

  return (
    <div className={styles.page}>
      <Header title='회원탈퇴' />
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
        >
          탈퇴하기
        </ActionButton>
      </BottomConfirmBar>
    </div>
  );
}
