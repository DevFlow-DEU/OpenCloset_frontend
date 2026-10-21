import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { format } from 'date-fns';
import type { DateRange as DateRangeValue } from 'react-day-picker';
import { FiCamera } from 'react-icons/fi';
import Header from '../../../components/Header/Header';
import { Button } from '../../../components/Button/Button';
import Input from '../../../components/Input/Input';
import Radio from '../../../components/Input/Radio';
import Select from '../../../components/Input/Select';
import Textarea from '../../../components/Input/Textarea';
import Location from '../../../components/Input/Location';
import DateRangeInput from '../../../components/Input/DateRange';
import commonStyles from '../../../components/Input/common.module.css';
import CancelIcon from '../../../assets/icon/Cancel.svg?react';
import { useCreateBoard } from '../hooks';
import { getApiErrorMessage } from '../../../api/http';
import '../../../components/share.css';
import styles from './Registration.module.css';

const RegistrationSchema = z.object({
  title: z.string().trim().min(1, '상품명을 입력해주세요.'),
  price: z.string().trim().min(1, '가격을 입력해주세요.'),
  category: z.string().trim().min(1, '카테고리를 선택해주세요.'),
  size: z.string().trim().min(1, '사이즈를 선택해주세요.'),
  sex: z.string().trim().min(1, '성별을 선택해주세요.'),
  description: z.string().trim().min(1, '상세 설명을 입력해주세요.'),
  place: z.string().trim().min(1, '거래 장소를 입력해주세요.'),
  coord: z.string().trim().min(1, '거래 장소를 입력해주세요.'),
});

type RegistrationFormValues = z.infer<typeof RegistrationSchema>;

const CATEGORY_LABEL_TO_KEY: Record<string, string> = {
  상의: 'top',
  하의: 'bottom',
  아우터: 'outer',
  원피스: 'onepiece',
  신발: 'shoes',
  가방: 'bag',
  악세사리: 'jewelry',
};

const SEX_LABEL_TO_KEY: Record<string, string> = {
  남성: 'M',
  여성: 'W',
  공용: '공용',
};

type ImageItem = {
  id: string;
  url: string;
  file: File;
};

export default function Registration() {
  const navigate = useNavigate();
  const createBoard = useCreateBoard();

  const [images, setImages] = useState<ImageItem[]>([]);
  const [imageError, setImageError] = useState('');
  const [dateRange, setDateRange] = useState<DateRangeValue | undefined>();
  const [dateError, setDateError] = useState('');

  const submitting = createBoard.isPending;
  const submitError = createBoard.isError
    ? getApiErrorMessage(createBoard.error, '등록에 실패했습니다.')
    : '';

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
      category: '',
      size: '',
      sex: '',
      description: '',
      place: '',
      coord: '',
    },
    mode: 'onChange',
  });

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const newItems = Array.from(e.target.files).map((file) => ({
      id: `${Date.now()}-${Math.random()}`,
      url: URL.createObjectURL(file),
      file,
    }));
    setImages((prev) => [...prev, ...newItems]);
    setImageError('');
    e.target.value = '';
  };

  const removeImage = (id: string) => {
    setImages((prev) => prev.filter((item) => item.id !== id));
  };

  const onSubmit = (values: RegistrationFormValues) => {
    if (images.length === 0) {
      setImageError('사진을 추가해주세요.');
      return;
    }
    if (!dateRange?.from || !dateRange?.to) {
      setDateError('대여 기간을 선택해주세요.');
      return;
    }
    setImageError('');
    setDateError('');

    const [latitude, longitude] = values.coord.split(',').map(Number);

    createBoard.mutate(
      {
        title: values.title,
        description: values.description,
        images: images.map((item) => item.file),
        category: CATEGORY_LABEL_TO_KEY[values.category] ?? values.category,
        size: values.size,
        sex: SEX_LABEL_TO_KEY[values.sex] ?? values.sex,
        latitude,
        longitude,
        detailAddress: values.place,
        price: Number(values.price.replace(/,/g, '')),
        startDate: format(dateRange.from, 'yyyy-MM-dd'),
        endDate: format(dateRange.to, 'yyyy-MM-dd'),
      },
      {
        onSuccess: (saved) => {
          navigate(saved?.id != null ? `/product/${saved.id}` : '/');
        },
      }
    );
  };

  const priceValue = watch('price');
  const canSubmit =
    isValid && images.length > 0 && Boolean(dateRange?.from && dateRange?.to);

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
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={handleImageUpload}
                hidden
              />
            </label>

            {images.map((item) => (
              <div className={styles.thumbnail} key={item.id}>
                <img src={item.url} alt="상품 이미지" />
                <button
                  type="button"
                  className={styles.removeButton}
                  onClick={() => removeImage(item.id)}
                >
                  <CancelIcon width={16} height={16} />
                </button>
              </div>
            ))}
          </div>
          {imageError && (
            <p className={commonStyles.inputErrorMessage}>{imageError}</p>
          )}
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
              setValue('price', formatted, {
                shouldDirty: true,
                shouldValidate: true,
              });
            }}
            error={errors.price}
          />

          <div className="space-28px" />

          <DateRangeInput
            label="대여 기간"
            placeholder="대여 기간 선택"
            value={dateRange}
            onChange={(range) => {
              setDateRange(range);
              setDateError('');
            }}
            error={dateError}
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
            coordRegister={register('coord')}
            map="detailedMap"
            error={errors.place}
          />

          <div className="space-40px" />

          {submitError && (
            <p className="SHinput-error errorMSG">{submitError}</p>
          )}

          <Button
            variant="primary"
            type="submit"
            disabled={!canSubmit || submitting}
          >
            {submitting ? '처리 중...' : '등록하기'}
          </Button>

          <div className="space-40px" />
        </div>
      </form>
    </>
  );
}
