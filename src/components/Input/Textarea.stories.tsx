import type { Meta, StoryObj } from '@storybook/react-vite';
import Textarea from './Textarea';
import { stubRegister } from '../../testing/storyUtils';

const meta = {
  title: 'Components/Input/Textarea',
  component: Textarea,
  args: {
    label: '상품 소개',
    placeholder: '상품 설명을 입력해 주세요',
    register: stubRegister('description'),
    rows: 5,
  },
} satisfies Meta<typeof Textarea>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Error: Story = {
  args: {
    error: { type: 'manual', message: '10자 이상 입력해 주세요' },
  },
};
