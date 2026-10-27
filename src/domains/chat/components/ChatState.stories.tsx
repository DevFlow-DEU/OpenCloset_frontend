import type { Meta, StoryObj } from '@storybook/react-vite';
import ChatState from './ChatState';
import productImage from '../../../assets/Default_Profile.png';

const meta = {
  title: 'Chat/ChatState',
  component: ChatState,
  args: {
    image: productImage,
    name: '베이지 니트 가디건',
    price: 15000,
    status: '대여가능',
  },
} satisfies Meta<typeof ChatState>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Available: Story = {};

export const Reserved: Story = {
  args: { status: '예약중' },
};

export const Renting: Story = {
  args: { status: '대여중' },
};
