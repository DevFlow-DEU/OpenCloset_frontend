import './share.css';
import './InformationEdit.css';
import NavigationBar from '../../components/NavigationBar/NavigationBar';
import Header from '../../components/Header/Header';
import { Button } from '../../components/Button/Button';
import Input from '../../components/Input/Input';
import Location from '../../components/Input/Location';
import Alert from '../../components/Alert/Alert';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import { FaPen } from 'react-icons/fa';

type UpdateMyProfileParams = {
  token: string | null;
  nickname: string;
  address: string;
  profileImage: File | null;
};

async function updateMyProfile({ token, nickname, address, profileImage }: UpdateMyProfileParams) {
  const formData = new FormData();
  formData.append('nickname', nickname);
  formData.append('address', address);

  if (profileImage) {
    formData.append('profileImage', profileImage);
  }

  const res = await fetch(`${import.meta.env.VITE_BACK_URL}/mypage/edit`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}` },
    body: formData,
  });

  if (!res.ok) {
    let message = '회원 정보 수정에 실패했습니다.';
    try {
      const errorData = await res.json();
      if (res.status === 400) message = errorData.message ?? '이미 사용 중인 닉네임입니다.';
      else if (res.status === 401) message = '인증이 만료되었습니다. 다시 로그인해주세요.';
      else message = errorData.message || message;
    } catch { }
    throw new Error(message);
  }

  return res.json();
}

type FormValues = {
  nickname: string;
  address: string;
};

export default function InformationEdit() {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const [images, setImages] = useState(
    'https://opencloset.jihongeek.workers.dev/src/assets/Default_Profile.png'
  );
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: { nickname: '', address: '' },
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_BACK_URL}/mypage/profile`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) {
          setError('회원 정보를 불러오지 못했습니다.');
          if (res.status === 401) navigate('/login');
          return;
        }

        const jsonData = await res.json();
        reset({ nickname: jsonData.nickname ?? '', address: jsonData.address ?? '' });
        if (jsonData.profileImage) setImages(jsonData.profileImage);
      } catch (err) {
        setError((err as Error).message || '서버 오류가 발생했습니다.');
      }
    };

    fetchData();
  }, [navigate, reset, token]);

  const onSubmit = async (data: FormValues) => {
    try {
      setLoading(true);
      setError('');
      await updateMyProfile({ token, nickname: data.nickname, address: data.address, profileImage: imageFile });
      setShowSuccessAlert(true);
    } catch (err) {
      setError((err as Error).message || '수정에 실패했습니다.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Header.Root hasNotch hasCamera>
        <Header.BackButton />
        <Header.CenterTitle title="내 정보 수정" />
      </Header.Root>

      <section className="SHcontainer">
        <form id="informationEditForm" onSubmit={handleSubmit(onSubmit)}>
          <div className="space-72px" />

          <article className="my-img">
            <label className="profile-img-container" htmlFor="profile-file">
              <img src={images} className="profile-img" alt="프로필 이미지" />
              <input
                type="file"
                id="profile-file"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (!file) return;
                  setImageFile(file);
                  setImages(URL.createObjectURL(file));
                }}
              />
              <div className="profile-pen">
                <FaPen />
              </div>
            </label>
          </article>

          <div className="space-72px" />

          <Input
            label="닉네임"
            type="text"
            placeholder="닉네임 입력"
            register={register('nickname', {
              required: '닉네임을 입력해주세요.',
              minLength: { value: 2, message: '닉네임은 2자 이상 입력해주세요.' },
            })}
            error={errors.nickname}
          />

          <div className="space-40px" />

          <Location
            label="주소"
            placeholder="위치 입력 버튼을 눌러주세요."
            register={register('address', { required: '주소를 입력해주세요.' })}
            map="map"
            error={errors.address}
          />

          <div className="space-72px" />

          {error && <p className="SHinput-error errorMSG">{error}</p>}
        </form>
      </section>

      <div className="fixed-bottom">
        <Button
          variant="primary"
          type="submit"
          form="informationEditForm"
          disabled={loading}
          style={{ marginTop: '12px' }}
        >
          {loading ? '변경 중...' : '변경하기'}
        </Button>
      </div>

      {showSuccessAlert && (
        <Alert
          icon="check"
          title="수정 완료"
          description="회원 정보가 수정되었습니다."
          buttons="confirm"
          onConfirm={() => navigate('/mypage')}
        />
      )}
    </>
  );
}
