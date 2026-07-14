import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { DesktopIconState } from '../types/os';

export interface StickerState {
  id: string;
  type: string;
  x: number;
  y: number;
  rotation: number;
  scale: number;
}

interface DesktopStore {
  hasBooted: boolean;
  wallpaper: string;
  wallpaperFit: 'cover' | 'contain' | 'center';
  wallpaperBlur: boolean;
  desktopIcons: DesktopIconState[];
  selectedIconId: string | null;
  stickers: StickerState[];
  autoArrangeIcons: boolean;
  snapToGrid: boolean;
  showLabels: boolean;
  
  setHasBooted: (booted: boolean) => void;
  setWallpaper: (url: string) => void;
  setWallpaperFit: (fit: 'cover' | 'contain' | 'center') => void;
  setWallpaperBlur: (blur: boolean) => void;
  updateIconPosition: (id: string, x: number, y: number) => void;
  selectIcon: (id: string | null) => void;
  
  addSticker: (sticker: Omit<StickerState, 'id'>) => void;
  updateStickerPosition: (id: string, x: number, y: number) => void;
  updateStickerTransform: (id: string, rotation: number, scale: number) => void;
  removeSticker: (id: string) => void;
  
  setAutoArrangeIcons: (enabled: boolean) => void;
  setSnapToGrid: (enabled: boolean) => void;
  setShowLabels: (enabled: boolean) => void;
  resetDesktop: () => void;
}

export const useDesktopStore = create<DesktopStore>()(
  persist(
    (set) => ({
      hasBooted: false,
      wallpaper: 'bg-gradient-to-br from-indigo-950 via-purple-900 to-pink-900',
      wallpaperFit: 'cover',
      wallpaperBlur: false,
      desktopIcons: [
         { id: 'explorer-icon', appId: 'explorer', x: 20, y: 20 },
         { id: 'pinkwire-icon', appId: 'pinkwire', x: 20, y: 120 },
         { id: 'journal-icon', appId: 'journal', x: 20, y: 220 },
         { id: 'disposable-icon', appId: 'disposable', x: 20, y: 320 },
         { id: 'browser-icon', appId: 'browser', x: 20, y: 420 },
         { id: 'settings-icon', appId: 'settings', x: 120, y: 20 },
         { id: 'music-icon', appId: 'music', x: 120, y: 120 },
         { id: 'downloads-icon', appId: 'downloads', x: 120, y: 220 },
      ],
      selectedIconId: null,
      stickers: [],
      autoArrangeIcons: false,
      snapToGrid: false,
      showLabels: true,
      
      setHasBooted: (hasBooted) => set({ hasBooted }),
      setWallpaper: (wallpaper) => set({ wallpaper }),
      setWallpaperFit: (wallpaperFit) => set({ wallpaperFit }),
      setWallpaperBlur: (wallpaperBlur) => set({ wallpaperBlur }),
      updateIconPosition: (id, x, y) => set((state) => ({
        desktopIcons: state.desktopIcons.map(icon => 
          icon.id === id ? { ...icon, x, y } : icon
        )
      })),
      selectIcon: (id) => set({ selectedIconId: id }),
      
      addSticker: (sticker) => set((state) => ({
        stickers: [...state.stickers, { ...sticker, id: Math.random().toString(36).substring(2, 9) }]
      })),
      updateStickerPosition: (id, x, y) => set((state) => ({
        stickers: state.stickers.map(s => s.id === id ? { ...s, x, y } : s)
      })),
      updateStickerTransform: (id, rotation, scale) => set((state) => ({
        stickers: state.stickers.map(s => s.id === id ? { ...s, rotation, scale } : s)
      })),
      removeSticker: (id) => set((state) => ({
        stickers: state.stickers.filter(s => s.id !== id)
      })),
      
      setAutoArrangeIcons: (autoArrangeIcons) => set({ autoArrangeIcons }),
      setSnapToGrid: (snapToGrid) => set({ snapToGrid }),
      setShowLabels: (showLabels) => set({ showLabels }),
      resetDesktop: () => set({
        desktopIcons: [
           { id: 'explorer-icon', appId: 'explorer', x: 20, y: 20 },
           { id: 'pinkwire-icon', appId: 'pinkwire', x: 20, y: 120 },
           { id: 'journal-icon', appId: 'journal', x: 20, y: 220 },
           { id: 'disposable-icon', appId: 'disposable', x: 20, y: 320 },
           { id: 'browser-icon', appId: 'browser', x: 20, y: 420 },
           { id: 'settings-icon', appId: 'settings', x: 120, y: 20 },
           { id: 'music-icon', appId: 'music', x: 120, y: 120 },
           { id: 'downloads-icon', appId: 'downloads', x: 120, y: 220 },
        ],
        stickers: []
      }),
    }),
    { name: 'pinkwire-desktop-store' }
  )
);
