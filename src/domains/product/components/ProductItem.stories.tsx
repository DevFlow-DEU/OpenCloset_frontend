import type { Meta, StoryObj } from '@storybook/react-vite';
import ProductItem, { type ProductItemProps } from './ProductItem';
import productImage from '../../../assets/Default_Profile.png';

const base: ProductItemProps = {
  id: 1,
  imageUrls: [productImage],
  name: '베이지 니트 가디건',
  rentalCost: 15000,
  rentalPeriod: 3,
  wished: false,
  status: '대여가능',
};

const meta = {
  title: 'Product/ProductItem',
  component: ProductItem,
  args: base,
} satisfies Meta<typeof ProductItem>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Wished: Story = {
  args: { wished: true },
};

export const Reserved: Story = {
  args: {
    status: '예약중',
    startDate: '2026-10-12',
    endDate: '2026-10-15',
  },
};

export const NoImage: Story = {
  args: { imageUrls: [] },
};
