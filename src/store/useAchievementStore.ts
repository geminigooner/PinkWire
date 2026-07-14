import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { osEvents } from '../services/notifications/EventBus';

export type AchievementId =
  | 'opened_all_apps'
  | 'found_hidden_folder'
  | 'changed_wallpaper'
  | 'signed_guestbook'
  | 'read_five_posts'
  | 'visited_at_night'
  | 'visited_three_days';

export interface Achievement {
  id: AchievementId;
  name: string;
  description: string;
  icon: string;
  unlockedAt?: number;
}

interface AchievementStore {
  achievements: Record<AchievementId, Achievement>;
  stats: {
    appsOpened: Record<string, boolean>;
    postsRead: string[];
    daysVisited: string[];
    lastVisitDate: string | null;
  };
  unlockAchievement: (id: AchievementId) => void;
  trackAppOpen: (appId: string) => void;
  trackPostRead: (postId: string) => void;
  trackDailyVisit: () => void;
}

export const ACHIEVEMENTS: Record<AchievementId, Achievement> = {
  opened_all_apps: { id: 'opened_all_apps', name: 'Explorer', description: 'Opened every application.', icon: 'Compass' },
  found_hidden_folder: { id: 'found_hidden_folder', name: 'Snooper', description: 'Found a hidden folder.', icon: 'Eye' },
  changed_wallpaper: { id: 'changed_wallpaper', name: 'Interior Designer', description: 'Changed the wallpaper.', icon: 'Image' },
  signed_guestbook: { id: 'signed_guestbook', name: 'Making Your Mark', description: 'Signed the Guestbook.', icon: 'PenTool' },
  read_five_posts: { id: 'read_five_posts', name: 'Bookworm', description: 'Read five journal posts.', icon: 'BookOpen' },
  visited_at_night: { id: 'visited_at_night', name: 'Night Owl', description: 'Visited at night.', icon: 'Moon' },
  visited_three_days: { id: 'visited_three_days', name: 'Regular', description: 'Visited three days in a row.', icon: 'Calendar' },
};

export const useAchievementStore = create<AchievementStore>()(
  persist(
    (set, get) => ({
      achievements: ACHIEVEMENTS,
      stats: {
        appsOpened: {},
        postsRead: [],
        daysVisited: [],
        lastVisitDate: null,
      },
      
      unlockAchievement: (id) => set((state) => {
        const achievement = state.achievements[id];
        if (achievement && !achievement.unlockedAt) {
          osEvents.publish({ 
            type: 'SystemMessage', 
            payload: { title: 'Achievement Unlocked!', message: achievement.name, icon: 'Trophy' } 
          } as any);
          return {
            achievements: {
              ...state.achievements,
              [id]: { ...achievement, unlockedAt: Date.now() }
            }
          };
        }
        return state;
      }),
      
      trackAppOpen: (appId) => set((state) => {
        const appsOpened = { ...state.stats.appsOpened, [appId]: true };
        const newState = { stats: { ...state.stats, appsOpened } };
        // Check if all apps are opened (hardcoded count for now)
        const appCount = Object.keys(appsOpened).length;
        if (appCount >= 6 && !state.achievements['opened_all_apps'].unlockedAt) {
          get().unlockAchievement('opened_all_apps');
        }
        return newState;
      }),
      
      trackPostRead: (postId) => set((state) => {
        if (state.stats.postsRead.includes(postId)) return state;
        const postsRead = [...state.stats.postsRead, postId];
        const newState = { stats: { ...state.stats, postsRead } };
        if (postsRead.length >= 5 && !state.achievements['read_five_posts'].unlockedAt) {
          get().unlockAchievement('read_five_posts');
        }
        return newState;
      }),
      
      trackDailyVisit: () => set((state) => {
        const today = new Date().toISOString().split('T')[0];
        if (state.stats.lastVisitDate === today) return state;
        
        let daysVisited = [...state.stats.daysVisited];
        
        // Simple streak logic
        if (state.stats.lastVisitDate) {
          const lastDate = new Date(state.stats.lastVisitDate);
          const currentDate = new Date(today);
          const diffTime = Math.abs(currentDate.getTime() - lastDate.getTime());
          const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
          
          if (diffDays === 1) {
             daysVisited.push(today);
          } else {
             daysVisited = [today];
          }
        } else {
          daysVisited = [today];
        }
        
        const newState = { stats: { ...state.stats, daysVisited, lastVisitDate: today } };
        
        if (daysVisited.length >= 3 && !state.achievements['visited_three_days'].unlockedAt) {
          get().unlockAchievement('visited_three_days');
        }
        
        return newState;
      })
    }),
    {
      name: 'pinkwire-achievements',
      version: 1,
    }
  )
);
