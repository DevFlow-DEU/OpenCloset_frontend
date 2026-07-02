import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/Header/Header';
import RadioFilter from '../../components/Filter/RadioFilter';
import ManageItem from '../../components/Product/ManageItem';
import Alert from '../../components/Alert/Alert';
import type { StateType } from '../../components/State/State';
import styles from './ProductManage.module.css';

type Tab = 'owner' | 'renter';

type BoardItem = {
  id: number;
  title: string;
  images: string[];
  startDate: string;
  endDate: string;
  price: number;
  status: string;
};

export default function ProductManage() {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const backUrl = import.meta.env.VITE_BACK_URL;

  const [tab, setTab] = useState<Tab>('owner');
  const [ownerFilter, setOwnerFilter] = useState('전체');
  const [renterFilter, setRenterFilter] = useState('전체');
  const [ownerItems, setOwnerItems] = useState<BoardItem[]>([]);
  const [renterItems, setRenterItems] = useState<BoardItem[]>([]);
  const [showAuthAlert, setShowAuthAlert] = useState(false);

  useEffect(() => {
    const fetchList = async (path: string): Promise<BoardItem[]> => {
      const res = await fetch(`${backUrl}${path}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) {
        if (res.status === 401) setShowAuthAlert(true);
        return [];
      }
      const data = await res.json();
      return data.items ?? [];
    };

    const fetchItems = async () => {
      try {
        const [owner, renter] = await Promise.all([
          fetchList('/board/my/owner'),
          fetchList('/board/my/renter'),
        ]);
        setOwnerItems(owner);
        setRenterItems(renter);
      } catch { }
    };

    fetchItems();
  }, [backUrl, token]);

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
          {currentItems.map((item) => (
            <ManageItem
              key={item.id}
              image={item.images?.[0] ?? ''}
              name={item.title}
              dateStart={item.startDate}
              dateEnd={item.endDate}
              price={item.price}
              state={item.status === '대여가능' ? undefined : (item.status as StateType)}
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
