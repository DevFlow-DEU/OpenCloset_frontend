import { useMemo } from 'react';
import { getApiErrorMessage } from '../../../api/http';
import { useWearerList } from '../hooks';
import defaultProfileImage from '../../../assets/Default_Profile.png';
import styles from './WearerPicker.module.css';

interface Props {
  boardId: string | number;
  /** 현재 채팅방 문의자의 wearerId. 목록 맨 위로 정렬하고 강조한다. */
  currentWearerId?: number;
  confirming: boolean;
  confirmError: string | null;
  onPick: (wearerId: number) => void;
  onClose: () => void;
}

export default function WearerPicker({
  boardId,
  currentWearerId,
  confirming,
  confirmError,
  onPick,
  onClose,
}: Props) {
  const {
    data: wearers = [],
    isPending,
    isError,
    error,
  } = useWearerList(boardId);

  const ordered = useMemo(
    () =>
      [...wearers].sort(
        (a, b) =>
          Number(b.wearerId === currentWearerId) -
          Number(a.wearerId === currentWearerId)
      ),
    [wearers, currentWearerId]
  );

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div
        className={styles.container}
        onClick={(event) => event.stopPropagation()}
      >
        <p className={styles.title}>거래 확정할 문의자 선택</p>

        {isPending && (
          <p className={styles.placeholder}>문의자 목록을 불러오는 중…</p>
        )}
        {isError && (
          <p className={styles.placeholder}>
            {getApiErrorMessage(error, '문의자 목록을 불러오지 못했습니다.')}
          </p>
        )}
        {!isPending && !isError && ordered.length === 0 && (
          <p className={styles.placeholder}>아직 문의자가 없어요.</p>
        )}

        {ordered.map((wearer) =>
          wearer.wearerId === undefined ? null : (
            <button
              key={wearer.wearerId}
              type="button"
              className={styles.row}
              disabled={confirming}
              onClick={() => onPick(wearer.wearerId as number)}
            >
              <img
                className={styles.avatar}
                src={wearer.wearerProfileImage || defaultProfileImage}
                alt=""
              />
              <span className={styles.nickname}>
                {wearer.wearerNickname ?? ''}
              </span>
              {wearer.wearerId === currentWearerId && (
                <span className={styles.badge}>이 채팅방</span>
              )}
            </button>
          )
        )}

        {confirming && <p className={styles.placeholder}>확정 중…</p>}
        {confirmError && <p className={styles.error}>{confirmError}</p>}
      </div>
    </div>
  );
}
