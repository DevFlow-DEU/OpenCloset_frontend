import type { Meta, StoryObj } from '@storybook/react-vite';
import RefreshSpinner from './RefreshSpinner';

const meta = {
  title: 'PullToRefresh/RefreshSpinner',
  component: RefreshSpinner,
} satisfies Meta<typeof RefreshSpinner>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
