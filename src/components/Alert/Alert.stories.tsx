import type { Meta, StoryObj } from '@storybook/react-vite';
import Alert from './Alert';

const meta = {
  title: 'Components/Alert',
  component: Alert,
  args: {
    icon: 'check',
    title: '대여가 예약되었어요',
    description: '상품 주인이 승인하면 대여가 시작돼요.',
    buttons: 'confirm',
    onConfirm: () => undefined,
  },
} satisfies Meta<typeof Alert>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Confirm: Story = {};

export const Delete: Story = {
  args: {
    icon: 'warning',
    title: '정말 탈퇴하시겠어요?',
    description: (
      <>
        탈퇴하면 모든 데이터가
        <br />
        삭제돼요.
      </>
    ),
    buttons: 'delete',
    onCancel: () => undefined,
  },
};
