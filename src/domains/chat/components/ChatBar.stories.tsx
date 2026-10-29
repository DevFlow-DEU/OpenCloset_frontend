import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import ChatBar from './ChatBar';
import type { Message } from '../types';
import productImage from '../../../assets/Default_Profile.png';

function ChatBarDemo({ initialMessage }: { initialMessage: Message }) {
  const [message, setMessage] = useState<Message>(initialMessage);
  return (
    <ChatBar
      message={message}
      setMessage={setMessage}
      onClickSendButton={() => undefined}
    />
  );
}

const emptyMessage: Message = { text: '', photos: [] };
const withPhotoMessage: Message = {
  text: '실시간 사진이에요',
  photos: [
    {
      uuid: 'story-photo-1',
      src: productImage,
      file: new File([''], 'photo.png', { type: 'image/png' }),
    },
  ],
};

const meta = {
  title: 'Chat/ChatBar',
  args: {
    initialMessage: emptyMessage,
  },
  render: (args) => (
    <ChatBarDemo key={JSON.stringify(args.initialMessage)} {...args} />
  ),
} satisfies Meta<typeof ChatBarDemo>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Empty: Story = {};

export const WithText: Story = {
  args: { initialMessage: { text: '안녕하세요', photos: [] } },
};

export const WithPhoto: Story = {
  args: { initialMessage: withPhotoMessage },
};
