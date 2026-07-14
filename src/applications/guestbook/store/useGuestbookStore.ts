import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { v4 as uuidv4 } from 'uuid';

export interface GuestbookEntryData {
  id: string;
  displayName: string;
  avatar: string;
  timestamp: string;
  message: string;
  location?: string;
  website?: string;
  favorite: boolean;
  reply?: string;
  reactionCount?: number;
  themeColor?: string;
  status: 'Publish' | 'Review' | 'Reject';
  moderationReason?: string;
}

interface GuestbookStore {
  entries: GuestbookEntryData[];
  searchQuery: string;
  filter: 'all' | 'favorites' | 'archive';
  sortOrder: 'newest' | 'oldest' | 'alphabetical';
  archiveMonthYear: string | null;
  lastSubmitTime: number;
  isSidebarOpen: boolean;
  
  setSearchQuery: (query: string) => void;
  setFilter: (filter: 'all' | 'favorites' | 'archive') => void;
  setSortOrder: (order: 'newest' | 'oldest' | 'alphabetical') => void;
  setArchiveMonthYear: (monthYear: string | null) => void;
  toggleSidebar: () => void;
  
  addEntry: (entry: Omit<GuestbookEntryData, 'id' | 'timestamp' | 'favorite' | 'status'>, status: 'Publish' | 'Review' | 'Reject', reason?: string) => void;
  toggleFavorite: (id: string) => void;
  deleteEntry: (id: string) => void;
  
  seedMockData: () => void;
}

export const useGuestbookStore = create<GuestbookStore>()(
  persist(
    (set) => ({
      entries: [],
      searchQuery: '',
      filter: 'all',
      sortOrder: 'newest',
      archiveMonthYear: null,
      lastSubmitTime: 0,
      isSidebarOpen: false,
      
      setSearchQuery: (query) => set({ searchQuery: query }),
      setFilter: (filter) => set({ filter }),
      setSortOrder: (order) => set({ sortOrder: order }),
      setArchiveMonthYear: (archiveMonthYear) => set({ archiveMonthYear }),
      toggleSidebar: () => set((state) => ({ isSidebarOpen: !state.isSidebarOpen })),
      
      addEntry: (entry, status, reason) => set((state) => ({
        entries: [
          {
            ...entry,
            id: uuidv4(),
            timestamp: new Date().toISOString(),
            favorite: false,
            status,
            moderationReason: reason
          },
          ...state.entries
        ],
        lastSubmitTime: Date.now()
      })),
      
      toggleFavorite: (id) => set((state) => ({
        entries: state.entries.map(e => e.id === id ? { ...e, favorite: !e.favorite } : e)
      })),
      
      deleteEntry: (id) => set((state) => ({
        entries: state.entries.filter(e => e.id !== id)
      })),
      
      seedMockData: () => set((state) => {
        if (state.entries.length > 0) return state;
        
        return {
          entries: [
            {
              id: uuidv4(),
              displayName: 'CyberSurfer99',
              avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=100&h=100&fit=crop',
              timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2).toISOString(),
              message: 'Love the new site layout! Very cozy vibes here. Will definitely stop by again.',
              location: 'Seattle, WA',
              favorite: true,
              themeColor: '#ec4899',
              status: 'Publish'
            },
            {
              id: uuidv4(),
              displayName: 'NeonDreamer',
              avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop',
              timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 15).toISOString(),
              message: 'Just dropping a quick hello! Your journal entries have been so inspiring lately.',
              website: 'https://neondreams.example.com',
              favorite: false,
              themeColor: '#8b5cf6',
              status: 'Publish'
            },
            {
              id: uuidv4(),
              displayName: 'RetroBytes',
              avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop',
              timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 45).toISOString(),
              message: 'Stumbled upon this place by accident and what a happy accident it was. Keep up the great work!',
              location: 'Tokyo, Japan',
              favorite: false,
              themeColor: '#3b82f6',
              status: 'Publish'
            }
          ]
        };
      })
    }),
    {
      name: 'pinkwire-guestbook',
      partialize: (state) => ({
        entries: state.entries,
        lastSubmitTime: state.lastSubmitTime
      })
    }
  )
);
