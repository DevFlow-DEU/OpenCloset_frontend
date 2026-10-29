import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowUpDown } from 'lucide-react';
import NavigationBar from '../../../../components/NavigationBar/NavigationBar';
import RadioFilter from '../../../../components/Filter/RadioFilter';
import ProductItem, {
  type ProductItemProps,
} from '../../components/ProductItem';
import { useMyWishlist, useWishlistToggle } from '../../hooks';
import { toProductItemProps } from '../../mappers';
import { ApiError } from '../../../../api/http';
import styles from './Wishlist.module.css';

type SortValue = 'latest' | 'cheap' | 'expensive';

const CATEGORY_CODE: Record<string, string | undefined> = {
  전체: undefined,
  상의: 'top',
  하의: 'bottom',
  아우터: 'outer',
  원피스: 'one piece',
  신발: 'shoes',
  가방: 'bag',
  악세사리: 'jewelry',
};

const SORT_OPTIONS: { value: SortValue; label: string }[] = [
  { value: 'latest', label: '최신순' },
  { value: 'cheap', label: '낮은 가격순' },
  { value: 'expensive', label: '높은 가격순' },
];

const sortProducts = (products: ProductItemProps[], sort: SortValue) => {
  if (sort === 'latest') return products;
  return [...products].sort((a, b) =>
    sort === 'cheap' ? a.rentalCost - b.rentalCost : b.rentalCost - a.rentalCost
  );
};

function WishlistCard({ product }: { product: ProductItemProps }) {
  const toggle = useWishlistToggle(product.id);
  return <ProductItem {...product} onSaveButtonClick={() => toggle.mutate()} />;
}

export default function Wishlist() {
  const navigate = useNavigate();
  const [category, setCategory] = useState('전체');
  const [sortIndex, setSortIndex] = useState(0);
  const sort = SORT_OPTIONS[sortIndex];

  const { data, error } = useMyWishlist({
    category: CATEGORY_CODE[category],
  });

  useEffect(() => {
    const requestError: unknown = error;
    if (requestError instanceof ApiError && requestError.status === 401) {
      navigate('/login');
    }
  }, [error, navigate]);

  const products = sortProducts(
    (data?.items ?? []).map(toProductItemProps),
    sort.value
  );

  const handleSortClick = () => {
    setSortIndex((prev) => (prev + 1) % SORT_OPTIONS.length);
  };

  return (
    <>
      <div className={styles.header}>
        <h1 className={styles.title}>좋아요</h1>
      </div>

      <RadioFilter
        type="category"
        variant="tab"
        value={category}
        onChange={setCategory}
      />

      <div className={styles.container}>
        <div className={styles.resultBar}>
          <span className={styles.count}>
            좋아요 {data?.totalCount ?? products.length}
          </span>
          <button
            type="button"
            className={styles.sortButton}
            onClick={handleSortClick}
          >
            {sort.label}
            <ArrowUpDown size={12} />
          </button>
        </div>

        {products.length > 0 ? (
          <div className={styles.list}>
            {products.map((product) => (
              <WishlistCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <p className={styles.empty}>좋아요한 상품이 없습니다.</p>
        )}
      </div>

      <NavigationBar />
    </>
  );
}
