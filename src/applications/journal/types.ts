export interface Article {
  id: string;
  title: string;
  slug: string;
  date: string; // ISO string
  updated?: string;
  category: string;
  tags: string[];
  summary: string;
  coverImage?: string;
  readingTime: number; // in minutes
  favorite: boolean;
  content: string; // Markdown string
  status: 'published' | 'draft' | 'archived';
  references?: { type: 'track' | 'album' | 'playlist'; id: string; name: string }[];
}

export interface Category {
  id: string;
  name: string;
  icon?: string;
}
