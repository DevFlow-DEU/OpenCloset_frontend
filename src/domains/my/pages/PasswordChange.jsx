import { useState } from 'react';
import Header from '../../../components/Header/Header';
import { Button } from '../../../components/Button/Button';
import Input from '../../../components/Input/Input';
import Alert from '../../../components/Alert/Alert';
import '../../../components/share.css';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { pwChangeSchema } from './PWChangeSchema.ts';
import { useNavigate } from 'react-router-dom';
import { useChangePassword } from '../hooks';
import { ApiError, getApiErrorMessage } from '../../../api/http';

export default function PasswordChange() {
  const navigate = useNavigate();
  const [alertState, setAlertState] = useState(null);
  const [errorMSG, setErrorMSG] = useState('');
  const changePassword = useChangePassword();
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

  const onSubmit = (values) => {
    const { currentPassword, newPassword } = values;
    changePassword.mutate(
      { currentPassword, newPassword },
      {
        onSuccess: () => {
          reset();
          setAlertState({ type: 'success' });
        },
        onError: (error) => {
          if (error instanceof ApiError && error.status === 401) {
            setErrorMSG('인증이 만료되었습니다. 다시 로그인해주세요.');
            return;
          }
          setErrorMSG(
            getApiErrorMessage(error, '비밀번호 변경에 실패했습니다.')
          );
        },
      }
    );
  };

  return (
    <>
      <Header.Root hasNotch hasCamera>
        <Header.BackButton />
        <Header.CenterTitle title="비밀번호 변경" />
      </Header.Root>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="SHcontainer">
          <div className="space-40px" />
          <Input
            label="현재 비밀번호"
            type="password"
            placeholder="현재 비밀번호 입력"
            register={register('currentPassword')}
            error={errors.currentPassword}
          />
          <div className="space-40px" />
          <Input
            label="새 비밀번호"
            type="password"
            placeholder="새 비밀번호 입력"
            register={register('newPassword')}
            error={errors.newPassword}
          />
          <div className="space-28px" />
          <Input
            label="새 비밀번호 확인"
            type="password"
            placeholder="새 비밀번호 한번 더 입력"
            register={register('checkPassword')}
            error={errors.checkPassword}
          />
        </div>
        <div className="fixed-bottom">
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

      {errorMSG && <p className="SHinput-error errorMSG">{errorMSG}</p>}
    </>
  );
}
