import '../../../components/share.css';
import Header from '../../../components/Header/Header';
import Nickname from '../../../components/Input/Nickname';
import Input from '../../../components/Input/Input';
import Location from '../../../components/Input/Location';
import { Button } from '../../../components/Button/Button';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useKakaoSignUp } from '../hooks';
import { getApiErrorMessage } from '../../../api/http';

type KakaoSignUpForm = {
  nickname: string;
  password: string;
  passwordConfirm: string;
  address: string;
};

export default function KakaoSignUp() {
  const navigate = useNavigate();
  const mutation = useKakaoSignUp();

  const loading = mutation.isPending;
  const error = mutation.isError
    ? getApiErrorMessage(mutation.error, '가입 처리에 실패했습니다.')
    : '';

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors, isValid, isDirty },
  } = useForm<KakaoSignUpForm>({
    mode: 'onChange',
    defaultValues: {
      nickname: '',
      password: '',
      passwordConfirm: '',
      address: '',
    },
  });

  const onSubmit = (data: KakaoSignUpForm) => {
    mutation.mutate(
      {
        nickname: data.nickname,
        password: data.password,
        address: data.address,
      },
      {
        onSuccess: () => navigate('/'),
      }
    );
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
            register={register('nickname', {
              required: '닉네임을 입력해주세요.',
            })}
            error={errors.nickname}
          />
          <div className="space-40px" />
          <Input
            label="비밀번호"
            placeholder="비밀번호 입력"
            type="password"
            register={register('password', {
              required: '비밀번호를 입력해주세요.',
              minLength: {
                value: 8,
                message: '비밀번호는 8자 이상이어야 합니다.',
              },
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
                value === getValues('password') ||
                '비밀번호가 일치하지 않습니다.',
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
