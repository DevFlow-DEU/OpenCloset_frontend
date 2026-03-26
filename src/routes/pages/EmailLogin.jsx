import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema } from './loginValidator';
import { useNavigate } from 'react-router-dom';
import './share.css';
import Header from '../../components/Header';

export default function LoginPage() {
  const navigate = useNavigate();
  const [message, setMessage] = useState('');
  const backUrl = import.meta.env.VITE_BACK_URL;

  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isDirty },
    reset,
  } = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: '', password: '' },
  });

  const onSubmit = async (values) => {
    try {
      const res = await fetch(`${backUrl}/auth/login`, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(values),
      });
      const data = await res.json().catch(() => null);

      if (res.ok) {
        localStorage.setItem('token', data?.accessToken ?? '');
        navigate('/');
        reset();
      }
      setMessage(data?.message || `요청 실패 (${res.status})`);
    } catch (e) {
      setMessage('서버에 연결할 수 없습니다.');
      console.error('network error:', e);
    }
  };

  return (
    <>
      <Header />
      <div className='SHcontainer'>
        <div className='space-60px'></div>
        <span className='ELspan typo-logo'>OPENCLOSET</span>
        <span className='ELspan'>에</span>
        <br />
        <span className='ELspan'>오신걸 환영합니다!</span>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className='logininput-space space-120px'></div>

          <div>
            <p className='SHinput-tittle'>이메일</p>
            <input
              className='SHinput'
              placeholder='이메일 형식 입력'
              {...register('email')}
            />
            <div className={`SHinput-bar ${errors.email ? 'red' : ''}  `}></div>
            <div className='SHinput-space space-28px'>
              {errors.email && (
                <p className='SHinput-error'>{errors.email.message}</p>
              )}
            </div>
          </div>

          <div>
            <p className='SHinput-tittle'>비밀번호</p>
            <input
              className='SHinput'
              type='password'
              placeholder='비밀번호 8자리 이상'
              {...register('password')}
            />
            <div
              className={`SHinput-bar ${errors.password ? 'red' : ''}  `}
            ></div>
            <div className='SHinput-space space-28px'>
              {errors.password && (
                <p className='SHinput-error'>{errors.password.message}</p>
              )}
            </div>
          </div>

          <button
            className={`SHsubmit ${isDirty && isValid ? 'check' : ''}`}
            type='submit'
            disabled={!(isDirty && isValid)}
          >
            {' '}
            로그인
          </button>

          {message && <p className='SHinput-error errorMSG'>{message}</p>}
        </form>
      </div>
    </>
  );
}
