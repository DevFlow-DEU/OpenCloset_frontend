import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useNavigate } from 'react-router-dom';
import './share.css';
import Header from '../../components/Header/Header';
import Input from '../../components/Input/Input';
import { Button } from '../../components/Button/Button';

const loginSchema = z.object({
  email: z
    .string()
    .trim()
    .min(1, '이메일을 입력해주세요.')
    .email('이메일 형식이 아닙니다.'),
  password: z
    .string()
    .trim()
    .min(1, '비밀번호를 입력해주세요.')
    .min(8, '비밀번호는 8자 이상이어야 합니다.'),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const navigate = useNavigate();
  const [message, setMessage] = useState('');
  const backUrl = import.meta.env.VITE_BACK_URL;

  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isDirty },
    reset,
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: '', password: '' },
  });

  const onSubmit = async (values: LoginFormValues) => {
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
      setMessage(data?.message || `이메일 또는 비밀번호가 일치하지 않습니다. (${res.status})`);
    } catch (e) {
      setMessage('서버에 연결할 수 없습니다.');
      console.error('network error:', e);
    }
  };

  return (
    <>
      <Header.Root hasNotch hasCamera>
        <Header.BackButton />
        <Header.CenterTitle title="이메일 로그인" />
      </Header.Root>
      <div className='SHcontainer'>
        <div className='space-60px'></div>
        <span className='ELspan typo-logo'>OPENCLOSET</span>
        <span className='ELspan'>에</span>
        <br />
        <span className='ELspan'>오신걸 환영합니다!</span>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className='logininput-space space-120px'></div>

          <Input
            label='이메일'
            placeholder='이메일 형식 입력'
            register={register('email')}
            error={errors.email}
          />
          <div className='space-28px'></div>
          <Input
            label='비밀번호'
            placeholder='비밀번호 8자리 이상'
            type='password'
            register={register('password')}
            error={errors.password}
          />
          <div className='button-space'>
            <Button
              variant='primary'
              className={`${isDirty && isValid ? 'check' : ''}`}
              type='submit'
              disabled={!(isDirty && isValid)}
            >
              로그인
            </Button>
          </div>
          {message && <p className='SHinput-error errorMSG'>{message}</p>}
        </form>
      </div>
    </>
  );
}
