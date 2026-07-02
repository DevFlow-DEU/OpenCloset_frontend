import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import './share.css';
import Header from '../../components/Header';
import Input from '../../components/Input/Input';
import { Button } from '../../components/Button/Button';

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
  const [message, setMessage] = useState('');
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
        navigate('/login');
        reset();
        return;
      }

      setMessage(data?.message || `요청 실패 (${res.status})`);
    } catch (e) {
      setMessage('서버에 연결할 수 없습니다.');
      console.error('network error:', e);
    }
  };

  return (
    <div>
      <Header />
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
          {message && <p className='SHinput-error errorMSG'>{message}</p>}
        </form>
      </div>
    </div>
  );
}
