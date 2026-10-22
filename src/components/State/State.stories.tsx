import type { Meta, StoryObj } from '@storybook/react-vite';
import State from './State';

const meta = {
  title: 'Components/State',
  component: State,
  args: {
    state: '예약중',
  },
} satisfies Meta<typeof State>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Reserved: Story = {};

export const Renting: Story = {
  args: { state: '대여중' },
};

export const Returned: Story = {
  args: { state: '대여완료' },
};
