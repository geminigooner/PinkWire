import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { createSyncStorage } from '../../../services/sync/syncStorage';
import { v4 as uuidv4 } from 'uuid';
import { osEvents } from '../../../services/notifications/EventBus';

export interface ReleaseNote {
  id: string;
  version: string;
  date: string;
  summary: string;
  notes: string;
  status: 'draft' | 'published' | 'rolled-back';
  type: 'major' | 'minor' | 'patch' | 'pre-release';
}

interface ReleaseStore {
  currentVersion: string;
  releases: ReleaseNote[];
  draftRelease: Partial<ReleaseNote> | null;
  rollbackArchitectureReady: boolean;

  setCurrentVersion: (v: string) => void;
  createDraft: (type: ReleaseNote['type'], version: string) => void;
  updateDraft: (updates: Partial<ReleaseNote>) => void;
  publishRelease: () => void;
  deleteDraft: () => void;
}

export const useReleaseStore = create<ReleaseStore>()(
  persist(
    (set, get) => ({
      currentVersion: '1.0.0',
      releases: [
        {
          id: 'initial-release',
          version: '1.0.0',
          date: new Date().toISOString(),
          summary: 'Initial System Boot',
          notes: 'Welcome to PinkWire OS.',
          status: 'published',
          type: 'major'
        }
      ],
      draftRelease: null,
      rollbackArchitectureReady: true,

      setCurrentVersion: (v) => set({ currentVersion: v }),
      
      createDraft: (type, version) => set({
        draftRelease: {
          id: uuidv4(),
          type,
          version,
          summary: '',
          notes: '',
          status: 'draft',
          date: new Date().toISOString()
        }
      }),

      updateDraft: (updates) => set((state) => ({
        draftRelease: state.draftRelease ? { ...state.draftRelease, ...updates } : null
      })),

      publishRelease: () => set((state) => {
        if (!state.draftRelease) return state;
        const newRelease = { 
          ...state.draftRelease, 
          status: 'published',
          date: new Date().toISOString()
        } as ReleaseNote;
        
        osEvents.publish({ type: 'Toast', payload: { message: `Successfully published v${newRelease.version}` } });
        
        return {
          currentVersion: newRelease.version,
          releases: [newRelease, ...state.releases],
          draftRelease: null
        };
      }),

      deleteDraft: () => set({ draftRelease: null }),
    }),
    {
      name: 'pinkwire-release-store',
      storage: createJSONStorage(() => createSyncStorage('release')),
      version: 1,
    }
  )
);
