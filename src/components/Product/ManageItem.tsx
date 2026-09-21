import State, { type StateType } from '../State/State';
import styles from './ManageItem.module.css';

const DAYS = ['일', '월', '화', '수', '목', '금', '토'];

function formatDate(dateStr: string) {
  const d = new Date(dateStr);
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${month}.${day} (${DAYS[d.getDay()]})`;
}

type Props = {
  image: string;
  name: string;
  dateStart: string;
  dateEnd: string;
  price: number;
  state?: StateType;
  onClick?: () => void;
  onEdit?: () => void;
};

export default function ManageItem({
  image,
  name,
  dateStart,
  dateEnd,
  price,
  state,
  onClick,
  onEdit,
}: Props) {
  return (
    <div className={styles.item} onClick={onClick}>
      <img className={styles.image} src={image} alt="" />
      <div className={styles.content}>
        <div className={styles.info}>
          <div className={styles.nameRow}>
            <p className={styles.name}>{name}</p>
            <button
              className={styles.editButton}
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onEdit?.();
              }}
            >
              수정
            </button>
          </div>
          <p className={styles.period}>
            {formatDate(dateStart)} ~ {formatDate(dateEnd)}
          </p>
        </div>
        <div className={styles.priceRow}>
          <span className={styles.price}>{price.toLocaleString()}원</span>
          <span className={styles.perDay}>/ 1Day</span>
          {state && <State state={state} />}
        </div>
      </div>
    </div>
  );
}
