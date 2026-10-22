import type { Meta, StoryObj } from '@storybook/react-vite';
import List from './List';

const meta = {
  title: 'Components/Drawer/List',
  component: List,
  args: {
    type: 'category',
    selected: '',
    onSelect: () => undefined,
    onClose: () => undefined,
  },
} satisfies Meta<typeof List>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Category: Story = {};

export const Status: Story = {
  args: { type: 'status' },
};

export const Selected: Story = {
  args: { selected: '원피스' },
};
