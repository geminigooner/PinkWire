import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { WindowState } from '../types/os';
import { AppRegistry } from '../applications/registry';

interface WindowStore {
  windows: WindowState[];
  focusedWindowId: string | null;
  highestZIndex: number;
  
  openWindow: (appId: string, appData?: any) => void;
  closeWindow: (id: string) => void;
  minimizeWindow: (id: string) => void;
  restoreWindow: (id: string) => void;
  toggleMaximizeWindow: (id: string) => void;
  focusWindow: (id: string) => void;
  updateWindowPosition: (id: string, x: number, y: number) => void;
  updateWindowSize: (id: string, width: number, height: number) => void;
}

export const useWindowStore = create<WindowStore>()(
  persist(
    (set, get) => ({
      windows: [],
      focusedWindowId: null,
      highestZIndex: 10,

      openWindow: (appId, appData) => {
        const { windows, highestZIndex } = get();
        const app = AppRegistry[appId];
        if (!app) return;

        const existing = windows.find(w => w.appId === appId);
        if (existing) {
          get().restoreWindow(existing.id);
          get().focusWindow(existing.id);
          // If we wanted to update appData on an existing window, we could do it here
          return;
        }

        const newZ = highestZIndex + 1;
        const newWindow: WindowState = {
          id: `${appId}-${Date.now()}`,
          appId,
          title: app.name,
          x: 50 + windows.length * 30,
          y: 50 + windows.length * 30,
          width: app.defaultWidth || 600,
          height: app.defaultHeight || 400,
          zIndex: newZ,
          isMinimized: false,
          isMaximized: false,
          appData,
        };

        set({
          windows: [...windows, newWindow],
          focusedWindowId: newWindow.id,
          highestZIndex: newZ,
        });
      },

      closeWindow: (id) => set((state) => ({
        windows: state.windows.filter((w) => w.id !== id),
        focusedWindowId: state.focusedWindowId === id ? null : state.focusedWindowId
      })),

      minimizeWindow: (id) => set((state) => ({
        windows: state.windows.map(w => w.id === id ? { ...w, isMinimized: true } : w),
        focusedWindowId: state.focusedWindowId === id ? null : state.focusedWindowId
      })),

      restoreWindow: (id) => set((state) => ({
        windows: state.windows.map(w => w.id === id ? { ...w, isMinimized: false } : w)
      })),

      toggleMaximizeWindow: (id) => set((state) => ({
        windows: state.windows.map(w => w.id === id ? { ...w, isMaximized: !w.isMaximized } : w)
      })),

      focusWindow: (id) => {
        const state = get();
        if (state.focusedWindowId === id) return;
        const newZ = state.highestZIndex + 1;
        set({
          windows: state.windows.map(w => w.id === id ? { ...w, zIndex: newZ, isMinimized: false } : w),
          focusedWindowId: id,
          highestZIndex: newZ,
        });
      },

      updateWindowPosition: (id, x, y) => set((state) => ({
        windows: state.windows.map(w => w.id === id ? { ...w, x, y } : w)
      })),

      updateWindowSize: (id, width, height) => set((state) => ({
        windows: state.windows.map(w => w.id === id ? { ...w, width, height } : w)
      })),
    }),
    {
      name: 'pinkwire-window-store',
    }
  )
);
