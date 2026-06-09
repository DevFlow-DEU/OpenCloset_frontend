import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import Input from '../../components/Input/Input'
import Nickname from '../../components/Input/Nickname'
import Location from '../../components/Input/Location'
import Radio from '../../components/Input/Radio'
import Select from '../../components/Input/Select'
import Textarea from '../../components/Input/Textarea'
import { type FilterValue } from '../../components/Drawer/Filter'
import SearchFilter from '../../components/Filter/SearchFilter'
import RadioFilter from '../../components/Filter/RadioFilter'
import ChatItem from '../../components/Chat/ChatItem'
import ChatState from '../../components/Chat/ChatState'
import ManageItem from '../../components/Product/ManageItem'
import { type StateType } from '../../components/State/State'
import Alert from '../../components/Alert/Alert'
import DateRange from '../../components/Input/DateRange'
import { type DateRange as DateRangeType } from 'react-day-picker'

const MANAGE_ITEMS: {
  id: number;
  image: string;
  name: string;
  dateStart: string;
  dateEnd: string;
  price: number;
  state: StateType;
}[] = [
  {
    id: 1,
    image: 'https://picsum.photos/seed/p1/100',
    name: 'MH GRAPHIC SHORT SLEEVE_32YA6B50',
    dateStart: '2024-12-23',
    dateEnd: '2024-12-31',
    price: 3200,
    state: '대여중',
  },
  {
    id: 2,
    image: 'https://picsum.photos/seed/p2/100',
    name: '나이키 에어맥스 270',
    dateStart: '2025-01-05',
    dateEnd: '2025-01-10',
    price: 5000,
    state: '예약중',
  },
  {
    id: 3,
    image: 'https://picsum.photos/seed/p3/100',
    name: '빈폴 체크 울 코트 겨울 시즌 한정판',
    dateStart: '2024-12-01',
    dateEnd: '2024-12-15',
    price: 8000,
    state: '대여완료',
  },
];

const CHAT_ITEMS = [
  {
    id: 1,
    itemImage: 'https://picsum.photos/seed/a/56',
    userImage: 'https://picsum.photos/seed/u1/40',
    name: '김민준',
    message: '내일 오후 2시에 거래 가능하신가요?',
    time: '오후 2:30',
    unread: 3,
  },
  {
    id: 2,
    itemImage: 'https://picsum.photos/seed/b/56',
    userImage: 'https://picsum.photos/seed/u2/40',
    name: '이서연',
    message: '네 감사합니다!',
    time: '오전 11:15',
    unread: 0,
  },
  {
    id: 3,
    itemImage: 'https://picsum.photos/seed/c/56',
    userImage: 'https://picsum.photos/seed/u3/40',
    name: '박도윤',
    message: '혹시 사이즈 조절 가능한가요?',
    time: '어제',
    unread: 12,
  },
  {
    id: 4,
    itemImage: 'https://picsum.photos/seed/d/56',
    userImage: 'https://picsum.photos/seed/u4/40',
    name: '최지아',
    message: '확인했습니다 ㅎㅎ',
    time: '월요일',
    unread: 1,
  },
  {
    id: 5,
    itemImage: 'https://picsum.photos/seed/e/56',
    userImage: 'https://picsum.photos/seed/u5/40',
    name: '정하은',
    message: '대여 기간 연장 부탁드려도 될까요?',
    time: '5/20',
    unread: 0,
  },
];

const EMPTY_FILTER: FilterValue = {
  gender: '',
  priceMin: '',
  priceMax: '',
  category: '',
  sizes: [],
  dateStart: '',
  dateEnd: '',
};

const schema = z.object({
  name: z.string().min(1, '빈칸을 채워 주세요'),
  nickname: z.string().min(1, '빈칸을 채워 주세요'),
  location: z.string().min(1, '빈칸을 채워 주세요'),
  coord: z.string().optional(),
  gender: z.string().min(1, '빈칸을 채워 주세요'),
  size: z.string().min(1, '빈칸을 채워 주세요'),
  description: z.string().min(1, '빈칸을 채워 주세요'),
});

type FormData = z.infer<typeof schema>;

export default function Test() {
    const navigate = useNavigate()
    const [alertType, setAlertType] = useState<'check' | 'warning' | null>(null)
    const [dateRange, setDateRange] = useState<DateRangeType | undefined>(undefined)
    const [filter, setFilter] = useState<FilterValue>(EMPTY_FILTER)
    const [chatStatus, setChatStatus] = useState("전체")
    const [ownerStatus, setOwnerStatus] = useState("전체")
    const [renterStatus, setRenterStatus] = useState("대여중")
    const [category, setCategory] = useState("전체")
    const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
        resolver: zodResolver(schema),
    })

    const onSubmit = (data: FormData) => {
        const message = [
            `이름: ${data.name}`,
            `닉네임: ${data.nickname}`,
            `거래 장소: ${data.location}`,
            `좌표: ${data.coord ?? '없음'}`,
            `성별: ${data.gender}`,
            `사이즈: ${data.size}`,
            `상세 설명: ${data.description}`,
        ].join('\n')
        alert(message)
    }

    return (
        <>
            {alertType && (
                <Alert
                    icon={alertType}
                    title={alertType === 'check' ? '완료되었습니다' : '정말 탈퇴하시겠어요?'}
                    description={alertType === 'check' ? '정상적으로 처리되었습니다.' : '탈퇴 시 모든 정보가 삭제됩니다.'}
                    buttons={alertType === 'check' ? 'confirm' : 'delete'}
                    onConfirm={() => setAlertType(null)}
                    onCancel={() => setAlertType(null)}
                />
            )}
            <div style={{ display: 'flex', gap: '8px', padding: '16px' }}>
                <button type="button" onClick={() => setAlertType('check')}>체크 얼랏</button>
                <button type="button" onClick={() => setAlertType('warning')}>경고 얼랏</button>
            </div>
            <ChatState
                image="https://picsum.photos/seed/cs1/48"
                name="프린트 링거 티셔츠"
                price={3200}
                status="대여중"
                onClick={() => navigate('/product/1')}
                onStatusChange={s => alert(`상태 변경: ${s}`)}
            />
            <ChatState
                image="https://picsum.photos/seed/cs2/48"
                name="나이키 에어맥스 270"
                price={5000}
                onClick={() => navigate('/product/2')}
                onStatusChange={s => alert(`상태 변경: ${s}`)}
            />
            <div>
                {MANAGE_ITEMS.map(item => (
                    <ManageItem key={item.id} {...item} onClick={() => navigate(`/product/${item.id}`)} onEdit={() => alert('수정')} />
                ))}
            </div>
            <div>
                {CHAT_ITEMS.map(item => (
                    <ChatItem key={item.id} {...item} onClick={() => navigate('/')} className="cursor-pointer" />
                ))}
            </div>
            <SearchFilter value={filter} onChange={setFilter} />
            <RadioFilter type="chat" value={chatStatus} onChange={setChatStatus} />
            <RadioFilter type="owner" value={ownerStatus} onChange={setOwnerStatus} />
            <RadioFilter type="renter" value={renterStatus} onChange={setRenterStatus} />
            <RadioFilter type="category" value={category} onChange={setCategory} />
            <form onSubmit={handleSubmit(onSubmit)} style={{ display: 'flex', flexDirection: 'column', gap: '24px', padding: '24px' }}>

  const onSubmit = (data: FormData) => {
    const message = [
      `이름: ${data.name}`,
      `닉네임: ${data.nickname}`,
      `거래 장소: ${data.location}`,
      `좌표: ${data.coord ?? '없음'}`,
      `성별: ${data.gender}`,
      `사이즈: ${data.size}`,
      `상세 설명: ${data.description}`,
    ].join('\n');
    alert(message);
  };

  return (
    <>
      {alertType && (
        <Alert
          icon={alertType}
          title={
            alertType === 'check' ? '완료되었습니다' : '정말 탈퇴하시겠어요?'
          }
          description={
            alertType === 'check'
              ? '정상적으로 처리되었습니다.'
              : '탈퇴 시 모든 정보가 삭제됩니다.'
          }
          buttons={alertType === 'check' ? 'confirm' : 'delete'}
          onConfirm={() => setAlertType(null)}
          onCancel={() => setAlertType(null)}
        />
      )}
      <div style={{ display: 'flex', gap: '8px', padding: '16px' }}>
        <button type="button" onClick={() => setAlertType('check')}>
          체크 얼랏
        </button>
        <button type="button" onClick={() => setAlertType('warning')}>
          경고 얼랏
        </button>
      </div>
      <div>
        {MANAGE_ITEMS.map((item) => (
          <ManageItem
            key={item.id}
            {...item}
            onClick={() => navigate(`/product/${item.id}`)}
            onEdit={() => alert('수정')}
          />
        ))}
      </div>
      <div>
        {CHAT_ITEMS.map((item) => (
          <ChatItem
            key={item.id}
            {...item}
            onClick={() => navigate('/')}
            className="cursor-pointer"
          />
        ))}
      </div>
      <SearchFilter value={filter} onChange={setFilter} />
      <RadioFilter type="chat" value={chatStatus} onChange={setChatStatus} />
      <RadioFilter type="owner" value={ownerStatus} onChange={setOwnerStatus} />
      <RadioFilter
        type="renter"
        value={renterStatus}
        onChange={setRenterStatus}
      />
      <RadioFilter type="category" value={category} onChange={setCategory} />
      <form
        onSubmit={handleSubmit(onSubmit)}
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '24px',
          padding: '24px',
        }}
      >
        <Input
          label="이름"
          placeholder="이름을 입력하세요"
          register={register('name')}
          error={errors.name}
        />

        <Nickname
          label="닉네임"
          placeholder="닉네임을 입력하세요"
          register={register('nickname')}
          error={errors.nickname}
        />

        <Location
          label="거래 장소"
          placeholder="위치를 선택하세요"
          register={register('location')}
          coordRegister={register('coord')}
          error={errors.location}
          map="detailedMap"
        />

        <Location
          label="거래 장소"
          placeholder="위치를 선택하세요"
          register={register('location')}
          coordRegister={register('coord')}
          error={errors.location}
          map="map"
        />

        <Radio
          label="성별"
          options={['남성', '여성', '공용']}
          register={register('gender')}
          error={errors.gender}
        />

        <Select
          label="사이즈"
          placeholder="사이즈를 선택하세요"
          register={register('size')}
          error={errors.size}
          drawer="size"
        />

                <DateRange
                    label="대여 기간"
                    value={dateRange}
                    onChange={setDateRange}
                />

                <Textarea
                    label="상세 설명"
                    placeholder="상세 설명을 입력하세요"
                    rows={4}
                    register={register("description")}
                    error={errors.description}
                />

        <button type="submit">전송하기</button>
      </form>
    </>
  );
}
