export type ChatUser = {
  id: string;
  name: string;
  avatarUrl?: string;
};

export type ChatMessage = {
  id: string;
  userId: string;
  text: string;
  timestamp: number;
};
