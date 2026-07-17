import { create } from 'zustand';
import { persist, createJSONStorage }  from 'zustand/middleware';
import { createSyncStorage } from '../../services/sync/syncStorage';

export interface UserProfile {
  displayName: string;
  profilePicture: string;
  biography: string;
  
  // Preferences
  preferredLayout: 'standard' | 'compact' | 'relaxed';
  preferredFontSize: 'small' | 'medium' | 'large';
  
  // Notification Preferences
  notificationsEnabled: boolean;
  soundEnabled: boolean;
  
  // Future fields
  metadata?: Record<string, any>;
}

interface ProfileStore {
  profile: UserProfile;
  updateProfile: (updates: Partial<UserProfile>) => void;
}

const DEFAULT_PROFILE: UserProfile = {
  displayName: 'Amanda',
  profilePicture: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop',
  biography: 'System Administrator & Creator.',
  preferredLayout: 'standard',
  preferredFontSize: 'medium',
  notificationsEnabled: true,
  soundEnabled: true,
};

export const useProfileStore = create<ProfileStore>()(
  persist(
    (set) => ({
      profile: DEFAULT_PROFILE,
      updateProfile: (updates) => set((state) => ({ 
        profile: { ...state.profile, ...updates } 
      })),
    }),
    {
      name: 'pinkwire-profile-store',
      storage: createJSONStorage(() => createSyncStorage('profile')),
      version: 1,
    }
  )
);
