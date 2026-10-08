import type { Meta, StoryObj } from '@storybook/react-vite';
import type { ComponentType, ReactElement } from 'react';
import { MemoryRouter } from 'react-router-dom';
import NavigationBar from './NavigationBar';

const atPath =
  (path: string) =>
  (Story: ComponentType): ReactElement => (
    <MemoryRouter initialEntries={[path]}>
      <Story />
    </MemoryRouter>
  );

const meta = {
  title: 'Components/NavigationBar',
  component: NavigationBar,
} satisfies Meta<typeof NavigationBar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Home: Story = {
  decorators: [atPath('/')],
};

export const Chat: Story = {
  decorators: [atPath('/chat')],
};

export const Save: Story = {
  decorators: [atPath('/save')],
};

export const MyPage: Story = {
  decorators: [atPath('/MyPage')],
};
