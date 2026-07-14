import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type NotificationType = 'info' | 'success' | 'warning' | 'error' | 'music' | 'guestbook' | 'system';

export interface NotificationAction {
  label: string;
  actionId: string;
}

export interface AppNotification {
  id: string;
  title: string;
  message: string;
  type: NotificationType;
  icon?: string;
  imageUrl?: string;
  onClickApp?: string;
  timestamp: number;
  read: boolean;
  actions?: NotificationAction[];
}

interface NotificationStore {
  notifications: AppNotification[];
  quietMode: boolean;
  
  addNotification: (notification: Omit<AppNotification, 'id' | 'timestamp' | 'read'>) => void;
  removeNotification: (id: string) => void;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
  clearAll: () => void;
  toggleQuietMode: () => void;
  
  // Ephemeral state for toasts
  activeToasts: AppNotification[];
  dismissToast: (id: string) => void;
}

export const useNotificationStore = create<NotificationStore>()(
  persist(
    (set, get) => ({
      notifications: [],
      quietMode: false,
      activeToasts: [],
      
      addNotification: (notification) => {
        const newNotif: AppNotification = {
          ...notification,
          id: Math.random().toString(36).substring(2, 9),
          timestamp: Date.now(),
          read: false
        };
        
        set((state) => ({
          notifications: [newNotif, ...state.notifications].slice(0, 100), // Keep last 100
          activeToasts: state.quietMode ? state.activeToasts : [...state.activeToasts, newNotif]
        }));
      },
      
      removeNotification: (id) => set((state) => ({
        notifications: state.notifications.filter((n) => n.id !== id),
        activeToasts: state.activeToasts.filter((n) => n.id !== id)
      })),
      
      markAsRead: (id) => set((state) => ({
        notifications: state.notifications.map((n) => n.id === id ? { ...n, read: true } : n)
      })),
      
      markAllAsRead: () => set((state) => ({
        notifications: state.notifications.map((n) => ({ ...n, read: true }))
      })),
      
      clearAll: () => set({ notifications: [], activeToasts: [] }),
      
      toggleQuietMode: () => set((state) => ({ quietMode: !state.quietMode })),
      
      dismissToast: (id) => set((state) => ({
        activeToasts: state.activeToasts.filter((n) => n.id !== id)
      }))
    }),
    {
      name: 'pinkwire-notifications',
      version: 2,
      partialize: (state) => ({
        notifications: state.notifications,
        quietMode: state.quietMode
      })
    }
  )
);
