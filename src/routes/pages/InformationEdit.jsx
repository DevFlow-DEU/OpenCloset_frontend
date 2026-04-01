import './share.css';
import './InformationEdit.css';
import NavBar from '../../components/NavBar';
import Header from '../../components/Header';
import { useNavigate, useLocation } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import { FaPen } from 'react-icons/fa';
import { updateMyProfile } from './informationEditSchema';

export default function InformationEdit() {
  const navigate = useNavigate();
  const location = useLocation();
  const token = localStorage.getItem('token');

  const [images, setImages] = useState(
    'https://opencloset.jihongeek.workers.dev/src/assets/Default_Profile.png'
  );
  const [imageFile, setImageFile] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      nickname: '',
      address: '',
    },
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_BACK_URL}/mypage/edit`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) {
          setError('회원 정보를 불러오지 못했습니다.');
          if (res.status === 401) {
            navigate('/login');
          }
          return;
        }

        const jsonData = await res.json();

        reset({
          nickname: jsonData.nickname ?? '',
          address: jsonData.address ?? '',
        });

        if (jsonData.profileImage) {
          setImages(jsonData.profileImage);
        }
      } catch (err) {
        setError(err.message || '서버 오류가 발생했습니다.');
      }
    };

    fetchData();
  }, [navigate, reset, token]);

  useEffect(() => {
    const savedAddress = sessionStorage.getItem('selectedAddress');

    if (savedAddress) {
      setValue('address', savedAddress, { shouldValidate: true });
      sessionStorage.removeItem('selectedAddress');
    }
  }, [location.key, setValue]);

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      setError('');

      await updateMyProfile({
        token,
        nickname: data.nickname,
        address: data.address,
        profileImage: imageFile,
      });

      alert('회원 정보가 수정되었습니다.');
      navigate('/mypage');
    } catch (err) {
      setError(err.message || '수정에 실패했습니다.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Header title="내 정보 수정" />

      <section className="SHcontainer">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="space-72px"></div>

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

          <div className="space-72px"></div>

          <article>
            <div>
              <p className="SHinput-tittle">닉네임</p>
              <input
                className="SHinput"
                type="text"
                placeholder="닉네임 입력"
                {...register('nickname', {
                  required: '닉네임을 입력해주세요.',
                  minLength: {
                    value: 2,
                    message: '닉네임은 2자 이상 입력해주세요.',
                  },
                })}
              />
              <div
                className={`SHinput-bar ${errors.nickname ? 'red' : ''}`}
              ></div>
              <div className="SHinput-space space-28px">
                {errors.nickname && (
                  <p className="SHinput-error">{errors.nickname.message}</p>
                )}
              </div>
            </div>

            <div>
              <label htmlFor="address" className="SHinput-tittle">
                주소
              </label>

              <input
                className="SHinput"
                type="text"
                id="address"
                placeholder="현재 위치 찾기 버튼을 눌러주세요."
                readOnly
                {...register('address', {
                  required: '주소를 입력해주세요.',
                })}
              />

              <div
                className={`SHinput-bar ${errors.address ? 'red' : ''}`}
              ></div>

              <div className="SHinput-space space-28px">
                {errors.address && (
                  <p className="SHinput-error">{errors.address.message}</p>
                )}
              </div>

              <button
                className="SHBTN"
                type="button"
                onClick={() => {
                  navigate('/get-location1');
                }}
              >
                현재 위치로 찾기
              </button>
            </div>
          </article>

          <div className="space-72px"></div>

          {error && <p className="SHinput-error errorMSG">{error}</p>}

          <button type="submit" className="SHsubmit" disabled={loading}>
            {loading ? '변경 중...' : '변경하기'}
          </button>
        </form>
      </section>

      <NavBar />
    </>
  );
}