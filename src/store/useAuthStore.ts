import { create } from 'zustand';
import { persist, createJSONStorage }  from 'zustand/middleware';
import { createSyncStorage } from '../services/sync/syncStorage';
import { osEvents } from '../services/notifications/EventBus';

interface AuthState {
  isAuthenticated: boolean;
  token: string | null;
  setAuth: (isAuthenticated: boolean, token: string | null) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      isAuthenticated: false,
      token: null,
      setAuth: (isAuthenticated, token) => {
        set({ isAuthenticated, token });
        if (isAuthenticated) {
          osEvents.publish({ type: 'SystemMessage', payload: { title: 'Authentication', message: 'Administrator mode unlocked.' } });
        }
      },
      logout: () => {
        set({ isAuthenticated: false, token: null });
        osEvents.publish({ type: 'SystemMessage', payload: { title: 'Authentication', message: 'Administrator session ended.' } });
      }
    }),
    {
      name: 'pinkwire-auth',
      storage: createJSONStorage(() => createSyncStorage('auth')),
    }
  )
);
