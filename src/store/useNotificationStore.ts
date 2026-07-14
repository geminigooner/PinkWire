import { create } from 'zustand';

export interface Notification {
  id: string;
  title: string;
  message: string;
  icon?: string;
  onClickApp?: string;
  timestamp: number;
}

interface NotificationStore {
  notifications: Notification[];
  addNotification: (notification: Omit<Notification, 'id' | 'timestamp'>) => void;
  removeNotification: (id: string) => void;
  clearAll: () => void;
}

export const useNotificationStore = create<NotificationStore>((set) => ({
  notifications: [],
  addNotification: (notification) => set((state) => ({
    notifications: [
      {
        ...notification,
        id: crypto.randomUUID ? crypto.randomUUID() : Math.random().toString(36).substring(2, 9),
        timestamp: Date.now()
      },
      ...state.notifications
    ]
  })),
  removeNotification: (id) => set((state) => ({
    notifications: state.notifications.filter((n) => n.id !== id)
  })),
  clearAll: () => set({ notifications: [] })
}));
