import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import RadioFilter from './RadioFilter';

function RadioFilterDemo({
  type,
  initial,
}: {
  type: 'chat' | 'owner' | 'renter' | 'category';
  initial: string;
}) {
  const [value, setValue] = useState(initial);
  return <RadioFilter type={type} value={value} onChange={setValue} />;
}

const meta = {
  title: 'Components/Filter/RadioFilter',
  args: {
    type: 'category',
    initial: '전체',
  },
  render: (args) => (
    <RadioFilterDemo
      key={`${args.type}-${args.initial}`}
      type={args.type}
      initial={args.initial}
    />
  ),
} satisfies Meta<typeof RadioFilterDemo>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Category: Story = {};

export const Chat: Story = {
  args: { type: 'chat', initial: '안읽음' },
};

export const Owner: Story = {
  args: { type: 'owner', initial: '대여중' },
};
