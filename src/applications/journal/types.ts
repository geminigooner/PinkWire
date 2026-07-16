export interface Article {
  id: string;
  title: string;
  slug: string;
  subtitle?: string;
  date: string; // Original creation date / legacy
  publishedDate?: string;
  updatedDate?: string;
  category: string;
  tags: string[];
  summary: string; // legacy, alias for excerpt
  excerpt?: string;
  coverImage?: string;
  readingTime: number; // in minutes
  favorite: boolean; // legacy?
  featured?: boolean;
  content: string; // Markdown string
  status: 'published' | 'draft' | 'archived' | 'future';
  seoDescription?: string;
  relatedPosts?: string[];
  references?: { type: 'track' | 'album' | 'playlist'; id: string; name: string }[];
}

export interface Category {
  id: string;
  name: string;
  icon?: string;
}
