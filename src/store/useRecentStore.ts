import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface RecentItem {
  id: string; // e.g. appId, fileId
  type: 'app' | 'file' | 'journal' | 'guestbook' | 'media';
  title: string;
  timestamp: number;
}

interface RecentStore {
  recentApps: RecentItem[];
  recentFiles: RecentItem[];
  recentActivity: RecentItem[]; // Combined activity
  
  addRecentApp: (appId: string, title: string) => void;
  addRecentFile: (fileId: string, title: string) => void;
  addRecentActivity: (item: Omit<RecentItem, 'timestamp'>) => void;
  clearHistory: () => void;
}

export const useRecentStore = create<RecentStore>()(
  persist(
    (set) => ({
      recentApps: [],
      recentFiles: [],
      recentActivity: [],
      
      addRecentApp: (appId, title) => set((state) => {
        const newItem: RecentItem = { id: appId, type: 'app', title, timestamp: Date.now() };
        return {
          recentApps: [newItem, ...state.recentApps.filter(a => a.id !== appId)].slice(0, 10),
          recentActivity: [newItem, ...state.recentActivity.filter(a => a.id !== appId)].slice(0, 20)
        };
      }),
      
      addRecentFile: (fileId, title) => set((state) => {
        const newItem: RecentItem = { id: fileId, type: 'file', title, timestamp: Date.now() };
        return {
          recentFiles: [newItem, ...state.recentFiles.filter(f => f.id !== fileId)].slice(0, 10),
          recentActivity: [newItem, ...state.recentActivity.filter(a => a.id !== fileId)].slice(0, 20)
        };
      }),
      
      addRecentActivity: (item) => set((state) => {
        const newItem: RecentItem = { ...item, timestamp: Date.now() };
        return {
          recentActivity: [newItem, ...state.recentActivity.filter(a => a.id !== item.id)].slice(0, 20)
        };
      }),
      
      clearHistory: () => set({ recentApps: [], recentFiles: [], recentActivity: [] }),
    }),
    {
      name: 'pinkwire-recent-store',
      version: 1,
    }
  )
);
