import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import SearchInput from './SearchInput';

function SearchInputDemo({ initialText = '' }: { initialText?: string }) {
  const [text, setText] = useState(initialText);
  return <SearchInput text={text} setText={setText} />;
}

const meta = {
  title: 'Components/Input/SearchInput',
  args: {
    initialText: '',
  },
  render: (args) => <SearchInputDemo key={args.initialText} {...args} />,
} satisfies Meta<typeof SearchInputDemo>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Empty: Story = {};

export const Filled: Story = {
  args: { initialText: '원피스' },
};
