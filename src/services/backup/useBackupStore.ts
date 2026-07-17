import { create } from 'zustand';
import { BackupMetadata, BackupPayload, BackupService, CORE_BACKUP_KEYS } from './BackupService';
import { v4 as uuidv4 } from 'uuid';
import { osEvents } from '../notifications/EventBus';

interface BackupStore {
  backups: BackupMetadata[];
  isBackingUp: boolean;
  isRestoring: boolean;
  
  loadBackups: () => Promise<void>;
  createBackup: (description: string, type: 'manual' | 'auto') => Promise<void>;
  restoreBackup: (id: string, specificStores?: string[]) => Promise<void>;
  deleteBackup: (id: string) => Promise<void>;
  toggleFavorite: (id: string) => Promise<void>;
  
  exportBackup: (id: string) => Promise<void>;
  importBackup: (file: File) => Promise<void>;
}

export const useBackupStore = create<BackupStore>((set, get) => ({
  backups: [],
  isBackingUp: false,
  isRestoring: false,

  loadBackups: async () => {
    try {
      const fullBackups = await BackupService.getAllBackups();
      const metadata = fullBackups.map(b => b.metadata).sort((a, b) => 
        new Date(b.createdDate).getTime() - new Date(a.createdDate).getTime()
      );
      set({ backups: metadata });
    } catch (e) {
      console.error('Failed to load backups', e);
    }
  },

  createBackup: async (description, type) => {
    set({ isBackingUp: true });
    try {
      const data: Record<string, string> = {};
      const stores: string[] = [];
      let size = 0;

      for (const key of CORE_BACKUP_KEYS) {
        const value = localStorage.getItem(key);
        if (value) {
          data[key] = value;
          stores.push(key);
          size += new Blob([value]).size;
        }
      }

      const metadata: BackupMetadata = {
        id: uuidv4(),
        createdDate: new Date().toISOString(),
        version: '1.0.0', 
        description,
        type,
        device: navigator.userAgent.substring(0, 50),
        size,
        stores,
        favorite: false
      };

      const payload: BackupPayload = { metadata, data };
      await BackupService.saveBackup(payload);
      
      osEvents.publish({ type: 'Toast', payload: { message: 'Backup created successfully.' } });
      await get().loadBackups();
    } catch (error) {
      console.error('Backup failed:', error);
      osEvents.publish({ type: 'SystemMessage', payload: { title: 'Backup Failed', message: 'Could not create backup.' } });
    } finally {
      set({ isBackingUp: false });
    }
  },

  restoreBackup: async (id, specificStores) => {
    set({ isRestoring: true });
    try {
      const backup = await BackupService.getBackup(id);
      if (!backup) throw new Error('Backup not found');

      const storesToRestore = specificStores || backup.metadata.stores;

      for (const store of storesToRestore) {
        if (backup.data[store]) {
          localStorage.setItem(store, backup.data[store]);
        }
      }

      osEvents.publish({ type: 'Toast', payload: { message: 'Restore complete. Reloading system...' } });
      
      setTimeout(() => {
        window.location.reload();
      }, 1500);

    } catch (error) {
      console.error('Restore failed:', error);
      osEvents.publish({ type: 'SystemMessage', payload: { title: 'Restore Failed', message: 'Could not restore backup.' } });
      set({ isRestoring: false });
    }
  },

  deleteBackup: async (id) => {
    await BackupService.deleteBackup(id);
    await get().loadBackups();
  },
  
  toggleFavorite: async (id) => {
    const backup = await BackupService.getBackup(id);
    if (backup) {
      backup.metadata.favorite = !backup.metadata.favorite;
      await BackupService.saveBackup(backup);
      await get().loadBackups();
    }
  },

  exportBackup: async (id) => {
    const backup = await BackupService.getBackup(id);
    if (!backup) return;

    const json = JSON.stringify(backup, null, 2);
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `pinkwire-backup-${new Date(backup.metadata.createdDate).toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  },

  importBackup: async (file) => {
    set({ isBackingUp: true });
    try {
      const text = await file.text();
      const backup: BackupPayload = JSON.parse(text);
      
      if (!backup.metadata || !backup.data || !backup.metadata.id) {
        throw new Error('Invalid backup file');
      }

      await BackupService.saveBackup(backup);
      osEvents.publish({ type: 'Toast', payload: { message: 'Backup imported successfully.' } });
      await get().loadBackups();
    } catch (error) {
      console.error('Import failed', error);
      osEvents.publish({ type: 'SystemMessage', payload: { title: 'Import Failed', message: 'Invalid backup file.' } });
    } finally {
      set({ isBackingUp: false });
    }
  }
}));
