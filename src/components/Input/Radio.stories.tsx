import type { Meta, StoryObj } from '@storybook/react-vite';
import Radio from './Radio';
import { stubRegister } from '../../testing/storyUtils';

const meta = {
  title: 'Components/Input/Radio',
  component: Radio,
  args: {
    label: '성별',
    options: ['전체', '남성', '여성'],
    register: stubRegister('gender'),
  },
} satisfies Meta<typeof Radio>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const ObjectOptions: Story = {
  args: {
    options: [
      { value: 'M', label: '남성' },
      { value: 'F', label: '여성' },
    ],
  },
};

export const Error: Story = {
  args: {
    error: { type: 'manual', message: '성별을 선택해 주세요' },
  },
};
