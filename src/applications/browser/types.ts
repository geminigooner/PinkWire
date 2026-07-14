export interface Tab {
  id: string;
  title: string;
  url: string;
  history: string[];
  historyIndex: number;
  isLoading: boolean;
  favicon?: string;
}

export interface Bookmark {
  id: string;
  title: string;
  url: string;
  icon?: string;
  category?: string;
}

export type BrowserState = {
  tabs: Tab[];
  activeTabId: string | null;
  bookmarks: Bookmark[];
  isBookmarksBarVisible: boolean;
};
