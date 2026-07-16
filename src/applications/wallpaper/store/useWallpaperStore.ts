import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { v4 as uuidv4 } from 'uuid';

export interface Wallpaper {
  id: string;
  title: string;
  description: string;
  artist: string;
  url: string;
  thumbnailUrl?: string;
  category: string;
  tags: string[];
  favorite: boolean;
  featured: boolean;
  uploadedDate: string;
}

export const INITIAL_CATEGORIES = [
  'Pink', 'Y2K', 'Night', 'Day', 'Dreamcore', 'Servers', 
  'Computational Romanticism', 'Minimal', 'Nature', 'Projects', 'Seasonal'
];

export const INITIAL_WALLPAPERS: Wallpaper[] = [
  {
    id: 'w-default',
    title: 'PinkWire Gradient',
    description: 'The standard gradient background',
    artist: 'PinkWire Design',
    url: 'bg-gradient-to-br from-indigo-950 via-purple-900 to-pink-900',
    category: 'Minimal',
    tags: ['gradient', 'default', 'pink'],
    favorite: false,
    featured: true,
    uploadedDate: new Date().toISOString()
  },
  {
    id: 'w-sunset',
    title: 'Cyber Sunset',
    description: 'A beautiful retro sunset',
    artist: 'PinkWire Design',
    url: 'https://images.unsplash.com/photo-1614275069929-281b312781cc?q=80&w=2560&auto=format&fit=crop',
    category: 'Y2K',
    tags: ['retro', 'sunset', 'cyber'],
    favorite: false,
    featured: true,
    uploadedDate: new Date().toISOString()
  },
  {
    id: 'w-server',
    title: 'Server Room',
    description: 'Data center lights',
    artist: 'PinkWire Design',
    url: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=2560&auto=format&fit=crop',
    category: 'Servers',
    tags: ['tech', 'lights', 'data'],
    favorite: false,
    featured: false,
    uploadedDate: new Date().toISOString()
  }
];

interface WallpaperStore {
  wallpapers: Wallpaper[];
  categories: string[];
  
  // Browsing state
  searchQuery: string;
  activeCategory: string; // 'All', 'Favorites', or specific
  viewMode: 'grid' | 'large';
  previewWallpaperId: string | null;
  
  // Actions
  setSearchQuery: (query: string) => void;
  setActiveCategory: (category: string) => void;
  setViewMode: (mode: 'grid' | 'large') => void;
  setPreviewWallpaperId: (id: string | null) => void;
  
  // Admin Actions
  addWallpaper: (wallpaper: Omit<Wallpaper, 'id' | 'uploadedDate'>) => void;
  updateWallpaper: (id: string, updates: Partial<Wallpaper>) => void;
  deleteWallpaper: (id: string) => void;
  
  // Category Actions
  addCategory: (category: string) => void;
  deleteCategory: (category: string) => void;
  mergeCategories: (source: string, target: string) => void;
  reorderCategories: (categories: string[]) => void;
}

export const useWallpaperStore = create<WallpaperStore>()(
  persist(
    (set) => ({
      wallpapers: INITIAL_WALLPAPERS,
      categories: INITIAL_CATEGORIES,
      
      searchQuery: '',
      activeCategory: 'All',
      viewMode: 'grid',
      previewWallpaperId: null,
      
      setSearchQuery: (searchQuery) => set({ searchQuery }),
      setActiveCategory: (activeCategory) => set({ activeCategory }),
      setViewMode: (viewMode) => set({ viewMode }),
      setPreviewWallpaperId: (id) => set({ previewWallpaperId: id }),
      
      addWallpaper: (data) => set((state) => {
        const newWallpaper: Wallpaper = {
          ...data,
          id: uuidv4(),
          uploadedDate: new Date().toISOString()
        };
        return { wallpapers: [newWallpaper, ...state.wallpapers] };
      }),
      
      updateWallpaper: (id, updates) => set((state) => ({
        wallpapers: state.wallpapers.map(w => w.id === id ? { ...w, ...updates } : w)
      })),
      
      deleteWallpaper: (id) => set((state) => ({
        wallpapers: state.wallpapers.filter(w => w.id !== id)
      })),
      
      addCategory: (category) => set((state) => {
        if (state.categories.includes(category)) return state;
        return { categories: [...state.categories, category] };
      }),
      
      deleteCategory: (category) => set((state) => ({
        categories: state.categories.filter(c => c !== category),
        wallpapers: state.wallpapers.map(w => w.category === category ? { ...w, category: 'Minimal' } : w) // fallback
      })),
      
      mergeCategories: (source, target) => set((state) => ({
        categories: state.categories.filter(c => c !== source),
        wallpapers: state.wallpapers.map(w => w.category === source ? { ...w, category: target } : w)
      })),
      
      reorderCategories: (categories) => set({ categories })
    }),
    {
      name: 'pinkwire-wallpaper-store',
      partialize: (state) => ({
        wallpapers: state.wallpapers,
        categories: state.categories,
        viewMode: state.viewMode
      })
    }
  )
);
