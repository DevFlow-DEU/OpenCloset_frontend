import type { Meta, StoryObj } from '@storybook/react-vite';
import CategoryLink from './CategoryLink';

const meta = {
  title: 'Product/CategoryLink',
  component: CategoryLink,
  args: {
    to: '/search/top',
    clothType: 'top',
  },
} satisfies Meta<typeof CategoryLink>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Top: Story = {};

export const AllCategories: Story = {
  render: (args) => (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        gap: 8,
        width: '100%',
      }}
    >
      {(
        [
          'top',
          'pants',
          'outer',
          'bag',
          'jewelry',
          'onepiece',
          'shoes',
          'accessory',
        ] as const
      ).map((clothType) => (
        <CategoryLink key={clothType} {...args} clothType={clothType} />
      ))}
    </div>
  ),
};
