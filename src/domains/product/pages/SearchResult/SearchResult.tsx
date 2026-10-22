import { useEffect, useState, type FormEvent } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowUpDown } from 'lucide-react';
import type { components } from '../../../../api/api';
import BackIcon from '../../../../assets/header_back.svg?react';
import SearchInput from '../../../../components/Input/SearchInput';
import SearchFilter from '../../../../components/Filter/SearchFilter';
import { type FilterValue } from '../../../../components/Drawer/Filter';
import NavigationBar from '../../../../components/NavigationBar/NavigationBar';
import ProductList from '../../components/ProductList';
import { type ProductItemProps } from '../../components/ProductItem';
import { useSearchAdvanced } from '../../hooks';
import styles from './SearchResult.module.css';

type BoardSearchRequest = components['schemas']['BoardSearchRequestDto'];
type SortValue = 'latest' | 'expensive' | 'cheap';

const EMPTY_FILTER: FilterValue = {
  gender: '',
  priceMin: '',
  priceMax: '',
  category: '',
  sizes: [],
  dateStart: '',
  dateEnd: '',
};

const GENDER_CODE: Record<string, string> = {
  남성: 'M',
  여성: 'W',
  공용: '공용',
};

const CATEGORY_CODE: Record<string, string> = {
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

const toSearchBody = (
  title: string,
  filter: FilterValue
): BoardSearchRequest => ({
  title,
  sex: GENDER_CODE[filter.gender],
  category: CATEGORY_CODE[filter.category],
  size: filter.sizes[0],
  minPrice: filter.priceMin ? Number(filter.priceMin) : undefined,
  maxPrice: filter.priceMax ? Number(filter.priceMax) : undefined,
});

export default function SearchResult() {
  const navigate = useNavigate();
  const { searchText: routeSearchText = '' } = useParams();
  const [searchText, setSearchText] = useState(routeSearchText);
  const [filter, setFilter] = useState<FilterValue>(EMPTY_FILTER);
  const [sortIndex, setSortIndex] = useState(0);
  const sort = SORT_OPTIONS[sortIndex];

  useEffect(() => {
    setSearchText(routeSearchText);
  }, [routeSearchText]);

  const { data } = useSearchAdvanced(
    toSearchBody(routeSearchText, filter),
    sort.value
  );

  const products: ProductItemProps[] = (data?.items ?? []).map((product) => ({
    id: product.id ?? 0,
    name: product.name ?? '',
    rentalCost: product.rentalCost ?? 0,
    rentalPeriod: product.rentalPeriod ?? 0,
    imageUrls: product.imageUrls ?? [],
    wished: product.wished ?? false,
    startDate: product.startDate,
    endDate: product.endDate,
    status: (product.status as ProductItemProps['status']) ?? '대여가능',
  }));

  const handleSearch = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const trimmed = searchText.trim();
    if (!trimmed) return;
    navigate(`/search/result/${encodeURIComponent(trimmed)}`);
  };

  const handleSortClick = () => {
    setSortIndex((prev) => (prev + 1) % SORT_OPTIONS.length);
  };

  return (
    <>
      <div className={styles.header}>
        <div className={styles.headerTop}>
          <button
            type="button"
            className={styles.backButton}
            onClick={() => navigate(-1)}
            aria-label="뒤로가기"
          >
            <BackIcon width={'12px'} height={'24px'} />
          </button>
          <form className={styles.searchForm} onSubmit={handleSearch}>
            <SearchInput text={searchText} setText={setSearchText} />
          </form>
        </div>
        <SearchFilter value={filter} onChange={setFilter} />
      </div>

      <div className={styles.container}>
        <div className={styles.resultBar}>
          <span className={styles.count}>상품 {products.length}</span>
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
          <ProductList products={products} />
        ) : (
          <p className={styles.empty}>검색 결과가 없습니다.</p>
        )}
      </div>

      <NavigationBar />
    </>
  );
}
