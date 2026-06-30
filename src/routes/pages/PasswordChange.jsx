import { useState } from 'react';
import Header from '../../components/Header/Header';
import { Button } from '../../components/Button/Button';
import Input from '../../components/Input/Input';
import Alert from '../../components/Alert/Alert';
import './share.css';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { pwChangeSchema } from './PWChangeSchema.ts';
import { useNavigate } from 'react-router-dom';

export default function PasswordChange() {
  const navigate = useNavigate();
  const backUrl = import.meta.env.VITE_BACK_URL;
  const [alertState, setAlertState] = useState(null);
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
        setAlertState({ type: 'success' });
      } else if (res.status === 400) {
        setErrorMSG(data?.message ?? '현재 비밀번호가 일치하지 않습니다.');
      } else if (res.status === 401) {
        setErrorMSG('인증이 만료되었습니다. 다시 로그인해주세요.');
      } else {
        setErrorMSG(data?.message ?? '비밀번호 변경에 실패했습니다.');
      }
    } catch (error) {
      setErrorMSG(error.message || '요청 중 오류가 발생했습니다.');
    }
  };

  return (
    <>
      <Header.Root hasNotch hasCamera>
        <Header.BackButton />
        <Header.CenterTitle title="비밀번호 변경" />
      </Header.Root>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className='SHcontainer'>
          <div className='space-40px' />
          <Input
            label="현재 비밀번호"
            type="password"
            placeholder="현재 비밀번호 입력"
            register={register('currentPassword')}
            error={errors.currentPassword}
          />
          <div className='space-40px' />
          <Input
            label="새 비밀번호"
            type="password"
            placeholder="새 비밀번호 입력"
            register={register('newPassword')}
            error={errors.newPassword}
          />
          <div className='space-28px' />
          <Input
            label="새 비밀번호 확인"
            type="password"
            placeholder="새 비밀번호 한번 더 입력"
            register={register('checkPassword')}
            error={errors.checkPassword}
          />
        </div>
        <div className='fixed-bottom'>
          <Button
            variant="primary"
            type="submit"
            disabled={!(isDirty && isValid)}
            style={{ marginTop: '12px' }}
          >
            변경하기
          </Button>
        </div>
      </form>

      {alertState?.type === 'success' && (
        <Alert
          icon="check"
          title="변경 완료"
          description="비밀번호가 변경되었습니다."
          buttons="confirm"
          onConfirm={() => navigate('/')}
        />
      )}

      {errorMSG && <p className='SHinput-error errorMSG'>{errorMSG}</p>}
    </>
  );
}
