import React, { useMemo, useState, useCallback } from 'react';
import './Chat.css';
import type { ChatUser } from './types';
import { useChat } from './useChat';
import ChatList from './ChatList';
import ChatInput from './ChatInput';

const USERS: ChatUser[] = [
  { id: 'u1', name: 'You' },
  { id: 'u2', name: 'Alex' },
];

const SELF_ID = 'u1';

const ChatApp: React.FC = () => {
  const { messages, sendMessage } = useChat();
  const [input, setInput] = useState('');

  const usersById = useMemo(
    () => USERS.reduce<Record<string, ChatUser>>((acc, u) => ((acc[u.id] = u), acc), {}),
    []
  );

  const handleSend = useCallback(() => {
    sendMessage(SELF_ID, input);
    setInput('');
  }, [input, sendMessage]);

  return (
    <div className="chat-container">
      <div className="chat-header">Chat</div>
      <ChatList messages={messages} usersById={usersById} selfId={SELF_ID} />
      <ChatInput value={input} onChange={setInput} onSend={handleSend} />
    </div>
  );
};

export default ChatApp;
