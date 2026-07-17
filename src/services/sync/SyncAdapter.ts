export interface SyncPayload {
  storeName: string;
  data: any;
  timestamp: number;
}

export interface SyncAdapter {
  name: string;
  
  /**
   * Initializes the sync adapter with authentication tokens if needed.
   */
  initialize(token?: string): Promise<void>;
  
  /**
   * Pushes a payload to the remote storage.
   */
  push(payload: SyncPayload): Promise<void>;
  
  /**
   * Pulls the latest payload from the remote storage for a given store.
   */
  pull(storeName: string): Promise<SyncPayload | null>;
  
  /**
   * Disconnects the adapter.
   */
  disconnect(): Promise<void>;
}
