import React from 'react';
import type { ChatMessage, ChatUser } from './types';

type Props = {
  message: ChatMessage;
  user: ChatUser;
  isSelf: boolean;
};

const ChatBubble: React.FC<Props> = React.memo(({ message, user, isSelf }) => {
  return (
    <div className={`chat-bubble ${isSelf ? 'self' : 'other'}`}>
      {!isSelf && (
        <div className="chat-avatar" aria-hidden="true">
          {user.avatarUrl ? <img src={user.avatarUrl} alt="" /> : user.name[0]}
        </div>
      )}
      <div className="chat-bubble-content">
        {!isSelf && <div className="chat-author">{user.name}</div>}
        <div className="chat-text">{message.text}</div>
        <div className="chat-time">
          {new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </div>
      </div>
    </div>
  );
});

export default ChatBubble;
