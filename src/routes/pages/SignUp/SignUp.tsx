import styles from './SignUp.module.css';
import { MdGpsFixed } from 'react-icons/md';
export default function SignUp() {
  return (
    <div className={styles.signupPage}>
      <header className={styles.signupHeader}>
        <h1 className={styles.signupTitle}>회원가입</h1>
      </header>

      <div className={styles.divider} />

      <main className={styles.signupContent}>
        <form className={styles.signupForm}>
          {/* 닉네임 */}
          <div className={`${styles.formGroup} ${styles.nicknameGroup}`}>
            <label className={styles.formLabel} htmlFor='nickname'>
              닉네임
            </label>
            <div className={styles.nicknameRow}>
              <input
                type='text'
                id='nickname'
                name='nickname'
                placeholder='닉네임 입력'
                className={`${styles.input} ${styles.nicknameInput}`}
              />
              <button
                type='button'
                className={`${styles.button} ${styles.primaryButton} ${styles.nicknameCheckButton}`}
              >
                확인
              </button>
            </div>
          </div>

          {/* 이메일 */}
          <div className={styles.formGroup}>
            <label className={styles.formLabel} htmlFor='email'>
              이메일
            </label>
            <input
              type='email'
              id='email'
              name='email'
              placeholder='이메일'
              className={styles.input}
            />
          </div>

          {/* 비밀번호 */}
          <div className={styles.formGroup}>
            <label className={styles.formLabel} htmlFor='password'>
              비밀번호
            </label>
            <input
              type='password'
              id='password'
              name='password'
              placeholder='비밀번호 입력'
              className={styles.input}
            />
          </div>

          {/* 비밀번호 확인 */}
          <div className={styles.formGroup}>
            <label className={styles.formLabel} htmlFor='passwordConfirm'>
              비밀번호 확인
            </label>
            <input
              type='password'
              id='passwordConfirm'
              name='passwordConfirm'
              placeholder='비밀번호 입력'
              className={styles.input}
            />
          </div>

          {/* 주소 + 현재 위치로 찾기 */}
          <div className={`${styles.formGroup} ${styles.addressGroup}`}>
            <label className={styles.formLabel} htmlFor='address'>
              주소
            </label>
            <div className={styles.addressBox}>
              <input
                type='text'
                id='address'
                name='address'
                placeholder='현재 위치 찾기 버튼을 눌러주세요.'
                className={`${styles.input} ${styles.addressInput}`}
                readOnly
              />
            </div>
            <button
              type='button'
              className={`${styles.button} ${styles.primaryButton} ${styles.locationButton}`}
            >
              <MdGpsFixed />
              <span>현재 위치로 찾기</span>
            </button>
          </div>

          {/* 하단 가입하기 버튼 */}
          <button
            type='submit'
            className={`${styles.button} ${styles.primaryButton} ${styles.submitButton}`}
          >
            ✓ 가입하기
          </button>
        </form>
      </main>
    </div>
  );
}
