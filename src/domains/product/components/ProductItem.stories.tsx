import type { Meta, StoryObj } from '@storybook/react-vite';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import ProductItem, { type ProductItemProps } from './ProductItem';
import productImage from '../../../assets/Default_Profile.png';

const queryClient = new QueryClient();

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
  // ProductItem 내부의 기본 찜 토글(useWishlistToggle)가 react-query 뮤테이션을
  // 사용하므로 Storybook에서도 QueryClientProvider가 필요하다.
  decorators: [
    (Story) => (
      <QueryClientProvider client={queryClient}>
        <Story />
      </QueryClientProvider>
    ),
  ],
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
