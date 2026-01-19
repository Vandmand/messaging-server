export type User = { name: string; password: string };

export type Message = { content: string; sentAt: Date; from: string };

export type Database = {
  users: User[];
  messages: Message[];
};
