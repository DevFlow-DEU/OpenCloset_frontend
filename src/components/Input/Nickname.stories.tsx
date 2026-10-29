import type { Meta, StoryObj } from '@storybook/react-vite';
import Nickname from './Nickname';
import { stubRegister } from '../../testing/storyUtils';

const meta = {
  title: 'Components/Input/Nickname',
  component: Nickname,
  args: {
    label: '닉네임',
    placeholder: '닉네임을 입력해 주세요',
    register: stubRegister('nickname'),
    btnLabel: '확인',
  },
} satisfies Meta<typeof Nickname>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Error: Story = {
  args: {
    error: { type: 'manual', message: '이미 사용 중인 닉네임이에요' },
  },
};
