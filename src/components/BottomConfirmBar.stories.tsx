import type { Meta, StoryObj } from '@storybook/react-vite';
import BottomConfirmBar from './BottomConfirmBar';
import { Button } from './Button/Button';

const meta = {
  title: 'Components/BottomConfirmBar',
  component: BottomConfirmBar,
  args: {
    children: <Button variant="primary">저장하기</Button>,
  },
} satisfies Meta<typeof BottomConfirmBar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const NoDivider: Story = {
  args: { showDivider: false },
};
