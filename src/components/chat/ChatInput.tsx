import React, { useCallback } from 'react';

type Props = {
  value: string;
  onChange: (v: string) => void;
  onSend: () => void;
};

const ChatInput: React.FC<Props> = React.memo(({ value, onChange, onSend }) => {
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        onSend();
      }
    },
    [onSend]
  );

  return (
    <div className="chat-input">
      <input
        type="text"
        placeholder="Type a message…"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={handleKeyDown}
        aria-label="Message input"
      />
      <button onClick={onSend} disabled={!value.trim()}>
        Send
      </button>
    </div>
  );
});

export default ChatInput;
