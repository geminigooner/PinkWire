import { SyncAdapter, SyncPayload } from './SyncAdapter';

/**
 * A mock adapter preparing for future Cloudflare KV/D1/Durable Objects backend.
 */
export class CloudflareSyncAdapter implements SyncAdapter {
  name = 'cloudflare';
  private isAuthenticated = false;
  
  async initialize(token?: string): Promise<void> {
    if (token) {
      this.isAuthenticated = true;
      console.log('[CloudflareSyncAdapter] Initialized with token.');
    }
    // In the future, establish WebSocket connection or check session here.
    return Promise.resolve();
  }
  
  async push(payload: SyncPayload): Promise<void> {
    if (!this.isAuthenticated) {
      throw new Error('Not authenticated for cloud sync.');
    }
    
    console.log(`[CloudflareSyncAdapter] Pushing data for ${payload.storeName}...`, payload);
    
    // Simulate network delay
    return new Promise((resolve) => setTimeout(resolve, 800));
  }
  
  async pull(storeName: string): Promise<SyncPayload | null> {
    if (!this.isAuthenticated) {
      return null;
    }
    
    console.log(`[CloudflareSyncAdapter] Pulling data for ${storeName}...`);
    
    // Simulate network delay
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(null); // Return null for now, meaning no remote data found
      }, 500);
    });
  }
  
  async disconnect(): Promise<void> {
    this.isAuthenticated = false;
    console.log('[CloudflareSyncAdapter] Disconnected.');
    return Promise.resolve();
  }
}
