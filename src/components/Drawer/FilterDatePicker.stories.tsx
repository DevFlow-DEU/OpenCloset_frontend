import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import type { DateRange } from 'react-day-picker';
import FilterDatePicker from './FilterDatePicker';

function FilterDatePickerDemo({ initial }: { initial?: DateRange }) {
  const [value, setValue] = useState<DateRange | undefined>(initial);
  return <FilterDatePicker value={value} onChange={setValue} />;
}

const meta = {
  title: 'Components/Drawer/FilterDatePicker',
  args: {
    initial: undefined,
  },
  render: (args) => <FilterDatePickerDemo {...args} />,
} satisfies Meta<typeof FilterDatePickerDemo>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Empty: Story = {};

export const Selected: Story = {
  args: {
    initial: {
      from: new Date('2026-10-12'),
      to: new Date('2026-10-15'),
    },
  },
};
