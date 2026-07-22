import { SyncAdapter, SyncPayload } from './SyncAdapter';
import { useAuthStore } from '../../store/useAuthStore';

/**
 * ApiSyncAdapter communicating with our backend.
 */
export class CloudflareSyncAdapter implements SyncAdapter {
  name = 'api-sync';
  private isAuthenticated = false;
  
  async initialize(token?: string): Promise<void> {
    if (token) {
      this.isAuthenticated = true;
      console.log('[ApiSyncAdapter] Initialized with token.');
    }
    return Promise.resolve();
  }
  
  async push(payload: SyncPayload): Promise<void> {
    if (!this.isAuthenticated) {
      throw new Error('Not authenticated for cloud sync.');
    }
    
    console.log(`[ApiSyncAdapter] Pushing data for ${payload.storeName}...`);
    
    const token = useAuthStore.getState().token;
    
    const res = await fetch(`/api/sync/${payload.storeName}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(payload)
    });
    
    if (!res.ok) {
      throw new Error('Failed to push sync data');
    }
  }
  
  async pull(storeName: string): Promise<SyncPayload | null> {
    if (!this.isAuthenticated) {
      return null;
    }
    
    console.log(`[ApiSyncAdapter] Pulling data for ${storeName}...`);
    
    const token = useAuthStore.getState().token;
    
    try {
      const res = await fetch(`/api/sync/${storeName}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (res.ok) {
        return await res.json();
      }
      return null;
    } catch (e) {
      console.error(e);
      return null;
    }
  }
  
  async disconnect(): Promise<void> {
    this.isAuthenticated = false;
    console.log('[ApiSyncAdapter] Disconnected.');
    return Promise.resolve();
  }
}
