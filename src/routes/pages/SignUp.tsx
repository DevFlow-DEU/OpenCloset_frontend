import './share.css';
import styles from './SignUp.module.css';
import * as z from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import Header from '../../components/Header.tsx';
import { Button } from '../../components/Button/Button';
import { useNavigate } from 'react-router-dom';
import { client } from '../../api/client';
import { useMutation } from '@tanstack/react-query';
import type { components } from '../../api/api';
import Input from '../../components/Input/Input';
import Nickname from '../../components/Input/Nickname';
import Location from '../../components/Input/Location';
import Alert from '../../components/Alert/Alert';
import { useState } from 'react';

const SignUpSchema = z
  .object({
    nickname: z.string().min(1, '닉네임을 입력해주세요'),
    email: z
      .string()
      .min(1, '이메일을 입력해주세요')
      .email('올바른 이메일을 입력해주세요'),
    password: z
      .string()
      .min(8, '비밀번호는 8자 이상이어야 합니다.')
      .regex(/^(?=.*[A-Za-z])(?=.*\d)/, { message: '영문과 숫자를 포함해야 합니다.' }),
    passwordConfirm: z.string().min(1, '비밀번호 확인을 입력해주세요.'),
    address: z.string().min(1, '주소를 등록해주세요.'),
  })
  .refine(({ password, passwordConfirm }) => password === passwordConfirm, {
    message: '비밀번호가 일치하지 않습니다.',
    path: ['passwordConfirm'],
  });

type SignUpForm = z.infer<typeof SignUpSchema>;

export default function SignUp() {
  const {
    register,
    handleSubmit,
    getValues,
    setError,
    formState: { errors, isValid, isDirty },
  } = useForm<SignUpForm>({
    resolver: zodResolver(SignUpSchema),
    mode: 'onChange',
    defaultValues: { nickname: '', email: '', password: '', passwordConfirm: '', address: '' },
  });
  const navigate = useNavigate();
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const mutation = useMutation({
    mutationFn: (newUserInfo: components['schemas']['UserCreateRequestDto']) =>
      client.POST('/auth/register', { body: newUserInfo }),
    onError: (error) => {
      alert(`에러 발생\n\n${error}`);
    },
    onSuccess: async (data) => {
      if (data.response.status === 200) {
        setShowSuccessAlert(true);
      } else if (data.response.status === 400) {
        const errorBody = data.error as { message?: string };
        const message = errorBody?.message ?? '이미 사용 중인 이메일입니다.';
        if (message.includes('닉네임')) {
          setError('nickname', { type: 'manual', message });
        } else {
          setError('email', { type: 'manual', message });
        }
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
            const { password, email, nickname, address } = getValues();
            mutation.mutate({ email, password, nickname, address });
          })}
        >
          <div className='space-40px' />
          <Nickname
            label='닉네임'
            placeholder='닉네임 입력'
            register={register('nickname')}
            error={errors.nickname}
          />
          <div className='space-40px' />
          <Input
            label='이메일'
            placeholder='이메일'
            type='email'
            register={register('email')}
            error={errors.email}
          />
          <div className='space-28px' />
          <Input
            label='비밀번호'
            placeholder='비밀번호 입력'
            type='password'
            register={register('password')}
            error={errors.password}
          />
          <div className='space-28px' />
          <Input
            label='비밀번호 확인'
            placeholder='비밀번호 입력'
            type='password'
            register={register('passwordConfirm')}
            error={errors.passwordConfirm}
          />
          <div className='space-40px' />
          <Location
            label='주소'
            placeholder='현재 위치 찾기 버튼을 눌러주세요.'
            register={register('address')}
            map='map'
            error={errors.address}
          />
        </form>
      </main>
      <div className='button-space'>
        <Button
          form='signup-form'
          type='submit'
          variant='primary'
          disabled={!(isDirty && isValid)}
        >
          가입하기
        </Button>
      </div>

      {showSuccessAlert && (
        <Alert
          icon="check"
          title="가입완료"
          description="이제 다양한 옷을 둘러보고 원하는 스타일을 대여해보세요."
          buttons="confirm"
          onConfirm={() => navigate('/')}
        />
      )}

    </div>
  );
}
