import './share.css';
import Header from '../../components/Header/Header';
import Nickname from '../../components/Input/Nickname';
import Input from '../../components/Input/Input';
import Location from '../../components/Input/Location';
import { Button } from '../../components/Button/Button';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

type KakaoSignUpForm = {
  nickname: string;
  password: string;
  passwordConfirm: string;
  address: string;
};

export default function KakaoSignUp() {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors, isValid, isDirty },
  } = useForm<KakaoSignUpForm>({
    mode: 'onChange',
    defaultValues: { nickname: '', password: '', passwordConfirm: '', address: '' },
  });

  const onSubmit = async (data: KakaoSignUpForm) => {
    try {
      setLoading(true);
      setError('');

      const formData = new FormData();
      formData.append('nickname', data.nickname);
      formData.append('password', data.password);
      formData.append('address', data.address);

      const res = await fetch(`${import.meta.env.VITE_BACK_URL}/수정해야함`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });

      if (!res.ok) {
        let message = '가입 처리에 실패했습니다.';
        try {
          const errorData = await res.json();
          message = errorData.message || message;
        } catch { }
        throw new Error(message);
      }

      navigate('/');
    } catch (err) {
      setError((err as Error).message || '가입 처리에 실패했습니다.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Header.Root hasNotch hasCamera>
        <Header.CenterTitle title="회원가입" />
      </Header.Root>

      <div className="SHcontainer">
        <form id="kakao-signup-form" onSubmit={handleSubmit(onSubmit)}>
          <div className="space-40px" />
          <Nickname
            label="닉네임"
            placeholder="닉네임 입력"
            register={register('nickname', { required: '닉네임을 입력해주세요.' })}
            error={errors.nickname}
          />
          <div className="space-40px" />
          <Input
            label="비밀번호"
            placeholder="비밀번호 입력"
            type="password"
            register={register('password', {
              required: '비밀번호를 입력해주세요.',
              minLength: { value: 8, message: '비밀번호는 8자 이상이어야 합니다.' },
              pattern: {
                value: /^(?=.*[A-Za-z])(?=.*\d)/,
                message: '영문과 숫자를 포함해야 합니다.',
              },
            })}
            error={errors.password}
          />
          <div className="space-28px" />
          <Input
            label="비밀번호 확인"
            placeholder="비밀번호 입력"
            type="password"
            register={register('passwordConfirm', {
              required: '비밀번호 확인을 입력해주세요.',
              validate: (value) =>
                value === getValues('password') || '비밀번호가 일치하지 않습니다.',
            })}
            error={errors.passwordConfirm}
          />
          <div className="space-40px" />
          <Location
            label="주소"
            placeholder="현재 위치 찾기 버튼을 눌러주세요."
            register={register('address', { required: '주소를 등록해주세요.' })}
            map="map"
            error={errors.address}
          />
          {error && <p className="SHinput-error errorMSG">{error}</p>}
        </form>
      </div>

      <div className="button-space">
        <Button
          form="kakao-signup-form"
          type="submit"
          variant="primary"
          disabled={!(isDirty && isValid) || loading}
        >
          {loading ? '가입 중...' : '가입하기'}
        </Button>
      </div>
    </div>
  );
}
