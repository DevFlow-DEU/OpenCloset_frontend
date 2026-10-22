import type { Meta, StoryObj } from '@storybook/react-vite';
import ActionButton from './ActionButton';

const meta = {
  title: 'Components/ActionButton',
  component: ActionButton,
  args: {
    children: '추가하기',
  },
} satisfies Meta<typeof ActionButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const FullWidth: Story = {
  args: { fullWidth: true },
};
