import { create } from 'zustand';
import { Article, Category } from '../types';
import { MOCK_ARTICLES, MOCK_CATEGORIES } from '../data/mockData';

interface JournalState {
  articles: Article[];
  categories: Category[];
  activeCategoryId: string;
  activeArticleId: string | null;
  searchQuery: string;
  readingMode: boolean;
  textSize: 'small' | 'medium' | 'large';

  setActiveCategory: (id: string) => void;
  setActiveArticle: (id: string | null) => void;
  setSearchQuery: (query: string) => void;
  toggleReadingMode: () => void;
  setTextSize: (size: 'small' | 'medium' | 'large') => void;
}

export const useJournalStore = create<JournalState>((set) => ({
  articles: MOCK_ARTICLES,
  categories: MOCK_CATEGORIES,
  activeCategoryId: 'all',
  activeArticleId: null,
  searchQuery: '',
  readingMode: false,
  textSize: 'medium',

  setActiveCategory: (id) => set({ activeCategoryId: id, activeArticleId: null, readingMode: false }),
  setActiveArticle: (id) => set({ activeArticleId: id }),
  setSearchQuery: (query) => set({ searchQuery: query }),
  toggleReadingMode: () => set((state) => ({ readingMode: !state.readingMode })),
  setTextSize: (size) => set({ textSize: size }),
}));
