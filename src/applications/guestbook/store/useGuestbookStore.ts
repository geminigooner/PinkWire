import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { v4 as uuidv4 } from 'uuid';
import { osEvents } from '../../../services/notifications/EventBus';

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

          if (status === 'Publish') {
            osEvents.publish({
              type: 'GuestbookEntry',
              payload: {
                visitorName: visitor.displayName,
                returning: visitor.visitCount > 1
              }
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
           osEvents.publish({ type: 'GuestbookFavorited', payload: {} });
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
          }
        ];

        const mockEntries: GuestbookEntryData[] = [
          {
            id: uuidv4(),
            visitorId: v1Id,
            timestamp: new Date(now - 1000 * 60 * 60 * 24 * 2).toISOString(),
            message: 'Love the new site layout!',
            favorite: true,
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
