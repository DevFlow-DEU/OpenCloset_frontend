import type { Meta, StoryObj } from '@storybook/react-vite';
import ChatBubble from './ChatBubble';

const meta = {
  title: 'Chat/ChatBubble',
  component: ChatBubble,
  args: {
    children: '이 상품 아직 대여 가능할까요?',
    variant: 'them',
  },
} satisfies Meta<typeof ChatBubble>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Them: Story = {};

export const Me: Story = {
  args: {
    variant: 'me',
    children: '네, 이번 주부터 가능해요!',
  },
};

export const LongMessage: Story = {
  args: {
    children:
      '안녕하세요! 다음 주 여행 예정인데 원피스 대여하고 싶어요. 사이즈 66 정도이고, 3박 4일로 빌릴 수 있을까요?',
  },
};
