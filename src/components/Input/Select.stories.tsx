import type { Meta, StoryObj } from '@storybook/react-vite';
import Select from './Select';
import { stubRegister } from '../../testing/storyUtils';

const meta = {
  title: 'Components/Input/Select',
  component: Select,
  args: {
    label: '카테고리',
    placeholder: '선택해 주세요',
    register: stubRegister('category'),
    drawer: 'category',
  },
} satisfies Meta<typeof Select>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Category: Story = {};

export const Size: Story = {
  args: {
    label: '사이즈',
    register: stubRegister('size'),
    drawer: 'size',
  },
};

export const Error: Story = {
  args: {
    error: { type: 'manual', message: '카테고리를 선택해 주세요' },
  },
};
