import React, { useState, useRef, useEffect } from 'react';
import './Chat.css';
import { Send, ChevronLeft, Share2, MoreHorizontal, Plus } from 'lucide-react';

export default function Chat() {
  const token = localStorage.getItem('token');
  const userId = 3;
  const productName = '상품명 살라살라';
  const price = '3000원';
  const days = '7일';
  const sellerName = '보노보노';
  const [updatedCount, setUpdatedCount] = useState(0);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const chatEndRef = useRef(null);

  const sendMessage = () => {
    if (!newMessage.trim()) return;
    const newMsg = { content: newMessage, senderId: userId };
    setMessages((prevMessages) => [...prevMessages, newMsg]);
    setNewMessage('');
  };

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);
  useEffect(() => {
    const fetchAllMessages = async () => {
      const response = await fetch(
        'http://113.198.229.158:8880/api/chat/rooms/52/messages',
        { headers: { Authorization: `Bearer ${token}` } }
      );
      const fetchedMessages = await response.json();
      setMessages(fetchedMessages);
    };
    fetchAllMessages();
  }, []);

  return (
    <div className='chat-page'>
      <div className='notch'></div>
      {/* 노치부분 공백 */}
      <header className='chat-header'>
        {' '}
        {/* 유저부분  */}
        <button
          className='icon-button-back
        '
        >
          <ChevronLeft size={35} />
        </button>
        <div className='chat-user-info'>
          <img
            src='https://pbs.twimg.com/media/EnXJUgGXMAUIB77.jpg'
            alt='user'
            className='user-avatar'
          />
          <div className='user-name'>{sellerName}</div>
        </div>
        <div className='chat-header-actions'>
          <Share2 size={28} />
          <MoreHorizontal size={28} />
        </div>
      </header>
      <div className='product-header'>
        {/* 상품 정보 부분 */}
        <div className='product-meta'>
          {price} / {days}
        </div>
        <div className='product-name'>{productName}</div>
      </div>

      <div className='chat-messages'>
        {/* 메시지 부분 */}
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`message-bubble ${
              msg.senderId === userId ? 'me' : 'you'
            }`}
          >
            {msg.content}
          </div>
        ))}
        <div ref={chatEndRef} />
      </div>

      {/* 푸터 */}
      <footer className='chat-input-area'>
        <button className='icon-button'>
          <Plus size={20} />
        </button>
        <input
          type='text'
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder='Message...'
        />
        <button onClick={sendMessage} className='send-button'>
          <Send className='send-icon' />
        </button>
      </footer>
      <div className='gesture'></div>
      {/* 제스처 하단 공백 */}
    </div>
  );
}
