import type { Meta, StoryObj } from '@storybook/react-vite';
import BannerSkeleton from './BannerSkeleton';

const meta = {
  title: 'Product/BannerSkeleton',
  component: BannerSkeleton,
} satisfies Meta<typeof BannerSkeleton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
