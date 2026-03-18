import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import type { ChatMessage } from './types';

export const useChat = (initial: ChatMessage[] = []) => {
  const [messages, setMessages] = useState<ChatMessage[]>(initial);
  const idRef = useRef(0);
  const timeoutsRef = useRef<number[]>([]);
  const autoReplyUserId = 'u2';

  useEffect(() => {
    return () => {
      timeoutsRef.current.forEach((t) => clearTimeout(t));
      timeoutsRef.current = [];
    };
  }, []);

  const sendMessage = useCallback((userId: string, text: string) => {
    const trimmed = text.trim();
    if (!trimmed) return;

    const id = `${Date.now()}-${idRef.current++}`;
    const next: ChatMessage = { id, userId, text: trimmed, timestamp: Date.now() };
    setMessages((prev) => [...prev, next]);

    if (userId !== autoReplyUserId) {
      const timeoutId = window.setTimeout(() => {
        const replyId = `${Date.now()}-${idRef.current++}`;
        const reply: ChatMessage = {
          id: replyId,
          userId: autoReplyUserId,
          text: 'Thanks! I will get back to you shortly.',
          timestamp: Date.now(),
        };
        setMessages((prev) => [...prev, reply]);
      }, 600);
      timeoutsRef.current.push(timeoutId);
    }
  }, []);

  return useMemo(() => ({ messages, sendMessage }), [messages, sendMessage]);
};
