import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { v4 as uuidv4 } from 'uuid';
import { osEvents } from '../../../services/notifications/EventBus';

export type MediaCategory = 'Memes' | 'Wallpapers' | 'Journal' | 'Guestbook' | 'Album Covers' | 'Profile Photos' | 'Downloads' | 'General';

export interface MediaItem {
  id: string;
  filename: string;
  displayName: string;
  category: MediaCategory;
  tags: string[];
  favorite: boolean;
  dateUploaded: string;
  mimeType: string;
  size: number;
  url: string;
  thumbnailUrl?: string;
  width?: number;
  height?: number;
  description?: string;
}

interface MediaStore {
  items: MediaItem[];
  searchQuery: string;
  filterCategory: MediaCategory | 'All';
  filterFavorite: boolean;
  viewMode: 'grid' | 'list';
  
  setSearchQuery: (query: string) => void;
  setFilterCategory: (category: MediaCategory | 'All') => void;
  setFilterFavorite: (favorite: boolean) => void;
  setViewMode: (mode: 'grid' | 'list') => void;
  
  addMedia: (item: Omit<MediaItem, 'id' | 'dateUploaded' | 'favorite'>) => MediaItem;
  deleteMedia: (id: string) => void;
  updateMedia: (id: string, updates: Partial<MediaItem>) => void;
  toggleFavorite: (id: string) => void;
}

export const useMediaStore = create<MediaStore>()(
  persist(
    (set, get) => ({
      items: [],
      searchQuery: '',
      filterCategory: 'All',
      filterFavorite: false,
      viewMode: 'grid',
      
      setSearchQuery: (query) => set({ searchQuery: query }),
      setFilterCategory: (category) => set({ filterCategory: category }),
      setFilterFavorite: (favorite) => set({ filterFavorite: favorite }),
      setViewMode: (mode) => set({ viewMode: mode }),
      
      addMedia: (itemData) => {
        const newItem: MediaItem = {
          ...itemData,
          id: uuidv4(),
          dateUploaded: new Date().toISOString(),
          favorite: false
        };
        
        set((state) => ({
          items: [newItem, ...state.items]
        }));
        
        osEvents.publish({ type: 'Toast', payload: { message: `Uploaded ${newItem.displayName}` } });
        return newItem;
      },
      
      deleteMedia: (id) => set((state) => ({
        items: state.items.filter(i => i.id !== id)
      })),
      
      updateMedia: (id, updates) => set((state) => ({
        items: state.items.map(i => i.id === id ? { ...i, ...updates } : i)
      })),
      
      toggleFavorite: (id) => set((state) => ({
        items: state.items.map(i => i.id === id ? { ...i, favorite: !i.favorite } : i)
      }))
    }),
    {
      name: 'pinkwire-media-store',
      partialize: (state) => ({
        items: state.items,
        viewMode: state.viewMode
      })
    }
  )
);
