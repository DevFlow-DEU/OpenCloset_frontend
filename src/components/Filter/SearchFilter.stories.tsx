import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import SearchFilter from './SearchFilter';
import type { FilterValue } from '../Drawer/Filter';

const EMPTY: FilterValue = {
  gender: '',
  priceMin: '',
  priceMax: '',
  category: '',
  sizes: [],
  dateStart: '',
  dateEnd: '',
};

const FILLED: FilterValue = {
  gender: '여성',
  priceMin: '5000',
  priceMax: '30000',
  category: '원피스',
  sizes: ['M', 'L'],
  dateStart: '2026-10-12',
  dateEnd: '2026-10-15',
};

function SearchFilterDemo({ initial }: { initial: FilterValue }) {
  const [value, setValue] = useState<FilterValue>(initial);
  return <SearchFilter value={value} onChange={setValue} />;
}

const meta = {
  title: 'Components/Filter/SearchFilter',
  args: {
    initial: EMPTY,
  },
  render: (args) => (
    <SearchFilterDemo key={JSON.stringify(args.initial)} {...args} />
  ),
} satisfies Meta<typeof SearchFilterDemo>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Empty: Story = {};

export const WithActiveFilters: Story = {
  args: { initial: FILLED },
};
