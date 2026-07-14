import { create } from 'zustand';
import { AppRegistry } from '../applications/registry';

export type SearchResultType = 'app' | 'file' | 'journal' | 'guestbook' | 'setting' | 'media' | 'recent' | 'command';

export interface SearchResult {
  id: string;
  title: string;
  subtitle?: string;
  type: SearchResultType;
  icon?: any; // lucide-react component
  iconUrl?: string;
  action: () => void;
  score?: number; // for ranking
}

export interface SearchProvider {
  id: string;
  name: string;
  search: (query: string) => Promise<SearchResult[]> | SearchResult[];
}

interface SearchStore {
  query: string;
  setQuery: (query: string) => void;
  results: SearchResult[];
  isSearching: boolean;
  providers: SearchProvider[];
  registerProvider: (provider: SearchProvider) => void;
  performSearch: () => Promise<void>;
  clearSearch: () => void;
}

export const useSearchStore = create<SearchStore>((set, get) => ({
  query: '',
  setQuery: (query) => {
    set({ query });
    get().performSearch();
  },
  results: [],
  isSearching: false,
  providers: [],
  registerProvider: (provider) => set((state) => ({
    providers: [...state.providers.filter(p => p.id !== provider.id), provider]
  })),
  performSearch: async () => {
    const { query, providers } = get();
    if (!query.trim()) {
      set({ results: [], isSearching: false });
      return;
    }
    
    set({ isSearching: true });
    
    try {
      const allPromises = providers.map(p => p.search(query));
      const allResultsNested = await Promise.all(allPromises);
      const allResults = allResultsNested.flat();
      
      // Simple ranking: exact matches first, then starts with, then includes
      const rankedResults = allResults.sort((a, b) => {
        const scoreA = a.score ?? 0;
        const scoreB = b.score ?? 0;
        return scoreB - scoreA;
      });
      
      set({ results: rankedResults, isSearching: false });
    } catch (e) {
      console.error('Search error:', e);
      set({ results: [], isSearching: false });
    }
  },
  clearSearch: () => set({ query: '', results: [], isSearching: false }),
}));
