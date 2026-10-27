import type { Meta, StoryObj } from '@storybook/react-vite';
import ManageItem from './ManageItem';
import productImage from '../../../assets/Default_Profile.png';

const meta = {
  title: 'Product/ManageItem',
  component: ManageItem,
  args: {
    image: productImage,
    name: '베이지 니트 가디건',
    dateStart: '2026-10-12',
    dateEnd: '2026-10-15',
    price: 15000,
  },
} satisfies Meta<typeof ManageItem>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Reserved: Story = {
  args: { state: '예약중' },
};

export const Renting: Story = {
  args: { state: '대여중' },
};

export const Returned: Story = {
  args: { state: '대여완료' },
};
