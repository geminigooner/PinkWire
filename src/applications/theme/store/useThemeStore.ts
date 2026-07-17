import { create } from 'zustand';
import { persist, createJSONStorage }  from 'zustand/middleware';
import { createSyncStorage } from '../../../services/sync/syncStorage';
import { v4 as uuidv4 } from 'uuid';
import { Theme } from '../../../services/theme/ThemeTypes';
import { DEFAULT_THEMES } from '../../../services/theme/defaultThemes';
import { osEvents } from '../../../services/notifications/EventBus';

export const THEME_CATEGORIES = [
  'PinkWire Classic', 'Y2K', 'Windows XP', 'Windows Vista', 'Mac OS X',
  'Dreamcore', 'Computational Romanticism', 'Minimal', 'Dark', 'Light',
  'Seasonal', 'Custom'
];

interface ThemeStore {
  themes: Theme[];
  activeThemeId: string;
  
  // Browsing state
  searchQuery: string;
  activeCategory: string;
  previewThemeId: string | null;
  
  // Actions
  setSearchQuery: (query: string) => void;
  setActiveCategory: (category: string) => void;
  setPreviewThemeId: (id: string | null) => void;
  
  // Theme Management
  applyTheme: (id: string) => void;
  addTheme: (theme: Omit<Theme, 'id' | 'createdDate'>) => void;
  updateTheme: (id: string, updates: Partial<Theme>) => void;
  deleteTheme: (id: string) => void;
  duplicateTheme: (id: string) => void;
}

export const useThemeStore = create<ThemeStore>()(
  persist(
    (set, get) => ({
      themes: DEFAULT_THEMES,
      activeThemeId: 'theme-pinkwire-classic',
      
      searchQuery: '',
      activeCategory: 'All',
      previewThemeId: null,
      
      setSearchQuery: (searchQuery) => set({ searchQuery }),
      setActiveCategory: (activeCategory) => set({ activeCategory }),
      setPreviewThemeId: (previewThemeId) => set({ previewThemeId }),
      
      applyTheme: (id) => {
        const theme = get().themes.find(t => t.id === id);
        if (theme) {
          set({ activeThemeId: id, previewThemeId: null });
          osEvents.publish({ type: 'ThemeChanged', payload: { mode: theme.name } });
          
          import('../../../store/useDesktopStore').then(({ useDesktopStore }) => {
            useDesktopStore.getState().setWallpaper(theme.wallpaper);
          });
        }
      },
      
      addTheme: (themeData) => set((state) => {
        const newTheme: Theme = {
          ...themeData,
          id: `theme-${uuidv4()}`,
          createdDate: new Date().toISOString()
        };
        return { themes: [newTheme, ...state.themes] };
      }),
      
      updateTheme: (id, updates) => set((state) => ({
        themes: state.themes.map(t => t.id === id ? { ...t, ...updates } : t)
      })),
      
      deleteTheme: (id) => set((state) => {
        // Prevent deleting active theme
        if (id === state.activeThemeId) return state;
        return { themes: state.themes.filter(t => t.id !== id) };
      }),
      
      duplicateTheme: (id) => set((state) => {
        const source = state.themes.find(t => t.id === id);
        if (!source) return state;
        
        const newTheme: Theme = {
          ...source,
          id: `theme-${uuidv4()}`,
          name: `${source.name} (Copy)`,
          createdDate: new Date().toISOString(),
          favorite: false,
          featured: false,
          category: 'Custom'
        };
        return { themes: [newTheme, ...state.themes] };
      })
    }),
    {
      name: 'pinkwire-theme-store',
      storage: createJSONStorage(() => createSyncStorage('theme')),
      version: 1,
      partialize: (state) => ({
        themes: state.themes,
        activeThemeId: state.activeThemeId
      })
    }
  )
);
