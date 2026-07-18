import React, { useEffect, useState, useRef } from 'react';
import { useBackupStore } from '../../../services/backup/useBackupStore';
import { useAuthStore } from '../../../store/useAuthStore';
import { Database, Plus, RefreshCw, Upload, Download, Trash2, Heart, Clock, HardDrive, AlertTriangle } from 'lucide-react';
import { format } from 'date-fns';
import { ConfirmDialog } from '../../../components/ConfirmDialog';

export function BackupSettings() {
  const { backups, isBackingUp, isRestoring, loadBackups, createBackup, restoreBackup, deleteBackup, toggleFavorite, exportBackup, importBackup } = useBackupStore();
  const { isAuthenticated } = useAuthStore();
  const [description, setDescription] = useState('');
  const [showPreview, setShowPreview] = useState<string | null>(null);
  const [backupToDelete, setBackupToDelete] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    loadBackups();
  }, [loadBackups]);

  const handleCreate = async () => {
    await createBackup(description || 'Manual Backup', 'manual');
    setDescription('');
  };

  const handleImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      importBackup(file);
    }
  };

  const formatSize = (bytes: number) => {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  if (!isAuthenticated) {
    return (
      <div className="p-6 sm:p-8 flex flex-col items-center justify-center text-center h-full">
        <Database size={48} className="text-os-text-muted mb-4" />
        <h2 className="text-2xl font-light mb-2 text-os-text">Backup & Restore</h2>
        <p className="text-os-text-muted max-w-sm">
          You must be signed in as Administrator to manage system backups.
        </p>
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-8 max-w-3xl mx-auto space-y-6 sm:space-y-8 animate-in fade-in duration-300 pb-20">
      
      <div>
        <h2 className="text-xl sm:text-2xl font-light mb-1 text-os-text tracking-tight flex items-center gap-2">
          <Database size={24} className="text-os-accent" />
          Backup & Restore
        </h2>
        <p className="text-sm text-os-text-muted">Safeguard your operating system state, settings, and personal data.</p>
      </div>

      <div className="bg-black/20 p-4 sm:p-5 rounded-os border border-white/5 space-y-4">
        <h3 className="font-medium text-os-text">Create Backup</h3>
        <div className="flex flex-col sm:flex-row gap-3">
          <input 
            type="text" 
            placeholder="Backup description (e.g., Before theme change)"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="flex-1 bg-black/30 border border-os-window-border rounded-os px-3 py-2 text-sm outline-none focus:border-os-accent text-os-text"
          />
          <button 
            onClick={handleCreate}
            disabled={isBackingUp}
            className="flex items-center justify-center gap-2 bg-os-accent text-white px-4 py-2 rounded-os hover:bg-os-accent/90 transition-colors shadow-os font-medium disabled:opacity-50 text-sm whitespace-nowrap"
          >
            {isBackingUp ? <RefreshCw size={16} className="animate-spin" /> : <Plus size={16} />}
            Backup Now
          </button>
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-medium text-os-text flex items-center gap-2">
            <Clock size={18} className="text-os-text-muted" />
            Version History
          </h3>
          
          <div className="flex items-center gap-2">
            <input 
              type="file" 
              accept=".json"
              className="hidden" 
              ref={fileInputRef}
              onChange={handleImport}
            />
            <button 
              onClick={() => fileInputRef.current?.click()}
              className="flex items-center gap-1.5 text-xs font-medium text-os-text hover:bg-white/10 px-3 py-1.5 rounded-os transition-colors"
            >
              <Upload size={14} />
              Import
            </button>
          </div>
        </div>

        {backups.length === 0 ? (
          <div className="text-center py-12 bg-black/10 rounded-os border border-white/5">
            <HardDrive size={32} className="text-os-text-muted/50 mx-auto mb-3" />
            <p className="text-sm text-os-text-muted">No backups found.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {backups.map(backup => (
              <div key={backup.id} className="bg-black/10 rounded-os border border-white/5 overflow-hidden transition-colors hover:bg-white/5">
                <div className="p-4 flex flex-col sm:flex-row gap-4 sm:items-center justify-between">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-medium text-os-text truncate">{backup.description}</span>
                      {backup.type === 'auto' && <span className="text-[10px] uppercase tracking-wider bg-white/10 text-os-text-muted px-1.5 py-0.5 rounded">Auto</span>}
                      {backup.favorite && <Heart size={14} className="text-pink-500 fill-pink-500" />}
                    </div>
                    <div className="text-xs text-os-text-muted flex flex-wrap items-center gap-x-3 gap-y-1">
                      <span>{format(new Date(backup.createdDate), 'MMM d, yyyy h:mm a')}</span>
                      <span className="opacity-30">•</span>
                      <span>v{backup.version}</span>
                      <span className="opacity-30">•</span>
                      <span>{formatSize(backup.size)}</span>
                      <span className="opacity-30">•</span>
                      <span className="truncate max-w-[120px]" title={backup.device}>{backup.device}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-1 shrink-0">
                    <button 
                      onClick={() => toggleFavorite(backup.id)}
                      className="p-2 hover:bg-white/10 rounded-os text-os-text-muted hover:text-pink-500 transition-colors"
                      title={backup.favorite ? "Unfavorite" : "Favorite"}
                    >
                      <Heart size={16} className={backup.favorite ? "fill-pink-500 text-pink-500" : ""} />
                    </button>
                    <button 
                      onClick={() => exportBackup(backup.id)}
                      className="p-2 hover:bg-white/10 rounded-os text-os-text-muted hover:text-os-text transition-colors"
                      title="Export"
                    >
                      <Download size={16} />
                    </button>
                    <button 
                      onClick={() => setBackupToDelete(backup.id)}
                      className="p-2 hover:bg-white/10 rounded-os text-os-text-muted hover:text-red-400 transition-colors"
                      title="Delete"
                    >
                      <Trash2 size={16} />
                    </button>
                    <div className="w-px h-6 bg-white/10 mx-1"></div>
                    <button 
                      onClick={() => setShowPreview(showPreview === backup.id ? null : backup.id)}
                      className="px-3 py-1.5 hover:bg-white/10 rounded-os text-os-text-muted hover:text-os-text transition-colors text-xs font-medium"
                    >
                      {showPreview === backup.id ? 'Hide' : 'Restore...'}
                    </button>
                  </div>
                </div>

                {showPreview === backup.id && (
                  <div className="px-4 pb-4 pt-2 border-t border-white/5 bg-black/20 animate-in slide-in-from-top-2 duration-200">
                    <div className="flex items-start gap-3 p-3 bg-yellow-500/10 border border-yellow-500/20 rounded-os mb-4">
                      <AlertTriangle size={18} className="text-yellow-500 shrink-0 mt-0.5" />
                      <div className="text-xs text-yellow-200/70">
                        <p className="font-medium text-yellow-500 mb-0.5">Warning: Destructive Action</p>
                        Restoring this backup will overwrite your current system state. The system will reload immediately after restore.
                      </div>
                    </div>

                    <div className="mb-4">
                      <div className="text-xs font-medium text-os-text-muted mb-2">Contains data for:</div>
                      <div className="flex flex-wrap gap-1.5">
                        {backup.stores.map(store => (
                          <span key={store} className="text-[10px] bg-white/5 border border-white/10 px-2 py-1 rounded text-os-text-muted">
                            {store.replace('pinkwire-', '').replace('-store', '')}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    <div className="flex justify-end gap-2">
                      <button 
                        onClick={() => setShowPreview(null)}
                        className="px-4 py-2 hover:bg-white/5 rounded-os text-os-text-muted transition-colors text-sm font-medium"
                      >
                        Cancel
                      </button>
                      <button 
                        onClick={() => restoreBackup(backup.id)}
                        disabled={isRestoring}
                        className="flex items-center gap-2 bg-red-500 text-white px-4 py-2 rounded-os hover:bg-red-600 transition-colors shadow-os font-medium disabled:opacity-50 text-sm"
                      >
                        {isRestoring ? <RefreshCw size={16} className="animate-spin" /> : <RefreshCw size={16} />}
                        Restore System State
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      <ConfirmDialog
        isOpen={!!backupToDelete}
        title="Delete Backup"
        message="Are you sure you want to delete this backup? It cannot be recovered."
        confirmText="Delete Backup"
        onConfirm={() => {
          if (backupToDelete) deleteBackup(backupToDelete);
        }}
        onCancel={() => setBackupToDelete(null)}
      />

    </div>
  );
}
