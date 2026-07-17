import { create } from 'zustand';
import { SyncAdapter, SyncPayload } from './SyncAdapter';
import { CloudflareSyncAdapter } from './CloudflareSyncAdapter';

export type SyncStatus = 'offline' | 'synced' | 'syncing' | 'waiting' | 'error';

interface SyncQueueItem {
  id: string;
  payload: SyncPayload;
}

interface SyncStore {
  status: SyncStatus;
  lastSyncTime: number | null;
  adapter: SyncAdapter;
  queue: SyncQueueItem[];
  error: string | null;
  
  // Actions
  setStatus: (status: SyncStatus) => void;
  initialize: (token: string) => Promise<void>;
  disconnect: () => Promise<void>;
  
  // Sync Operations
  queueSync: (storeName: string, data: any) => void;
  processQueue: () => Promise<void>;
  triggerManualSync: () => Promise<void>;
}

export const useSyncStore = create<SyncStore>((set, get) => ({
  status: 'offline', // Default to offline until initialized
  lastSyncTime: null,
  adapter: new CloudflareSyncAdapter(),
  queue: [],
  error: null,
  
  setStatus: (status) => set({ status }),
  
  initialize: async (token: string) => {
    const { adapter } = get();
    try {
      set({ status: 'waiting', error: null });
      await adapter.initialize(token);
      set({ status: 'synced', lastSyncTime: Date.now() });
      
      // Process any queued items that were accumulated while offline
      get().processQueue();
    } catch (error: any) {
      set({ status: 'error', error: error.message || 'Failed to initialize sync.' });
    }
  },
  
  disconnect: async () => {
    const { adapter } = get();
    await adapter.disconnect();
    set({ status: 'offline', lastSyncTime: null, queue: [] });
  },
  
  queueSync: (storeName: string, data: any) => {
    const status = get().status;
    
    // Only administrators sync data. If we're fully offline and not initialized, we just don't queue.
    // However, if we're authenticated but temporarily disconnected (waiting/error), we should queue.
    // Let's assume queueSync is only called if auth allows it.
    
    const payload: SyncPayload = {
      storeName,
      data,
      timestamp: Date.now()
    };
    
    const item: SyncQueueItem = {
      id: `${storeName}-${Date.now()}`,
      payload
    };
    
    set((state) => {
      // Remove any pending queue items for the same store to avoid redundant syncs
      const filteredQueue = state.queue.filter(q => q.payload.storeName !== storeName);
      return { 
        queue: [...filteredQueue, item],
        status: state.status === 'synced' ? 'waiting' : state.status
      };
    });
    
    // Debounce the processing slightly
    setTimeout(() => {
      get().processQueue();
    }, 1000);
  },
  
  processQueue: async () => {
    const state = get();
    
    if (state.status === 'offline' || state.status === 'syncing' || state.queue.length === 0) {
      return;
    }
    
    try {
      set({ status: 'syncing', error: null });
      
      // Process one by one (could be parallelized, but sequential is safer for now)
      const currentQueue = [...state.queue];
      
      for (const item of currentQueue) {
        await state.adapter.push(item.payload);
        
        // Remove from queue after successful push
        set((s) => ({
          queue: s.queue.filter(q => q.id !== item.id)
        }));
      }
      
      set({ status: 'synced', lastSyncTime: Date.now() });
    } catch (error: any) {
      console.error('[SyncStore] Sync failed:', error);
      set({ status: 'error', error: error.message || 'Sync failed. Retrying later.' });
      
      // Retry logic could be implemented here via setTimeout
    }
  },
  
  triggerManualSync: async () => {
    const state = get();
    if (state.status === 'offline') return;
    
    await get().processQueue();
  }
}));
