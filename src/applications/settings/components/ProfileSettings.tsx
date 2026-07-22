import React, { useState, useRef } from 'react';
import { useProfileStore } from '../../../services/profile/useProfileStore';
import { useAuthStore } from '../../../store/useAuthStore';
import { useSyncStore } from '../../../services/sync/useSyncStore';
import { useWindowStore } from '../../../store/useWindowStore';
import { Cloud, LogOut, LogIn, User, RefreshCw, CheckCircle2, CloudOff, X, Check, UploadCloud, Loader2 } from 'lucide-react';
import { format } from 'date-fns';

export function ProfileSettings() {
  const { profile, updateProfile } = useProfileStore();
  const { isAuthenticated, setAuth, logout } = useAuthStore();
  const { status, lastSyncTime, triggerManualSync } = useSyncStore();
  const [isEditingPicture, setIsEditingPicture] = useState(false);
  const [tempPictureUrl, setTempPictureUrl] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handlePictureEditClick = () => {
    setTempPictureUrl(profile.profilePicture || '');
    setIsEditingPicture(true);
  };

  const savePictureUrl = () => {
    updateProfile({ profilePicture: tempPictureUrl });
    setIsEditingPicture(false);
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    const formData = new FormData();
    formData.append('file', file);

    try {
      const token = useAuthStore.getState().token || '';
      const res = await fetch('/api/upload', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formData
      });

      if (res.ok) {
        const data = await res.json();
        updateProfile({ profilePicture: data.url });
        setIsEditingPicture(false);
      } else {
        console.error("Upload failed", await res.text());
      }
    } catch (error) {
      console.error("Upload failed", error);
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const handleLogin = () => {
    useWindowStore.getState().openWindow('admin');
  };

  if (!isAuthenticated) {
    return (
      <div className="p-6 sm:p-8 max-w-2xl mx-auto h-full flex flex-col items-center justify-center text-center">
        <div className="w-24 h-24 rounded-full bg-os-window-border/50 flex items-center justify-center mb-6">
          <User size={48} className="text-os-text-muted" />
        </div>
        <h2 className="text-2xl font-light mb-2 text-os-text">Local Visitor Mode</h2>
        <p className="text-os-text-muted mb-8 max-w-sm">
          You are currently using PinkWire as a visitor. Your settings and files will only be saved locally on this device.
        </p>
        <button 
          onClick={handleLogin}
          className="flex items-center gap-2 bg-os-accent text-white px-6 py-3 rounded-os hover:bg-os-accent/90 transition-colors shadow-os font-medium"
        >
          <LogIn size={18} />
          Sign in as Administrator
        </button>
      </div>
    );
  }

  return (
    <div className="p-6 sm:p-8 max-w-2xl mx-auto space-y-8 animate-in fade-in duration-300">
      
      <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 bg-black/20 p-6 rounded-os border border-white/5">
        <div className="relative group">
          {isEditingPicture ? (
            <div className="flex flex-col gap-2 p-2 bg-black/40 rounded-os border border-os-accent/30 z-10 w-48 shadow-lg shrink-0">
              <input 
                type="text" 
                value={tempPictureUrl} 
                onChange={(e) => setTempPictureUrl(e.target.value)} 
                placeholder="Image URL..." 
                className="w-full bg-black/50 text-xs px-2 py-1.5 rounded border border-white/10 outline-none focus:border-os-accent"
                autoFocus
              />
              <div className="flex items-center justify-between gap-1">
                <button 
                  onClick={() => fileInputRef.current?.click()}
                  disabled={isUploading}
                  className="flex items-center gap-1.5 px-2 py-1 rounded bg-white/5 hover:bg-white/10 text-xs text-os-text-muted transition-colors disabled:opacity-50"
                  title="Upload from computer"
                >
                  {isUploading ? <Loader2 size={12} className="animate-spin" /> : <UploadCloud size={12} />}
                  Upload
                </button>
                <div className="flex gap-1">
                  <button onClick={() => setIsEditingPicture(false)} className="p-1 rounded bg-white/5 hover:bg-white/10 text-os-text-muted transition-colors"><X size={14} /></button>
                  <button onClick={savePictureUrl} className="p-1 rounded bg-os-accent text-white hover:bg-os-accent/90 transition-colors"><Check size={14} /></button>
                </div>
              </div>
              <input 
                type="file"
                ref={fileInputRef}
                onChange={handleFileUpload}
                accept="image/*"
                className="hidden"
              />
            </div>
          ) : (
            <>
              <img 
                src={profile.profilePicture} 
                alt="Profile" 
                className="w-24 h-24 rounded-full object-cover border-2 border-os-accent/50 shrink-0"
              />
              <div onClick={handlePictureEditClick} className="absolute inset-0 bg-black/50 rounded-full opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity cursor-pointer">
                <span className="text-xs font-medium text-white">Edit</span>
              </div>
            </>
          )}
        </div>
        
        <div className="flex-1 text-center sm:text-left">
          <input 
            type="text" 
            value={profile.displayName}
            onChange={(e) => updateProfile({ displayName: e.target.value })}
            className="bg-transparent text-2xl font-medium text-os-text border-b border-transparent hover:border-white/20 focus:border-os-accent outline-none transition-colors px-1 mb-1 text-center sm:text-left w-full sm:w-auto"
          />
          <textarea 
            value={profile.biography}
            onChange={(e) => updateProfile({ biography: e.target.value })}
            className="bg-transparent text-sm text-os-text-muted border border-transparent hover:border-white/10 focus:border-os-accent outline-none rounded transition-colors p-1 w-full resize-none min-h-[60px]"
          />
        </div>
        
        <button 
          onClick={logout}
          className="flex items-center gap-2 text-red-400 hover:text-red-300 hover:bg-red-400/10 px-4 py-2 rounded-os transition-colors text-sm font-medium shrink-0"
        >
          <LogOut size={16} />
          Sign Out
        </button>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-medium text-os-text border-b border-os-window-border pb-2 flex items-center gap-2">
          <Cloud size={18} className="text-os-accent" />
          Cloud Synchronization
        </h3>
        
        <div className="bg-black/10 p-5 rounded-os border border-white/5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="font-medium text-os-text">Sync Status:</span>
              {status === 'synced' && <span className="flex items-center gap-1.5 text-green-400 text-sm bg-green-400/10 px-2 py-0.5 rounded"><CheckCircle2 size={14} /> Synced</span>}
              {status === 'syncing' && <span className="flex items-center gap-1.5 text-os-accent text-sm bg-os-accent/10 px-2 py-0.5 rounded"><RefreshCw size={14} className="animate-spin" /> Syncing...</span>}
              {status === 'waiting' && <span className="flex items-center gap-1.5 text-yellow-400 text-sm bg-yellow-400/10 px-2 py-0.5 rounded">Waiting...</span>}
              {status === 'offline' && <span className="flex items-center gap-1.5 text-os-text-muted text-sm bg-white/5 px-2 py-0.5 rounded"><CloudOff size={14} /> Offline</span>}
            </div>
            <p className="text-xs text-os-text-muted">
              Last synced: {lastSyncTime ? format(lastSyncTime, 'PP pp') : 'Never'}
            </p>
          </div>
          
          <button 
            onClick={() => triggerManualSync()}
            disabled={status === 'syncing' || status === 'offline'}
            className="flex items-center gap-2 bg-white/5 hover:bg-white/10 disabled:opacity-50 text-os-text px-4 py-2 rounded-os transition-colors text-sm"
          >
            <RefreshCw size={16} className={status === 'syncing' ? 'animate-spin' : ''} />
            Force Sync
          </button>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-medium text-os-text border-b border-os-window-border pb-2 flex items-center gap-2">
          <User size={18} className="text-os-accent" />
          Preferences
        </h3>
        
        <div className="space-y-3">
          <label className="flex items-center justify-between p-3 bg-black/10 rounded-os border border-white/5 hover:bg-white/5 transition-colors cursor-pointer">
            <div>
              <div className="font-medium">System Layout</div>
              <div className="text-xs text-os-text-muted">Preferred density of system elements</div>
            </div>
            <select 
              value={profile.preferredLayout}
              onChange={(e) => updateProfile({ preferredLayout: e.target.value as any })}
              className="bg-os-titlebar-bg border border-os-window-border rounded px-3 py-1.5 text-sm outline-none focus:border-os-accent"
            >
              <option value="standard">Standard</option>
              <option value="compact">Compact</option>
              <option value="relaxed">Relaxed</option>
            </select>
          </label>
        </div>
      </div>

    </div>
  );
}
