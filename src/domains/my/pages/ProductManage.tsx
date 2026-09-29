import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../../components/Header/Header';
import RadioFilter from '../../../components/Filter/RadioFilter';
import ManageItem from '../../product/components/ManageItem';
import Alert from '../../../components/Alert/Alert';
import type { StateType } from '../../../components/State/State';
import { useOwnerBoards, useRenterBoards } from '../hooks';
import { ApiError } from '../../../api/http';
import styles from './ProductManage.module.css';

type Tab = 'owner' | 'renter';

export default function ProductManage() {
  const navigate = useNavigate();

  const [tab, setTab] = useState<Tab>('owner');
  const [ownerFilter, setOwnerFilter] = useState('전체');
  const [renterFilter, setRenterFilter] = useState('전체');
  const [showAuthAlert, setShowAuthAlert] = useState(false);

  const ownerQuery = useOwnerBoards();
  const renterQuery = useRenterBoards();

  const ownerItems = ownerQuery.data ?? [];
  const renterItems = renterQuery.data ?? [];

  useEffect(() => {
    const unauthorized =
      (ownerQuery.error instanceof ApiError &&
        ownerQuery.error.status === 401) ||
      (renterQuery.error instanceof ApiError &&
        renterQuery.error.status === 401);
    if (unauthorized) setShowAuthAlert(true);
  }, [ownerQuery.error, renterQuery.error]);

  const filterOwner = ownerItems.filter(
    (item) => ownerFilter === '전체' || item.status === ownerFilter
  );

  const filterRenter = renterItems.filter(
    (item) => renterFilter === '전체' || item.status === renterFilter
  );

  const currentItems = tab === 'owner' ? filterOwner : filterRenter;

  return (
    <>
      <Header.Root hasNotch hasCamera>
        <Header.BackButton />
        <Header.CenterTitle title="상품 관리" />
      </Header.Root>

      <div className={styles.page}>
        <div className={styles.tabBar}>
          <button
            className={`${styles.tab}${tab === 'owner' ? ` ${styles.active}` : ''}`}
            type="button"
            onClick={() => setTab('owner')}
          >
            Owner
          </button>
          <button
            className={`${styles.tab}${tab === 'renter' ? ` ${styles.active}` : ''}`}
            type="button"
            onClick={() => setTab('renter')}
          >
            Renter
          </button>
        </div>

        <RadioFilter
          type={tab}
          value={tab === 'owner' ? ownerFilter : renterFilter}
          onChange={tab === 'owner' ? setOwnerFilter : setRenterFilter}
        />

        <p className={styles.count}>상품 {currentItems.length}</p>

        <div className={styles.list}>
          {currentItems.map((item, index) => (
            <ManageItem
              key={item.id ?? index}
              image={item.images?.[0] ?? ''}
              name={item.title ?? ''}
              dateStart={item.startDate ?? ''}
              dateEnd={item.endDate ?? ''}
              price={item.price ?? 0}
              state={
                item.status && item.status !== '대여가능'
                  ? (item.status as StateType)
                  : undefined
              }
              onEdit={() => navigate(`/product/${item.id}/edit`)}
            />
          ))}
        </div>
      </div>

      {showAuthAlert && (
        <Alert
          icon="warning"
          title="인증 오류"
          description="유효하지 않은 토큰입니다. 다시 로그인해주세요."
          buttons="confirm"
          onConfirm={() => navigate('/login')}
        />
      )}
    </>
  );
}
