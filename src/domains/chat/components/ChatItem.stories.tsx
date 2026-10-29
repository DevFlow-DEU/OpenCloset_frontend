import type { Meta, StoryObj } from '@storybook/react-vite';
import ChatItem from './ChatItem';
import productImage from '../../../assets/Default_Profile.png';
import noImage from '../../../assets/item_no_image.svg';

const meta = {
  title: 'Chat/ChatItem',
  component: ChatItem,
  args: {
    itemImage: productImage,
    userImage: noImage,
    name: '김클로셋',
    message: '네, 이번 주부터 가능해요!',
    time: '오전 10:24',
    unread: 0,
  },
} satisfies Meta<typeof ChatItem>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithUnread: Story = {
  args: { unread: 3 },
};

export const UnreadOverflow: Story = {
  args: { unread: 12 },
};
