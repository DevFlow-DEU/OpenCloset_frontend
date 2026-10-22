import type { Meta, StoryObj } from '@storybook/react-vite';
import ProductList from './ProductList';
import type { ProductItemProps } from './ProductItem';
import productImage from '../../../assets/Default_Profile.png';

const products: ProductItemProps[] = [
  {
    id: 1,
    imageUrls: [productImage],
    name: '베이지 니트 가디건',
    rentalCost: 15000,
    rentalPeriod: 3,
    wished: false,
    status: '대여가능',
  },
  {
    id: 2,
    imageUrls: [productImage],
    name: '블랙 원피스',
    rentalCost: 28000,
    rentalPeriod: 2,
    wished: true,
    status: '예약중',
    startDate: '2026-10-12',
    endDate: '2026-10-14',
  },
  {
    id: 3,
    imageUrls: [],
    name: '데님 자켓',
    rentalCost: 12000,
    rentalPeriod: 4,
    wished: false,
    status: '대여중',
  },
  {
    id: 4,
    imageUrls: [productImage],
    name: '코튼 셔츠',
    rentalCost: 9000,
    rentalPeriod: 1,
    wished: false,
    status: '반납가능',
  },
];

type Props = { products: ProductItemProps[] };

const meta = {
  title: 'Product/ProductList',
  component: ProductList,
  args: {
    products,
  },
} satisfies Meta<Props>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Empty: Story = {
  args: { products: [] },
};

export const Many: Story = {
  args: {
    products: [...products, ...products.map((p) => ({ ...p, id: p.id + 10 }))],
  },
};
