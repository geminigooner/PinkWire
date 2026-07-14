export type ViewMode = 'small' | 'medium' | 'large' | 'polaroid' | 'contact';

export interface Photo {
  id: string;
  url: string;
  title: string;
  date: string; // ISO string
  albumId: string;
  tags: string[];
  isFavorite: boolean;
  caption?: string;
  description?: string;
}

export interface Album {
  id: string;
  name: string;
  icon?: string;
  isSmart?: boolean;
}
