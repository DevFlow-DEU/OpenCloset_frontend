import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import type { DateRange as RdpDateRange } from 'react-day-picker';
import DateRange from './DateRange';

function DateRangeDemo({
  initial,
  error,
}: {
  initial?: RdpDateRange;
  error?: string;
}) {
  const [value, setValue] = useState<RdpDateRange | undefined>(initial);
  return (
    <DateRange
      label="대여 기간"
      value={value}
      onChange={setValue}
      error={error}
    />
  );
}

const meta = {
  title: 'Components/Input/DateRange',
  args: {
    initial: undefined,
    error: undefined,
  },
  render: (args) => <DateRangeDemo {...args} />,
} satisfies Meta<typeof DateRangeDemo>;

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

export const Error: Story = {
  args: { error: '종료일은 시작일보다 늦어야 해요' },
};
