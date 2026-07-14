import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { v4 as uuidv4 } from 'uuid';
import { useNotificationStore } from '../../../store/useNotificationStore';

export interface Visitor {
  id: string;
  displayName: string;
  avatar: string;
  favoriteColor?: string;
  website?: string;
  location?: string;
  joinedDate: string;
  visitCount: number;
  lastVisit: string;
  badge?: string;
  status?: string;
}

export interface GuestbookEntryData {
  id: string;
  visitorId: string;
  timestamp: string;
  message: string;
  favorite: boolean;
  edited?: boolean;
  moderationStatus: 'Publish' | 'Review' | 'Reject';
  moderationReason?: string;
}

interface GuestbookStore {
  visitors: Visitor[];
  entries: GuestbookEntryData[];
  searchQuery: string;
  filter: 'all' | 'favorites' | 'archive';
  sortOrder: 'newest' | 'oldest' | 'alphabetical';
  archiveMonthYear: string | null;
  lastSubmitTime: number;
  isSidebarOpen: boolean;
  selectedVisitorId: string | null;
  
  setSearchQuery: (query: string) => void;
  setFilter: (filter: 'all' | 'favorites' | 'archive') => void;
  setSortOrder: (order: 'newest' | 'oldest' | 'alphabetical') => void;
  setArchiveMonthYear: (monthYear: string | null) => void;
  toggleSidebar: () => void;
  setSelectedVisitorId: (id: string | null) => void;
  
  addEntry: (
    visitorDetails: { displayName: string; avatar: string; website?: string; location?: string; favoriteColor?: string }, 
    message: string, 
    status: 'Publish' | 'Review' | 'Reject', 
    reason?: string
  ) => void;
  toggleFavorite: (id: string) => void;
  deleteEntry: (id: string) => void;
  
  seedMockData: () => void;
}

export const useGuestbookStore = create<GuestbookStore>()(
  persist(
    (set, get) => ({
      visitors: [],
      entries: [],
      searchQuery: '',
      filter: 'all',
      sortOrder: 'newest',
      archiveMonthYear: null,
      lastSubmitTime: 0,
      isSidebarOpen: false,
      selectedVisitorId: null,
      
      setSearchQuery: (query) => set({ searchQuery: query }),
      setFilter: (filter) => set({ filter }),
      setSortOrder: (order) => set({ sortOrder: order }),
      setArchiveMonthYear: (archiveMonthYear) => set({ archiveMonthYear }),
      toggleSidebar: () => set((state) => ({ isSidebarOpen: !state.isSidebarOpen })),
      setSelectedVisitorId: (id) => set({ selectedVisitorId: id }),
      
      addEntry: (visitorDetails, message, status, reason) => {
        set((state) => {
          const now = new Date().toISOString();
          let visitor = state.visitors.find(v => v.displayName === visitorDetails.displayName);
          let newVisitors = [...state.visitors];
          
          if (visitor) {
            visitor = {
              ...visitor,
              visitCount: visitor.visitCount + 1,
              lastVisit: now,
              avatar: visitorDetails.avatar,
              website: visitorDetails.website || visitor.website,
              location: visitorDetails.location || visitor.location,
              favoriteColor: visitorDetails.favoriteColor || visitor.favoriteColor
            };
            newVisitors = newVisitors.map(v => v.id === visitor!.id ? visitor! : v);
          } else {
            visitor = {
              id: uuidv4(),
              displayName: visitorDetails.displayName,
              avatar: visitorDetails.avatar,
              website: visitorDetails.website,
              location: visitorDetails.location,
              favoriteColor: visitorDetails.favoriteColor,
              joinedDate: now,
              visitCount: 1,
              lastVisit: now,
            };
            newVisitors.unshift(visitor);
          }
          
          const newEntry: GuestbookEntryData = {
            id: uuidv4(),
            visitorId: visitor.id,
            timestamp: now,
            message,
            favorite: false,
            moderationStatus: status,
            moderationReason: reason
          };

          // Trigger notification
          if (status === 'Publish') {
            useNotificationStore.getState().addNotification({
              title: visitor.visitCount > 1 ? '👋 Returning Visitor' : '💌 New Guestbook Entry',
              message: `${visitor.displayName} just signed your guestbook!`,
              icon: 'BookHeart',
              onClickApp: 'guestbook'
            });
          }

          return {
            visitors: newVisitors,
            entries: [newEntry, ...state.entries],
            lastSubmitTime: Date.now()
          };
        });
      },
      
      toggleFavorite: (id) => set((state) => {
        const entry = state.entries.find(e => e.id === id);
        if (entry && !entry.favorite) {
           useNotificationStore.getState().addNotification({
              title: '⭐ Entry Favorited',
              message: `You favorited an entry.`,
              icon: 'Star',
              onClickApp: 'guestbook'
            });
        }
        return {
          entries: state.entries.map(e => e.id === id ? { ...e, favorite: !e.favorite } : e)
        };
      }),
      
      deleteEntry: (id) => set((state) => ({
        entries: state.entries.filter(e => e.id !== id)
      })),
      
      seedMockData: () => set((state) => {
        if (state.visitors.length > 0) return state;
        
        const now = Date.now();
        const v1Id = uuidv4();
        const v2Id = uuidv4();
        const v3Id = uuidv4();

        const mockVisitors: Visitor[] = [
          {
            id: v1Id,
            displayName: 'CyberSurfer99',
            avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=100&h=100&fit=crop',
            location: 'Seattle, WA',
            favoriteColor: '#ec4899',
            joinedDate: new Date(now - 1000 * 60 * 60 * 24 * 2).toISOString(),
            visitCount: 1,
            lastVisit: new Date(now - 1000 * 60 * 60 * 24 * 2).toISOString(),
          },
          {
            id: v2Id,
            displayName: 'NeonDreamer',
            avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop',
            website: 'https://neondreams.example.com',
            favoriteColor: '#8b5cf6',
            joinedDate: new Date(now - 1000 * 60 * 60 * 24 * 15).toISOString(),
            visitCount: 3,
            lastVisit: new Date(now - 1000 * 60 * 60 * 24 * 15).toISOString(),
          },
          {
            id: v3Id,
            displayName: 'RetroBytes',
            avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop',
            location: 'Tokyo, Japan',
            favoriteColor: '#3b82f6',
            joinedDate: new Date(now - 1000 * 60 * 60 * 24 * 45).toISOString(),
            visitCount: 1,
            lastVisit: new Date(now - 1000 * 60 * 60 * 24 * 45).toISOString(),
          }
        ];

        const mockEntries: GuestbookEntryData[] = [
          {
            id: uuidv4(),
            visitorId: v1Id,
            timestamp: new Date(now - 1000 * 60 * 60 * 24 * 2).toISOString(),
            message: 'Love the new site layout! Very cozy vibes here. Will definitely stop by again.',
            favorite: true,
            moderationStatus: 'Publish'
          },
          {
            id: uuidv4(),
            visitorId: v2Id,
            timestamp: new Date(now - 1000 * 60 * 60 * 24 * 15).toISOString(),
            message: 'Just dropping a quick hello! Your journal entries have been so inspiring lately.',
            favorite: false,
            moderationStatus: 'Publish'
          },
          {
            id: uuidv4(),
            visitorId: v3Id,
            timestamp: new Date(now - 1000 * 60 * 60 * 24 * 45).toISOString(),
            message: 'Stumbled upon this place by accident and what a happy accident it was. Keep up the great work!',
            favorite: false,
            moderationStatus: 'Publish'
          }
        ];

        return {
          visitors: mockVisitors,
          entries: mockEntries
        };
      })
    }),
    {
      name: 'pinkwire-guestbook-v2',
      partialize: (state) => ({
        visitors: state.visitors,
        entries: state.entries,
        lastSubmitTime: state.lastSubmitTime
      })
    }
  )
);
