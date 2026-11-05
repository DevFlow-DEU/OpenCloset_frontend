import type { Meta, StoryObj } from '@storybook/react-vite';
import ManageItemSkeleton from './ManageItemSkeleton';

const meta = {
  title: 'Product/ManageItemSkeleton',
  component: ManageItemSkeleton,
} satisfies Meta<typeof ManageItemSkeleton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const List: Story = {
  render: () => (
    <div>
      <ManageItemSkeleton />
      <ManageItemSkeleton />
      <ManageItemSkeleton />
    </div>
  ),
};
