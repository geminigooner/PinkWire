import { create } from 'zustand';

export type ViewType = 'library' | 'playlists' | 'albums' | 'artists' | 'favorites' | 'recently_played' | 'album_detail' | 'playlist_detail' | 'artist_detail';

interface SpunState {
  currentView: ViewType;
  selectedId: string | null;
  searchQuery: string;
  isSidebarOpen: boolean;
  
  navigate: (view: ViewType, id?: string | null) => void;
  setSearchQuery: (query: string) => void;
  toggleSidebar: () => void;
}

export const useSpunStore = create<SpunState>((set) => ({
  currentView: 'library',
  selectedId: null,
  searchQuery: '',
  isSidebarOpen: true,
  
  navigate: (view, id = null) => set({ currentView: view, selectedId: id, searchQuery: '' }),
  setSearchQuery: (query) => set({ searchQuery: query }),
  toggleSidebar: () => set((state) => ({ isSidebarOpen: !state.isSidebarOpen }))
}));
