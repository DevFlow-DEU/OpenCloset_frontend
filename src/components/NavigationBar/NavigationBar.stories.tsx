import type { Meta, StoryObj } from '@storybook/react-vite';
import NavigationBar from './NavigationBar';

function PageBackdrop() {
  return (
    <div
      style={{
        padding: '16px 12px 100px',
        display: 'flex',
        flexDirection: 'column',
        gap: 12,
      }}
    >
      {Array.from({ length: 8 }, (_, i) => (
        <div
          key={i}
          style={{
            height: 120,
            borderRadius: 10,
            background: '#f3f4f6',
            border: '1px solid #e5e7eb',
          }}
        />
      ))}
    </div>
  );
}

const meta = {
  title: 'Components/NavigationBar',
  component: NavigationBar,
  // 네비게이션 바는 fixed + safe-area(padding-bottom 34px) 실기기 위젯이라,
  // 배경 콘텐츠 위에 얹어야 실제 배치감이 보인다.
  render: (args) => (
    <>
      <PageBackdrop />
      <NavigationBar {...args} />
    </>
  ),
} satisfies Meta<typeof NavigationBar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Home: Story = {
  parameters: { initialPath: '/' },
};

export const Chat: Story = {
  parameters: { initialPath: '/chat' },
};

export const Save: Story = {
  parameters: { initialPath: '/save' },
};

export const MyPage: Story = {
  parameters: { initialPath: '/MyPage' },
};
