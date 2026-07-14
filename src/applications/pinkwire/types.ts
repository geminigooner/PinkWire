export type UserStatus = 'online' | 'away' | 'offline' | 'busy' | 'invisible';

export type MessageType = 'text' | 'image' | 'code' | 'quote' | 'link' | 'system' | 'divider';

export interface Attachment {
  id: string;
  type: 'image' | 'video' | 'pdf' | 'audio';
  url: string;
  thumbnailUrl?: string;
  name: string;
  size?: number;
}

export interface Message {
  id: string;
  senderId: string;
  timestamp: string; // ISO string
  type: MessageType;
  content: string;
  attachments?: Attachment[];
  reactions?: Record<string, string[]>;
  replyToId?: string;
}

export interface Participant {
  id: string;
  name: string;
  avatar?: string;
  status: UserStatus;
  customStatus?: string;
}

export interface Conversation {
  id: string;
  title: string;
  participants: Participant[];
  lastUpdated: string;
  isFavorite?: boolean;
  isPinned?: boolean;
  tags?: string[];
  unreadCount?: number;
  theme?: string;
  messages: Message[];
}
