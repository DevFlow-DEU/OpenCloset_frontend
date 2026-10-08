import type { Meta, StoryObj } from '@storybook/react-vite';
import Filter from './Filter';

const meta = {
  title: 'Components/Drawer/Filter',
  component: Filter,
  args: {
    onApply: () => undefined,
    onClose: () => undefined,
  },
} satisfies Meta<typeof Filter>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Gender: Story = {};

export const Price: Story = {
  args: { initialTab: '가격' },
};

export const Category: Story = {
  args: { initialTab: '카테고리' },
};

export const Size: Story = {
  args: {
    initialTab: '사이즈',
    initialValue: { sizes: ['M', 'L'] },
  },
};

export const Period: Story = {
  args: {
    initialTab: '기간',
    initialValue: { dateStart: '2026-10-12', dateEnd: '2026-10-15' },
  },
};
