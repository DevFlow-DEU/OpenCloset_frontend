import styles from './SignUpHome.module.css';
import { MdGpsFixed } from 'react-icons/md';
import { SignUpSchema } from './signUpSchema';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { EmailDomainInput } from '../../../components/EmailDomainInput';
import PageHeader from '../../../components/PageHeader';
import { useNavigate } from 'react-router-dom';
import { useSignUp } from './signUpContext';
import type { SignUpForm } from './signUpSchema';

export default function SignUpHome() {
  const { setSignUpData, address, ...signUpData } = useSignUp();
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = useForm<SignUpForm>({
    resolver: zodResolver(SignUpSchema),
    mode: 'onSubmit',
    defaultValues: signUpData,
  });
  const navigate = useNavigate();
  const domainOptions = [
    'gmail.com',
    'naver.com',
    'daum.net',
    'kakao.com',
    'hanmail.net',
    'nate.net',
  ];

  return (
    <div className={styles.signupPage}>
      <PageHeader title='회원가입' />

      <main className={styles.signupContent}>
        <form className={styles.signupForm} onSubmit={handleSubmit(() => {})}>
          <div className={`${styles.formGroup} ${styles.nicknameGroup}`}>
            <label className={styles.formLabel} htmlFor='nickname'>
              닉네임
            </label>
            <div className={styles.nicknameRow}>
              <input
                type='text'
                id='nickname'
                placeholder='닉네임 입력'
                className={`${styles.input} ${styles.nicknameInput}${
                  errors.nickname ? ' ' + styles.inputOnError : ''
                }`}
                {...register('nickname')}
              />
            </div>
            {errors.nickname ? (
              <p className={styles.error}>{errors.nickname.message}</p>
            ) : (
              ''
            )}
          </div>
          <div className={styles.formGroup}>
            <label className={styles.formLabel} htmlFor='email'>
              이메일
            </label>
            <div className={styles.emailRow}>
              <input
                type='text'
                id='localpart'
                {...register('emailLocalPart')}
                placeholder='이메일'
                className={`${
                  errors.emailLocalPart || errors.emailDomain
                    ? styles.inputOnError
                    : styles.input
                } ${styles.localpartInput}`}
              />
              <span className={styles.emailAt}>@</span>
              <EmailDomainInput
                error={
                  errors.emailDomain !== undefined ||
                  errors.emailLocalPart !== undefined
                }
                domainOptions={domainOptions}
                register={() => register('emailDomain')}
                setValue={setValue}
              />
            </div>
            {errors.emailDomain || errors.emailLocalPart ? (
              <p className={styles.error}>{'올바른 이메일을 입력해주세요.'}</p>
            ) : (
              ''
            )}
          </div>
          <div className={styles.formGroup}>
            <label className={styles.formLabel} htmlFor='password'>
              비밀번호
            </label>
            <input
              type='password'
              id='password'
              placeholder='비밀번호 입력'
              {...register('password')}
              className={errors.password ? styles.inputOnError : styles.input}
            />
            <p className={styles.helperText}>
              비밀번호는 8자 이상, 영문과 숫자를 포함해야 합니다.
            </p>
            {errors.password ? (
              <p className={styles.error}>{errors.password.message}</p>
            ) : (
              ''
            )}
          </div>
          <div className={styles.formGroup}>
            <label className={styles.formLabel} htmlFor='passwordConfirm'>
              비밀번호 확인
            </label>
            <input
              type='password'
              id='passwordConfirm'
              placeholder='비밀번호 입력'
              {...register('passwordConfirm')}
              className={
                errors.passwordConfirm ? styles.inputOnError : styles.input
              }
            />
            {errors.passwordConfirm ? (
              <p className={styles.error}>{errors.passwordConfirm.message}</p>
            ) : (
              ''
            )}
          </div>
          <div className={`${styles.formGroup} ${styles.addressGroup}`}>
            <label className={styles.formLabel} htmlFor='address'>
              주소
            </label>
            <div className={styles.addressBox}>
              <input
                type='text'
                {...register('address')}
                value={address}
                placeholder='현재 위치 찾기 버튼을 눌러주세요.'
                className={`${styles.input} ${styles.addressInput} ${
                  errors.address ? styles.inputOnError : ''
                }`}
                readOnly
              />
            </div>
            {errors.address ? (
              <p className={styles.error}>{errors.address.message}</p>
            ) : (
              ''
            )}
            <button
              type='button'
              className={`${styles.button} ${styles.primaryButton} ${styles.locationButton}`}
              onClick={() => {
                setSignUpData({ ...getValues(), address });
                navigate('get-location');
              }}
            >
              <MdGpsFixed />
              <span>현재 위치로 찾기</span>
            </button>
          </div>
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
