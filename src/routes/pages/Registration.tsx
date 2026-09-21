import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { FiCamera } from 'react-icons/fi';
import Header from '../../components/Header/Header';
import { Button } from '../../components/Button/Button';
import Input from '../../components/Input/Input';
import Radio from '../../components/Input/Radio';
import Select from '../../components/Input/Select';
import Textarea from '../../components/Input/Textarea';
import Location from '../../components/Input/Location';
import commonStyles from '../../components/Input/common.module.css';
import CancelIcon from '../../assets/icon/Cancel.svg?react';
import './share.css';
import styles from './Registration.module.css';

const RegistrationSchema = z.object({
  title: z.string().trim().min(1, '상품명을 입력해주세요.'),
  price: z.string().trim().min(1, '가격을 입력해주세요.'),
  date: z.string().trim().min(1, '대여 기간을 입력해주세요.'),
  category: z.string().trim().min(1, '카테고리를 선택해주세요.'),
  size: z.string().trim().min(1, '사이즈를 선택해주세요.'),
  sex: z.string().trim().min(1, '성별을 선택해주세요.'),
  description: z.string().trim().min(1, '상세 설명을 입력해주세요.'),
  place: z.string().trim().min(1, '거래 장소를 입력해주세요.'),
});

type RegistrationFormValues = z.infer<typeof RegistrationSchema>;

const CATEGORY_LABEL_TO_KEY: Record<string, string> = {
  상의: 'tops',
  하의: 'bottom',
  아우터: 'outher',
  원피스: 'onepiece',
  신발: 'shoes',
  가방: 'bag',
  악세사리: 'accessory',
};

const SEX_LABEL_TO_KEY: Record<string, string> = {
  남성: 'M',
  여성: 'W',
  공용: '공용',
};

export default function Registration() {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const backUrl = import.meta.env.VITE_BACK_URL;

  const [image, setImage] = useState<{ url: string; file: File } | null>(null);
  const [imageError, setImageError] = useState('');
  const [submitError, setSubmitError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isValid },
  } = useForm<RegistrationFormValues>({
    resolver: zodResolver(RegistrationSchema),
    defaultValues: {
      title: '',
      price: '',
      date: '',
      category: '',
      size: '',
      sex: '',
      description: '',
      place: '',
    },
    mode: 'onChange',
  });

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setImage({ url: URL.createObjectURL(file), file });
    setImageError('');
    e.target.value = '';
  };

  const removeImage = () => setImage(null);

  const onSubmit = async (values: RegistrationFormValues) => {
    if (!image) {
      setImageError('사진을 추가해주세요.');
      return;
    }
    setImageError('');

    const categoryKey = CATEGORY_LABEL_TO_KEY[values.category] ?? values.category;
    const sexKey = SEX_LABEL_TO_KEY[values.sex] ?? values.sex;

    const formData = new FormData();
    formData.append('title', values.title);
    formData.append('description', values.description);
    formData.append('price', values.price.replace(/,/g, ''));
    formData.append('date', values.date);
    formData.append('category', categoryKey);
    formData.append('size', values.size);
    formData.append('sex', sexKey);
    formData.append('place', values.place);
    formData.append('image', image.file);

    try {
      setSubmitting(true);
      setSubmitError('');

      const res = await fetch(`${backUrl}/board/create`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });

      if (!res.ok) throw new Error('등록에 실패했습니다.');

      const saved = await res.json();
      navigate(`/product/${saved.id}`);
    } catch (err) {
      setSubmitError((err as Error).message);
    } finally {
      setSubmitting(false);
    }
  };

  const priceValue = watch('price');
  const canSubmit = isValid && Boolean(image);

  return (
    <>
      <Header.Root hasNotch hasCamera>
        <Header.BackButton />
        <Header.CenterTitle title="상품 등록하기" />
      </Header.Root>

      <form id="registrationForm" onSubmit={handleSubmit(onSubmit)}>
        <div className="space-20px" />

        <div className={styles.photoSection}>
          <div className={styles.photoRow}>
            <label className={styles.addPhotoButton}>
              <FiCamera size={32} className={styles.addPhotoIcon} />
              <input type="file" accept="image/*" onChange={handleImageUpload} hidden />
            </label>

            {image && (
              <div className={styles.thumbnail}>
                <img src={image.url} alt="상품 이미지" />
                <button type="button" className={styles.removeButton} onClick={removeImage}>
                  <CancelIcon width={16} height={16} />
                </button>
              </div>
            )}
          </div>
          {imageError && <p className={commonStyles.inputErrorMessage}>{imageError}</p>}
        </div>

        <div className="space-20px" />
        <div className={styles.divider} />
        <div className="space-40px" />

        <div className="SHcontainer">
          <Input
            label="상품명"
            placeholder="상품명 입력"
            register={register('title')}
            error={errors.title}
          />

          <div className="space-28px" />

          <Input
            label="가격"
            placeholder="10,000 / 1day"
            value={priceValue}
            onChange={(e) => {
              const formatted = e.target.value
                .replace(/[^0-9]/g, '')
                .replace(/\B(?=(\d{3})+(?!\d))/g, ',');
              setValue('price', formatted, { shouldDirty: true, shouldValidate: true });
            }}
            error={errors.price}
          />

          <div className="space-28px" />

          <Input
            label="대여 기간"
            placeholder="대여 기간 선택"
            type="number"
            register={register('date')}
            error={errors.date}
          />

          <div className="space-28px" />

          <Select
            label="카테고리"
            placeholder="카테고리 선택"
            drawer="category"
            register={register('category')}
            error={errors.category}
          />

          <div className="space-28px" />

          <Select
            label="사이즈"
            placeholder="사이즈 선택"
            drawer="size"
            register={register('size')}
            error={errors.size}
          />

          <div className="space-28px" />

          <Radio
            label="성별"
            options={['남성', '여성', '공용']}
            register={register('sex')}
            error={errors.sex}
          />

          <div className="space-28px" />

          <Textarea
            label="상세 설명"
            placeholder="상세 설명 입력"
            rows={6}
            register={register('description')}
            error={errors.description}
          />

          <div className="space-28px" />

          <Location
            label="거래 장소"
            placeholder="거래 장소 입력"
            register={register('place')}
            map="detailedMap"
            error={errors.place}
          />

          <div className="space-40px" />

          {submitError && <p className="SHinput-error errorMSG">{submitError}</p>}

          <Button variant="primary" type="submit" disabled={!canSubmit || submitting}>
            {submitting ? '처리 중...' : '등록하기'}
          </Button>

          <div className="space-40px" />
        </div>
      </form>
    </>
  );
}
