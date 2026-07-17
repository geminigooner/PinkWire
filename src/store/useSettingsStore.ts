import { create } from 'zustand';
import { persist, createJSONStorage }  from 'zustand/middleware';
import { createSyncStorage } from '../services/sync/syncStorage';
import { osEvents } from '../services/notifications/EventBus';

interface SettingsStore {
  theme: string;
  cursor: string;
  cursorTrails: boolean;
  soundEnabled: boolean;
  sounds: {
    startup: boolean;
    shutdown: boolean;
    notification: boolean;
    windowOpen: boolean;
    windowClose: boolean;
    error: boolean;
    success: boolean;
    drag: boolean;
    drop: boolean;
  };
  volume: number;
  atmosphere: 'auto' | 'day' | 'night';
  reducedMotion: boolean;
  highContrast: boolean;
  largerText: boolean;
  cursorSize: 'normal' | 'large' | 'huge';
  animationSpeed: 'slow' | 'normal' | 'fast';
  clockFormat: 12 | 24;
  setTheme: (theme: string) => void;
  setCursor: (cursor: string) => void;
  setCursorTrails: (enabled: boolean) => void;
  setSoundEnabled: (enabled: boolean) => void;
  toggleSound: (sound: keyof SettingsStore['sounds']) => void;
  setVolume: (volume: number) => void;
  setAtmosphere: (atmosphere: 'auto' | 'day' | 'night') => void;
  setReducedMotion: (enabled: boolean) => void;
  setHighContrast: (enabled: boolean) => void;
  setLargerText: (enabled: boolean) => void;
  setCursorSize: (size: 'normal' | 'large' | 'huge') => void;
  setAnimationSpeed: (speed: 'slow' | 'normal' | 'fast') => void;
  setClockFormat: (format: 12 | 24) => void;
}

export const useSettingsStore = create<SettingsStore>()(
  persist(
    (set) => ({
      theme: 'pink',
      cursor: 'classic',
      cursorTrails: false,
      soundEnabled: true,
      sounds: {
        startup: true,
        shutdown: true,
        notification: true,
        windowOpen: true,
        windowClose: true,
        error: true,
        success: true,
        drag: true,
        drop: true,
      },
      volume: 80,
      atmosphere: 'auto',
      reducedMotion: false,
      highContrast: false,
      largerText: false,
      cursorSize: 'normal',
      animationSpeed: 'normal',
      clockFormat: 12,
      setTheme: (theme) => {
        set({ theme });
        osEvents.publish({ type: 'ThemeChanged', payload: { mode: theme } });
      },
      setCursor: (cursor) => set({ cursor }),
      setCursorTrails: (cursorTrails) => set({ cursorTrails }),
      setSoundEnabled: (soundEnabled) => set({ soundEnabled }),
      toggleSound: (sound) => set((state) => ({ sounds: { ...state.sounds, [sound]: !state.sounds[sound] } })),
      setVolume: (volume) => set({ volume }),
      setAtmosphere: (atmosphere) => {
        set({ atmosphere });
        osEvents.publish({ type: 'AtmosphereChanged', payload: { mode: atmosphere } });
      },
      setReducedMotion: (reducedMotion) => set({ reducedMotion }),
      setHighContrast: (highContrast) => set({ highContrast }),
      setLargerText: (largerText) => set({ largerText }),
      setCursorSize: (cursorSize) => set({ cursorSize }),
      setAnimationSpeed: (animationSpeed) => set({ animationSpeed }),
      setClockFormat: (clockFormat) => set({ clockFormat }),
    }),
    { 
      name: 'pinkwire-settings-store',
      storage: createJSONStorage(() => createSyncStorage('settings')),
      version: 1,
    }
  )
);
