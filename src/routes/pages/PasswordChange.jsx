import { useEffect, useState } from 'react';
import Header from '../../components/Header';
import NavBar from '../../components/NavBar';
import './share.css';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { pwChangeSchema } from './PWChangeSchema.ts';
import { useNavigate } from 'react-router-dom';
export default function PasswordChange() {
  const navigate = useNavigate();
  // const [currentPassword,setcurrentPassword] = useState('')
  // const [newPassword,setNewPassword] = useState('')
  // const [checkPassword,setCheckPassword] = useState('')
  const backUrl = import.meta.env.VITE_BACK_URL;
  const [errorMSG, setErrorMSG] = useState('');
  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isDirty },
    reset,
  } = useForm({
    resolver: zodResolver(pwChangeSchema),
    defaultValues: { currentPassword: '', newPassword: '', checkPassword: '' },
    mode: 'onChange',
  });

  const onSubmit = async (values) => {
    const { currentPassword, newPassword } = values;
    const token = localStorage.getItem('token');

    try {
      const res = await fetch(`${backUrl}/auth/password-change`, {
        method: 'PUT',
        headers: {
          'content-type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ currentPassword, newPassword }),
      });

      const data = await res.json().catch(() => null);

      if (res.ok) {
        reset();
        navigate('/');
      } else {
        setErrorMSG('비밀번호 변경 실패', data);
      }
    } catch (error) {
      setErrorMSG(error.message || '요청 중 오류가 발생했습니다.');
    }
  };

  return (
    <>
      <Header></Header>
      <div className='SHcontainer'>
        <form action='' onSubmit={handleSubmit(onSubmit)}>
          <div className=' space-40px'></div>

          <div>
            <p className='SHinput-tittle'>현재 비밀번호</p>
            <input
              {...register('currentPassword')}
              className='SHinput'
              type='password'
              placeholder='현재 비밀번호 입력'
            />
            <div
              className={`SHinput-bar ${errors.currentPassword ? 'red' : ''}  `}
            ></div>
            <div className='SHinput-space space-40px'>
              {errors.currentPassword && (
                <p className='SHinput-error'>
                  {errors.currentPassword.message}
                </p>
              )}
            </div>
          </div>

          <div>
            <p className='SHinput-tittle'>새 비밀번호</p>
            <input
              {...register('newPassword')}
              className='SHinput'
              type='password'
              placeholder='새 비밀번호 입력'
            />
            <div
              className={`SHinput-bar  ${errors.newPassword ? 'red' : ''}`}
            ></div>
            <div className='SHinput-space space-28px'>
              {errors.newPassword && (
                <p className='SHinput-error'>{errors.newPassword.message}</p>
              )}
            </div>
          </div>

          <div>
            <p className='SHinput-tittle'>새 비밀번호 확인</p>
            <input
              {...register('checkPassword')}
              className='SHinput'
              type='password'
              placeholder='새 비밀번호 한번 더 입력'
            />
            <div
              className={`SHinput-bar ${errors.checkPassword ? 'red' : ''}`}
            ></div>
            <div className='SHinput-space space-28px'>
              {errors.checkPassword && (
                <p className='SHinput-error'>{errors.checkPassword.message}</p>
              )}
            </div>
          </div>

          <button
            className={`SHsubmit ${isDirty && isValid ? 'check' : ''}`}
            type='submit'
            disabled={!(isDirty && isValid)}
          >
            {' '}
            제출하기
          </button>
          <p className='SHinput-error errorMSG'>{errorMSG}</p>
        </form>
      </div>
      <NavBar></NavBar>
    </>
  );
}
