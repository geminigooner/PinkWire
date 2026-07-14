import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { DesktopIconState } from '../types/os';

interface DesktopStore {
  hasBooted: boolean;
  wallpaper: string;
  desktopIcons: DesktopIconState[];
  selectedIconId: string | null;
  
  setHasBooted: (booted: boolean) => void;
  setWallpaper: (url: string) => void;
  updateIconPosition: (id: string, x: number, y: number) => void;
  selectIcon: (id: string | null) => void;
}

export const useDesktopStore = create<DesktopStore>()(
  persist(
    (set) => ({
      hasBooted: false,
      wallpaper: 'bg-gradient-to-br from-indigo-950 via-purple-900 to-pink-900',
      desktopIcons: [
         { id: 'pinkwire-icon', appId: 'pinkwire', x: 20, y: 20 },
         { id: 'journal-icon', appId: 'journal', x: 20, y: 120 },
         { id: 'camera-roll-icon', appId: 'camera_roll', x: 20, y: 220 },
         { id: 'browser-icon', appId: 'browser', x: 20, y: 320 },
         { id: 'music-icon', appId: 'music', x: 20, y: 420 },
         { id: 'downloads-icon', appId: 'downloads', x: 120, y: 20 },
         { id: 'bad-takes-icon', appId: 'bad_takes', x: 120, y: 120 }
      ],
      selectedIconId: null,
      
      setHasBooted: (hasBooted) => set({ hasBooted }),
      setWallpaper: (wallpaper) => set({ wallpaper }),
      updateIconPosition: (id, x, y) => set((state) => ({
        desktopIcons: state.desktopIcons.map(icon => 
          icon.id === id ? { ...icon, x, y } : icon
        )
      })),
      selectIcon: (id) => set({ selectedIconId: id }),
    }),
    { name: 'pinkwire-desktop-store' }
  )
);
