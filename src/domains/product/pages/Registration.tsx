import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
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
import {
  fetchKakaoAddressByCoords,
  loadKakaoMapSdk,
} from '../../../components/Map/kakao';
import { useCreateBoard, useProductDetail, useUpdateBoard } from '../hooks';
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
  원피스: 'onepiece',
  아우터: 'outer',
  신발: 'shoes',
  가방: 'bag',
  악세사리: 'jewelry',
};

const CATEGORY_KEY_TO_LABEL: Record<string, string> = Object.fromEntries(
  Object.entries(CATEGORY_LABEL_TO_KEY).map(([label, key]) => [key, label])
);

const SEX_LABEL_TO_KEY: Record<string, string> = {
  남성: 'M',
  여성: 'W',
  공용: '공용',
};

const SEX_KEY_TO_LABEL: Record<string, string> = Object.fromEntries(
  Object.entries(SEX_LABEL_TO_KEY).map(([label, key]) => [key, label])
);

type ImageItem = {
  id: string;
  url: string;
  file?: File;
};

export default function Registration() {
  const { id } = useParams();
  const isEdit = Boolean(id);
  const navigate = useNavigate();

  const { data: existing } = useProductDetail(id ?? '', isEdit);
  const createBoard = useCreateBoard();
  const updateBoard = useUpdateBoard(id ?? '');

  const [images, setImages] = useState<ImageItem[]>([]);
  const [imageError, setImageError] = useState('');
  const [dateRange, setDateRange] = useState<DateRangeValue | undefined>();
  const [dateError, setDateError] = useState('');
  const [prefill, setPrefill] = useState<{
    category: string;
    size: string;
    sex: string;
    place: string;
  } | null>(null);

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

  useEffect(() => {
    if (!existing) return;

    const categoryLabel = CATEGORY_KEY_TO_LABEL[existing.category ?? ''] ?? '';
    const sexLabel = SEX_KEY_TO_LABEL[existing.sex ?? ''] ?? '';

    setValue('title', existing.title ?? '');
    setValue(
      'price',
      String(existing.price ?? '').replace(/\B(?=(\d{3})+(?!\d))/g, ',')
    );
    setValue('category', categoryLabel);
    setValue('size', existing.size ?? '');
    setValue('sex', sexLabel);
    setValue('description', existing.description ?? '');

    setPrefill({
      category: categoryLabel,
      size: existing.size ?? '',
      sex: sexLabel,
      place: '',
    });

    if (existing.startDate && existing.endDate) {
      setDateRange({
        from: new Date(existing.startDate),
        to: new Date(existing.endDate),
      });
    }

    if (existing.images?.length) {
      setImages(
        existing.images.map((url, index) => ({
          id: `existing-${index}`,
          url,
        }))
      );
    }

    const { latitude, longitude } = existing;
    if (latitude != null && longitude != null) {
      setValue('coord', `${latitude},${longitude}`);

      (async () => {
        try {
          await loadKakaoMapSdk();
          const address = await fetchKakaoAddressByCoords(latitude, longitude);
          const text = address ?? '주소를 확인할 수 없습니다.';
          setValue('place', text);
          setPrefill((prev) => (prev ? { ...prev, place: text } : prev));
        } catch {
          setValue('place', '주소를 확인할 수 없습니다.');
        }
      })();
    }
  }, [existing, setValue]);

  const addFiles = (files: File[]) => {
    const newItems = files.map((file) => ({
      id: `${Date.now()}-${Math.random()}`,
      url: URL.createObjectURL(file),
      file,
    }));
    setImages((prev) => {
      const hasOnlyExisting = prev.length > 0 && prev.every((img) => !img.file);
      return hasOnlyExisting ? newItems : [...prev, ...newItems];
    });
    setImageError('');
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    addFiles(Array.from(e.target.files));
    e.target.value = '';
  };

  const removeImage = (imageId: string) => {
    setImages((prev) => prev.filter((item) => item.id !== imageId));
  };

  const onSubmit = (values: RegistrationFormValues) => {
    const newFiles = images
      .filter((img): img is ImageItem & { file: File } => Boolean(img.file))
      .map((img) => img.file);

    if (!isEdit && newFiles.length === 0) {
      setImageError('사진을 추가해주세요.');
      return;
    }
    if (!dateRange?.from || !dateRange?.to) {
      setDateError('대여 기간을 선택해주세요.');
      return;
    }
    setImageError('');
    setDateError('');

    const categoryKey = CATEGORY_LABEL_TO_KEY[values.category] ?? values.category;
    const sexKey = SEX_LABEL_TO_KEY[values.sex] ?? values.sex;
    const [latitude, longitude] = values.coord.split(',').map(Number);

    const basePayload = {
      title: values.title,
      description: values.description,
      size: values.size,
      sex: sexKey,
      latitude,
      longitude,
      price: Number(values.price.replace(/,/g, '')),
      startDate: format(dateRange.from, 'yyyy-MM-dd'),
      endDate: format(dateRange.to, 'yyyy-MM-dd'),
      category: categoryKey,
    };

    if (isEdit) {
      updateBoard.mutate(
        { ...basePayload, ...(newFiles.length ? { images: newFiles } : {}) },
        { onSuccess: () => navigate(`/product/${id}`) }
      );
    } else {
      createBoard.mutate(
        { ...basePayload, images: newFiles },
        {
          onSuccess: (saved) =>
            navigate(saved?.id != null ? `/product/${saved.id}` : '/'),
        }
      );
    }
  };

  const priceValue = watch('price');
  const submitting = isEdit ? updateBoard.isPending : createBoard.isPending;
  const submitError = isEdit
    ? updateBoard.isError
      ? getApiErrorMessage(updateBoard.error, '수정에 실패했습니다.')
      : ''
    : createBoard.isError
      ? getApiErrorMessage(createBoard.error, '등록에 실패했습니다.')
      : '';
  const canSubmit =
    isValid &&
    Boolean(dateRange?.from && dateRange?.to) &&
    (isEdit || images.length > 0);

  return (
    <>
      <Header.Root hasNotch hasCamera>
        <Header.BackButton />
        <Header.CenterTitle title={isEdit ? '게시물 수정' : '상품 등록하기'} />
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
                {item.file && (
                  <button
                    type="button"
                    className={styles.removeButton}
                    onClick={() => removeImage(item.id)}
                  >
                    <CancelIcon width={16} height={16} />
                  </button>
                )}
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
            value={prefill?.category}
          />

          <div className="space-28px" />

          <Select
            label="사이즈"
            placeholder="사이즈 선택"
            drawer="size"
            register={register('size')}
            error={errors.size}
            value={prefill?.size}
          />

          <div className="space-28px" />

          <Radio
            label="성별"
            options={['남성', '여성', '공용']}
            register={register('sex')}
            error={errors.sex}
            value={prefill?.sex}
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
            value={prefill?.place}
          />

          <div className="space-40px" />

          {submitError && <p className="SHinput-error errorMSG">{submitError}</p>}

          <Button
            variant="primary"
            type="submit"
            disabled={!canSubmit || submitting}
          >
            {submitting ? '처리 중...' : isEdit ? '수정하기' : '등록하기'}
          </Button>

          <div className="space-40px" />
        </div>
      </form>
    </>
  );
}
