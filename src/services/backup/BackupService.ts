import { v4 as uuidv4 } from 'uuid';

export interface BackupMetadata {
  id: string;
  createdDate: string;
  version: string;
  description: string;
  type: 'manual' | 'auto';
  device: string;
  size: number;
  stores: string[];
  favorite?: boolean;
}

export interface BackupPayload {
  metadata: BackupMetadata;
  data: Record<string, string>;
}

const DB_NAME = 'PinkWireBackups';
const STORE_NAME = 'backups';
const DB_VERSION = 1;

export class BackupService {
  private static db: IDBDatabase | null = null;

  static async initDB(): Promise<IDBDatabase> {
    if (this.db) return this.db;
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(DB_NAME, DB_VERSION);
      request.onerror = () => reject(request.error);
      request.onsuccess = () => {
        this.db = request.result;
        resolve(this.db);
      };
      request.onupgradeneeded = (e: any) => {
        const db = e.target.result;
        if (!db.objectStoreNames.contains(STORE_NAME)) {
          db.createObjectStore(STORE_NAME, { keyPath: 'metadata.id' });
        }
      };
    });
  }

  static async saveBackup(payload: BackupPayload): Promise<void> {
    const db = await this.initDB();
    return new Promise((resolve, reject) => {
      const tx = db.transaction(STORE_NAME, 'readwrite');
      const store = tx.objectStore(STORE_NAME);
      const request = store.put(payload);
      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error);
    });
  }

  static async getBackup(id: string): Promise<BackupPayload | null> {
    const db = await this.initDB();
    return new Promise((resolve, reject) => {
      const tx = db.transaction(STORE_NAME, 'readonly');
      const store = tx.objectStore(STORE_NAME);
      const request = store.get(id);
      request.onsuccess = () => resolve(request.result || null);
      request.onerror = () => reject(request.error);
    });
  }

  static async getAllBackups(): Promise<BackupPayload[]> {
    const db = await this.initDB();
    return new Promise((resolve, reject) => {
      const tx = db.transaction(STORE_NAME, 'readonly');
      const store = tx.objectStore(STORE_NAME);
      const request = store.getAll();
      request.onsuccess = () => resolve(request.result || []);
      request.onerror = () => reject(request.error);
    });
  }

  static async deleteBackup(id: string): Promise<void> {
    const db = await this.initDB();
    return new Promise((resolve, reject) => {
      const tx = db.transaction(STORE_NAME, 'readwrite');
      const store = tx.objectStore(STORE_NAME);
      const request = store.delete(id);
      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error);
    });
  }
}

export const CORE_BACKUP_KEYS = [
  'pinkwire-desktop-store',
  'pinkwire-theme-store',
  'pinkwire-journal',
  'pinkwire-media-store',
  'pinkwire-settings-store',
  'pinkwire-profile-store',
  'pinkwire-guestbook-v2',
  'pinkwire-achievements',
  'pinkwire-audio-store',
  'pinkwire-notifications',
  'pinkwire-recent-store',
  'pinkwire-wallpaper-store',
  'pinkwire-window-store',
  'pinkwire-release-store'
];
