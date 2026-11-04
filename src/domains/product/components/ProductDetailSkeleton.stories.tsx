import type { Meta, StoryObj } from '@storybook/react-vite';
import ProductDetailSkeleton from './ProductDetailSkeleton';

const meta = {
  title: 'Product/ProductDetailSkeleton',
  component: ProductDetailSkeleton,
} satisfies Meta<typeof ProductDetailSkeleton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
