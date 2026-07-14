import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { WindowState } from '../types/os';
import { AppMetadataRegistry } from '../applications/metadata';

interface OpenWindowOptions {
  instanceKey?: string;
  focusExisting?: boolean;
}

interface WindowStore {
  windows: WindowState[];
  focusedWindowId: string | null;
  highestZIndex: number;
  
  openWindow: (appId: string, appData?: unknown, options?: OpenWindowOptions) => void;
  closeWindow: (id: string) => void;
  minimizeWindow: (id: string) => void;
  restoreWindow: (id: string) => void;
  toggleMaximizeWindow: (id: string) => void;
  focusWindow: (id: string) => void;
  updateWindowPosition: (id: string, x: number, y: number) => void;
  updateWindowSize: (id: string, width: number, height: number) => void;
}

const focusNextWindow = (windows: WindowState[], currentFocusedId: string | null): string | null => {
  const visibleWindows = windows.filter(w => !w.isMinimized && w.id !== currentFocusedId);
  if (visibleWindows.length === 0) return null;
  const next = visibleWindows.reduce((prev, current) => (prev.zIndex > current.zIndex) ? prev : current);
  return next.id;
};

export const useWindowStore = create<WindowStore>()(
  persist(
    (set, get) => ({
      windows: [],
      focusedWindowId: null,
      highestZIndex: 10,

      openWindow: (appId, appData, options = { focusExisting: true }) => {
        const { windows, highestZIndex } = get();
        const appMeta = AppMetadataRegistry[appId];
        if (!appMeta) return;

        // Try importing useRecentStore inside function to avoid circular dependency if any
        import('./useRecentStore').then(({ useRecentStore }) => {
          useRecentStore.getState().addRecentApp(appId, appMeta.name);
        }).catch(e => console.error(e));

        const policy = appMeta.instancePolicy || 'multiple';
        const instanceKey = options.instanceKey;

        let existing: WindowState | undefined;
        if (policy === 'single') {
          existing = windows.find(w => w.appId === appId);
        } else if (policy === 'keyed' && instanceKey !== undefined) {
          existing = windows.find(w => w.appId === appId && w.instanceKey === instanceKey);
        }

        if (existing && options.focusExisting) {
          get().restoreWindow(existing.id);
          get().focusWindow(existing.id);
          
          if (appData !== undefined) {
            set(state => ({
              windows: state.windows.map(w => 
                w.id === existing!.id ? { ...w, appData } : w
              )
            }));
          }
          return;
        }

        const newZ = highestZIndex + 1;
        const newWindow: WindowState = {
          id: `${appId}-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
          appId,
          title: appMeta.name,
          x: Math.max(0, 50 + (windows.length % 10) * 30),
          y: Math.max(0, 50 + (windows.length % 10) * 30),
          width: appMeta.defaultWidth || 600,
          height: appMeta.defaultHeight || 400,
          zIndex: newZ,
          isMinimized: false,
          isMaximized: false,
          appData,
          instanceKey
        };

        set({
          windows: [...windows, newWindow],
          focusedWindowId: newWindow.id,
          highestZIndex: newZ,
        });
      },

      closeWindow: (id) => set((state) => {
        const newWindows = state.windows.filter((w) => w.id !== id);
        const nextFocused = state.focusedWindowId === id ? focusNextWindow(newWindows, id) : state.focusedWindowId;
        return {
          windows: newWindows,
          focusedWindowId: nextFocused
        };
      }),

      minimizeWindow: (id) => set((state) => {
        const newWindows = state.windows.map(w => w.id === id ? { ...w, isMinimized: true } : w);
        const nextFocused = state.focusedWindowId === id ? focusNextWindow(newWindows, id) : state.focusedWindowId;
        return {
          windows: newWindows,
          focusedWindowId: nextFocused
        };
      }),

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
      version: 1,
    }
  )
);
