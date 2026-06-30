import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import './share.css';
import Header from '../../components/Header/Header';
import Input from '../../components/Input/Input';
import { Button } from '../../components/Button/Button';
import Alert from '../../components/Alert/Alert';

const findSchema = z.object({
  email: z
    .string()
    .trim()
    .min(1, '이메일을 입력해주세요.')
    .email('이메일 형식이 아닙니다.'),
});

type FindForm = z.infer<typeof findSchema>;

export default function PasswordFind() {
  const navigate = useNavigate();
  const [showSentAlert, setShowSentAlert] = useState(false);
  const [showNotFoundAlert, setShowNotFoundAlert] = useState(false);
  const [errorAlertMessage, setErrorAlertMessage] = useState('');
  const backUrl = import.meta.env.VITE_BACK_URL;

  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isDirty },
    reset,
  } = useForm<FindForm>({
    resolver: zodResolver(findSchema),
    defaultValues: { email: '' },
    mode: 'onChange',
  });

  const onSubmit = async (values: FindForm) => {
    try {
      const res = await fetch(`${backUrl}/auth/password-reset`, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(values),
      });

      const data = await res.json().catch(() => null);

      if (res.ok) {
        setShowSentAlert(true);
        reset();
        return;
      }

      if (res.status === 400) {
        setShowNotFoundAlert(true);
        return;
      }

      setErrorAlertMessage(data?.message || `요청 실패 (${res.status})`);
    } catch (e) {
      setErrorAlertMessage('서버에 연결할 수 없습니다.');
      console.error('network error:', e);
    }
  };

  return (
    <div>
      <Header.Root hasNotch hasCamera>
        <Header.BackButton />
        <Header.CenterTitle title="비밀번호 찾기" />
      </Header.Root>
      <div className='SHcontainer'>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className='space-40px' />
          <Input
            label='이메일'
            placeholder='이메일 형식 입력'
            register={register('email')}
            error={errors.email}
          />
          <div className='button-space'>
            <Button
              variant='primary'
              type='submit'
              disabled={!(isDirty && isValid)}
            >
              변경하기
            </Button>
          </div>
        </form>
      </div>

      {showSentAlert && (
        <Alert
          icon="check"
          title="발송 완료"
          description={<>입력한 이메일로 임시 비밀번호가 발송되었습니다.<br />메일함에서 임시 비밀번호를 확인해 주세요.</>}
          buttons="confirm"
          onConfirm={() => navigate('/login')}
        />
      )}

      {showNotFoundAlert && (
        <Alert
          icon="warning"
          title="가입된 계정을 찾을 수 없어요"
          description={<>입력한 이메일로 가입된 오픈 클로젯 계정이 없습니다.<br />이메일 주소를 다시 확인해 주세요.</>}
          buttons="confirm"
          onConfirm={() => setShowNotFoundAlert(false)}
        />
      )}

      {errorAlertMessage && (
        <Alert
          icon="warning"
          title="오류"
          description={errorAlertMessage}
          buttons="confirm"
          onConfirm={() => setErrorAlertMessage('')}
        />
      )}
    </div>
  );
}
