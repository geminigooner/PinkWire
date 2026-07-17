import { create } from 'zustand';
import { persist, createJSONStorage }  from 'zustand/middleware';
import { createSyncStorage } from '../services/sync/syncStorage';
import { DesktopIconState } from '../types/os';
import { osEvents } from '../services/notifications/EventBus';

export interface StickerState {
  id: string;
  type: string;
  x: number;
  y: number;
  rotation: number;
  scale: number;
}

export interface StickyNoteState {
  id: string;
  text: string;
  x: number;
  y: number;
  color: string;
}

interface DesktopStore {
  hasBooted: boolean;
  wallpaper: string;
  wallpaperFit: 'cover' | 'contain' | 'center';
  wallpaperBlur: boolean;
  favoriteWallpapers: string[];
  desktopIcons: DesktopIconState[];
  selectedIconId: string | null;
  stickers: StickerState[];
  stickyNotes: StickyNoteState[];
  autoArrangeIcons: boolean;
  snapToGrid: boolean;
  showLabels: boolean;
  
  setHasBooted: (booted: boolean) => void;
  setWallpaper: (url: string) => void;
  setWallpaperFit: (fit: 'cover' | 'contain' | 'center') => void;
  setWallpaperBlur: (blur: boolean) => void;
  toggleFavoriteWallpaper: (id: string) => void;
  updateIconPosition: (id: string, x: number, y: number) => void;
  selectIcon: (id: string | null) => void;
  
  addSticker: (sticker: Omit<StickerState, 'id'>) => void;
  updateStickerPosition: (id: string, x: number, y: number) => void;
  updateStickerTransform: (id: string, rotation: number, scale: number) => void;
  removeSticker: (id: string) => void;
  
  addStickyNote: (note: Omit<StickyNoteState, "id">) => void;
  updateStickyNote: (id: string, updates: Partial<StickyNoteState>) => void;
  removeStickyNote: (id: string) => void;
  
  setAutoArrangeIcons: (enabled: boolean) => void;
  setSnapToGrid: (enabled: boolean) => void;
  setShowLabels: (enabled: boolean) => void;
  resetDesktop: () => void;
}

const DEFAULT_ICONS = [
  { id: 'explorer-icon', appId: 'explorer', x: 20, y: 20 },
  { id: 'pinkwire-icon', appId: 'pinkwire', x: 20, y: 120 },
  { id: 'journal-icon', appId: 'journal', x: 20, y: 220 },
  { id: 'disposable-icon', appId: 'disposable', x: 20, y: 320 },
  { id: 'browser-icon', appId: 'browser', x: 20, y: 420 },
  { id: 'guestbook-icon', appId: 'guestbook', x: 20, y: 520 },
  { id: 'settings-icon', appId: 'settings', x: 120, y: 20 },
];

export const useDesktopStore = create<DesktopStore>()(
  persist(
    (set) => ({
      hasBooted: false,
      wallpaper: 'bg-gradient-to-br from-indigo-950 via-purple-900 to-pink-900',
      wallpaperFit: 'cover',
      wallpaperBlur: false,
      favoriteWallpapers: [],
      desktopIcons: [...DEFAULT_ICONS],
      selectedIconId: null,
      stickers: [],
      stickyNotes: [
        { id: 'note-1', text: "buy iced coffee", x: typeof window !== "undefined" ? window.innerWidth - 250 : 800, y: 100, color: "bg-yellow-200 text-yellow-900" },
        { id: 'note-2', text: "remember to hydrate the embeddings", x: typeof window !== "undefined" ? window.innerWidth - 220 : 830, y: 300, color: "bg-pink-200 text-pink-900" }
      ],
      autoArrangeIcons: false,
      snapToGrid: false,
      showLabels: true,
      
      setHasBooted: (hasBooted) => set({ hasBooted }),
      setWallpaper: (wallpaper) => {
        set({ wallpaper });
        osEvents.publish({ type: 'WallpaperChanged', payload: { name: 'New wallpaper' } });
        import('./useAchievementStore').then(({ useAchievementStore }) => {
          useAchievementStore.getState().unlockAchievement('changed_wallpaper');
        }).catch(e => console.error(e));
      },
      setWallpaperFit: (wallpaperFit) => set({ wallpaperFit }),
      setWallpaperBlur: (wallpaperBlur) => set({ wallpaperBlur }),
      toggleFavoriteWallpaper: (id) => set((state) => ({
        favoriteWallpapers: state.favoriteWallpapers.includes(id) 
          ? state.favoriteWallpapers.filter(w => w !== id)
          : [...state.favoriteWallpapers, id]
      })),
      updateIconPosition: (id, x, y) => set((state) => ({
        desktopIcons: state.desktopIcons.map(icon => 
          icon.id === id ? { ...icon, x, y } : icon
        )
      })),
      selectIcon: (id) => set({ selectedIconId: id }),
      
      addSticker: (sticker) => set((state) => ({
        stickers: [...state.stickers, { ...sticker, id: crypto.randomUUID ? crypto.randomUUID() : Math.random().toString(36).substring(2, 9) }]
      })),
      updateStickerPosition: (id, x, y) => set((state) => ({
        stickers: state.stickers.map(s => s.id === id ? { ...s, x, y } : s)
      })),
      updateStickerTransform: (id, rotation, scale) => set((state) => ({
        stickers: state.stickers.map(s => s.id === id ? { ...s, rotation, scale } : s)
      })),
      addStickyNote: (note) => set((state) => ({
        stickyNotes: [...state.stickyNotes, { ...note, id: crypto.randomUUID ? crypto.randomUUID() : Math.random().toString(36).substring(2, 9) }]
      })),
      updateStickyNote: (id, updates) => set((state) => ({
        stickyNotes: state.stickyNotes.map(n => n.id === id ? { ...n, ...updates } : n)
      })),
      removeStickyNote: (id) => set((state) => ({
        stickyNotes: state.stickyNotes.filter(n => n.id !== id)
      })),
      
      removeSticker: (id) => set((state) => ({
        stickers: state.stickers.filter(s => s.id !== id)
      })),
      
      setAutoArrangeIcons: (autoArrangeIcons) => set({ autoArrangeIcons }),
      setSnapToGrid: (snapToGrid) => set({ snapToGrid }),
      setShowLabels: (showLabels) => set({ showLabels }),
      resetDesktop: () => set({
        desktopIcons: [...DEFAULT_ICONS],
        stickers: []
      }),
    }),
    { 
      name: 'pinkwire-desktop-store',
      storage: createJSONStorage(() => createSyncStorage('desktop')),
      version: 1,
      partialize: (state) => ({
        hasBooted: state.hasBooted,
        wallpaper: state.wallpaper,
        wallpaperFit: state.wallpaperFit,
        wallpaperBlur: state.wallpaperBlur,
        favoriteWallpapers: state.favoriteWallpapers,
        desktopIcons: state.desktopIcons,
        stickers: state.stickers,
        stickyNotes: state.stickyNotes,
        autoArrangeIcons: state.autoArrangeIcons,
        snapToGrid: state.snapToGrid,
        showLabels: state.showLabels,
      }),
    }
  )
);
