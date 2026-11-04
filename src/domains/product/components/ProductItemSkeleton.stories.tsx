import type { Meta, StoryObj } from '@storybook/react-vite';
import ProductItemSkeleton from './ProductItemSkeleton';

const meta = {
  title: 'Product/ProductItemSkeleton',
  component: ProductItemSkeleton,
} satisfies Meta<typeof ProductItemSkeleton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Grid: Story = {
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: '175px 175px', columnGap: 12 }}>
      <ProductItemSkeleton />
      <ProductItemSkeleton />
      <ProductItemSkeleton />
      <ProductItemSkeleton />
    </div>
  ),
};
