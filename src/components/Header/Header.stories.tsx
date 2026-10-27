import type { Meta, StoryObj } from '@storybook/react-vite';
import Header from './Header';

const meta = {
  title: 'Components/Header',
  component: Header,
  args: {
    children: null,
  },
} satisfies Meta<typeof Header>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Home: Story = {
  render: () => (
    <Header>
      <Header.Root hasNotch>
        <Header.LinkGroup>
          <Header.Logo />
        </Header.LinkGroup>
        <Header.SearchLink />
      </Header.Root>
    </Header>
  ),
};

export const MainTitle: Story = {
  render: () => (
    <Header>
      <Header.Root hasNotch hasCamera>
        <Header.MainTitle title="내 정보" />
      </Header.Root>
    </Header>
  ),
};

export const CenterTitle: Story = {
  render: () => (
    <Header>
      <Header.Root hasNotch>
        <Header.BackButton />
        <Header.CenterTitle title="검색" />
      </Header.Root>
    </Header>
  ),
};

export const CenterLogo: Story = {
  render: () => (
    <Header>
      <Header.Root>
        <Header.CenterLogo />
      </Header.Root>
    </Header>
  ),
};
