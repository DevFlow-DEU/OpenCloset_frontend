import type { DrawerProps } from './types';
import styles from './List.module.css';

export type ListType = 'category' | 'status';

const LIST_OPTIONS: Record<ListType, string[]> = {
  category: ['상의', '하의', '원피스', '아우터', '신발', '가방', '악세사리'],
  status: ['대여가능', '예약중', '대여중', '반납완료'],
};

type Props = DrawerProps & { type: ListType };

export default function List({ type, selected, onSelect, onClose }: Props) {
  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.container} onClick={(e) => e.stopPropagation()}>
        {LIST_OPTIONS[type].map((opt) => (
          <button
            key={opt}
            type="button"
            className={`${styles.item}${selected === opt ? ` ${styles.active}` : ''}`}
            onClick={() => onSelect(opt)}
          >
            {opt}
          </button>
        ))}
      </div>
    </div>
  );
}
