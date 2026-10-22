import type { Meta, StoryObj } from '@storybook/react-vite';
import Input from './Input';

const meta = {
  title: 'Components/Input/Input',
  component: Input,
  args: {
    label: '닉네임',
    placeholder: '닉네임을 입력해주세요',
  },
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Filled: Story = {
  args: { value: 'opencloset' },
};

export const Error: Story = {
  args: {
    value: 'ab',
    error: { type: 'manual', message: '2자 이상 입력해 주세요' },
  },
};

export const Password: Story = {
  args: { label: '비밀번호', type: 'password', placeholder: '비밀번호' },
};
