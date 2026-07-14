export type FileType = 'folder' | 'image' | 'audio' | 'markdown' | 'pdf' | 'text' | 'json' | 'unknown' | 'shortcut';

export interface FileItem {
  id: string;
  name: string;
  type: FileType;
  parentId: string | null;
  size?: number;
  createdAt: string;
  modifiedAt: string;
  isFavorite?: boolean;
  content?: unknown;
  tags?: string[];
  icon?: string;
  properties?: {
    created?: string;
    modifiedCount?: number;
    previousNames?: string[];
    [key: string]: unknown;
  };
}

export type ViewMode = 'large' | 'medium' | 'small' | 'list' | 'details';
export type SortField = 'name' | 'date' | 'size' | 'type';
export type SortDirection = 'asc' | 'desc';
