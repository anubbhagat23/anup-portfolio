import React from 'react';
import type { ChatMessage, ChatUser } from './types';
import ChatBubble from './ChatBubble';

type Props = {
  messages: ChatMessage[];
  usersById: Record<string, ChatUser>;
  selfId: string;
};

const ChatList: React.FC<Props> = React.memo(({ messages, usersById, selfId }) => {
  return (
    <div className="chat-list" role="log" aria-live="polite">
      {messages.map((m) => {
        const user = usersById[m.userId];
        return (
          <ChatBubble
            key={m.id}
            message={m}
            user={user}
            isSelf={m.userId === selfId}
          />
        );
      })}
    </div>
  );
});

export default ChatList;
