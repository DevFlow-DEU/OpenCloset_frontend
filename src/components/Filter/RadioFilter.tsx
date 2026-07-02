import styles from './RadioFilter.module.css';

type RadioFilterType = 'chat' | 'owner' | 'renter' | 'category';

const OPTIONS: Record<RadioFilterType, string[]> = {
  chat: ['전체', '안읽음', '대여', '차용', '예약', '대여중', '반납완료'],
  owner: ['전체', '대여가능', '예약중', '대여중', '대여완료'],
  renter: ['전체', '대여중', '대여완료'],
  category: [
    '전체',
    '상의',
    '하의',
    '아우터',
    '원피스',
    '신발',
    '악세사리',
    '가방',
  ],
};

type Props = {
  type: RadioFilterType;
  value: string;
  onChange: (value: string) => void;
};

export default function RadioFilter({ type, value, onChange }: Props) {
  return (
    <div className={styles.bar}>
      {OPTIONS[type].map((opt) => (
        <button
          key={opt}
          type="button"
          className={`${styles.item}${value === opt ? ` ${styles.active}` : ''}`}
          onClick={() => onChange(opt)}
        >
          {opt}
        </button>
      ))}
    </div>
  );
}
