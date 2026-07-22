import { StateStorage } from 'zustand/middleware';
import { useSyncStore } from './useSyncStore';
import { useAuthStore } from '../../store/useAuthStore';

// We wrap standard localStorage to also queue syncs when data is updated.
// This allows us to drop-in replace local storage for stores that should sync to the cloud.

export const createSyncStorage = (storeName: string): StateStorage => {
  return {
    getItem: (name: string) => {
      const value = localStorage.getItem(name);
      return value;
    },
    setItem: (name: string, value: string) => {
      // Always save locally first (Mobile-first, offline-first)
      localStorage.setItem(name, value);
      
      // If we are authenticated (Amanda), queue this for cloud sync
      const { isAuthenticated } = useAuthStore.getState();
      if (isAuthenticated) {
        try {
          const parsed = JSON.parse(value);
          useSyncStore.getState().queueSync(storeName, parsed);
        } catch (e) {
          // Fallback to sending string if not JSON
          useSyncStore.getState().queueSync(storeName, value);
        }
      }
    },
    removeItem: (name: string) => {
      localStorage.removeItem(name);
      
      const { isAuthenticated } = useAuthStore.getState();
      if (isAuthenticated) {
        useSyncStore.getState().queueSync(storeName, null);
      }
    },
  };
};
