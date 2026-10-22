import type { Meta, StoryObj } from '@storybook/react-vite';
import Size from './Size';

const meta = {
  title: 'Components/Drawer/Size',
  component: Size,
  args: {
    selected: '',
    onSelect: () => undefined,
    onClose: () => undefined,
  },
} satisfies Meta<typeof Size>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Selected: Story = {
  args: { selected: 'M' },
};
