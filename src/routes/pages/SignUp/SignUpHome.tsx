import '../share.css';
import styles from './SignUpHome.module.css';
import { MdGpsFixed } from 'react-icons/md';
import { SignUpSchema } from './signUpSchema';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import Header from '../../../components/Header.tsx';
import BottomConfirmBar from '../../../components/BottomConfirmBar';
import { useNavigate } from 'react-router-dom';
import { useSignUp } from './signUpContext';
import type { SignUpForm } from './signUpSchema';
import { client } from '../../../api/client';
import { useMutation } from '@tanstack/react-query';
import type { components } from '../../../api/api';
export default function SignUpHome() {
  const { setSignUpData, address, ...signUpData } = useSignUp();
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<SignUpForm>({
    resolver: zodResolver(SignUpSchema),
    mode: 'onSubmit',
    defaultValues: signUpData,
  });
  const navigate = useNavigate();
  const mutation = useMutation({
    mutationFn: (newUserInfo: components['schemas']['UserCreateRequestDto']) =>
      client.POST('/auth/register', { body: newUserInfo }),
    onError: (error) => {
      alert(`에러 발생\n\n${error}`);
    },
    onSuccess: async (data) => {
      if (data.response.status === 200) {
        alert('회원가입에 성공했습니다. 로그인 페이지로 이동합니다');
        navigate('/EmailLogin');
      } else if (data.response.status === 400) {
        const errorBody = data.error as { message?: string };
        alert(errorBody?.message ?? '요청이 올바르지 않습니다.');
      } else {
        alert('현재 회원가입을 이용할 수 없습니다. 잠시후 이용해주세요.');
      }
    },
  });

  return (
    <div className={styles.pageLayout}>
      <Header title='회원가입' />
      <main className={styles.contentLayout}>
        <form
          noValidate
          id='signup-form'
          className='SHinput-container'
          onSubmit={handleSubmit(() => {
            const { password, email, nickname } = getValues();
            mutation.mutate({
              email,
              password,
              nickname,
              address,
              age: '',
            });
          })}
        >
          <div>
            <p className='SHinput-tittle'>닉네임</p>
            <input
              type='text'
              id='nickname'
              placeholder='닉네임 입력'
              className='SHinput'
              {...register('nickname')}
            />
            <div
              className={`SHinput-bar ${errors.nickname ? 'red' : ''}`}
            ></div>
            <div className='SHinput-space space-28px'>
              {errors.nickname ? (
                <p className='SHinput-error'>{errors.nickname.message}</p>
              ) : (
                ''
              )}
            </div>
          </div>
          <div>
            <p className='SHinput-tittle'>이메일</p>
            <input
              type='email'
              id='email'
              {...register('email')}
              placeholder='이메일'
              className='SHinput'
            />
            <div className={`SHinput-bar ${errors.email ? 'red' : ''}`}></div>
            <div className='SHinput-space space-28px'>
              {errors.email ? (
                <p className='SHinput-error'>
                  {'올바른 이메일을 입력해주세요.'}
                </p>
              ) : (
                ''
              )}
            </div>
          </div>
          <div>
            <p className='SHinput-tittle'>비밀번호</p>
            <input
              type='password'
              id='password'
              placeholder='비밀번호 입력'
              {...register('password')}
              className='SHinput'
            />
            <div
              className={`SHinput-bar ${errors.password ? 'red' : ''}`}
            ></div>
            <p style={{ margin: 0, color: '#6e6e6e', fontSize: '13px' }}>
              비밀번호는 8자 이상, 영문과 숫자를 포함해야 합니다.
            </p>
            <div className='SHinput-space space-28px'>
              {errors.password ? (
                <p className='SHinput-error'>{errors.password.message}</p>
              ) : (
                ''
              )}
            </div>
          </div>
          <div>
            <p className='SHinput-tittle'>비밀번호 확인</p>
            <input
              type='password'
              id='passwordConfirm'
              placeholder='비밀번호 입력'
              {...register('passwordConfirm')}
              className='SHinput'
            />
            <div
              className={`SHinput-bar ${errors.passwordConfirm ? 'red' : ''}`}
            ></div>
            <div className='SHinput-space space-28px'>
              {errors.passwordConfirm ? (
                <p className='SHinput-error'>
                  {errors.passwordConfirm.message}
                </p>
              ) : (
                ''
              )}
            </div>
          </div>
          <div>
            <p className='SHinput-tittle'>주소</p>
            <input
              type='text'
              {...register('address')}
              value={address}
              placeholder='현재 위치 찾기 버튼을 눌러주세요.'
              className='SHinput'
              disabled
            />
            <div className={`SHinput-bar ${errors.address ? 'red' : ''}`}></div>
            <div className='SHinput-space space-28px'>
              {errors.address ? (
                <p className='SHinput-error'>{errors.address.message}</p>
              ) : (
                ''
              )}
            </div>
            <button
              type='button'
              className='SHsubmit check'
              onClick={() => {
                setSignUpData({ ...getValues(), address });
                navigate('get-location');
              }}
            >
              <MdGpsFixed />
              <span>현재 위치로 찾기</span>
            </button>
          </div>
        </form>
      </main>
      <BottomConfirmBar>
        <button
          form='signup-form'
          type='submit'
          className={`${styles.submitButton} SHsubmit check`}
        >
          ✓ 가입하기
        </button>
      </BottomConfirmBar>
    </div>
  );
}
