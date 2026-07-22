import React, { useState, useEffect } from 'react';
import { useDesktopStore } from '../store/useDesktopStore';
import { useSettingsStore } from '../store/useSettingsStore';
import { format } from 'date-fns';
import { User, Settings } from 'lucide-react';
import { useWindowStore } from '../store/useWindowStore';
import { useProfileStore } from '../services/profile/useProfileStore';
import { useAuthStore } from '../store/useAuthStore';
import { useSyncStore } from '../services/sync/useSyncStore';

export function StartMenuProfile({ onClose }: { onClose?: () => void }) {
  const [time, setTime] = useState(new Date());
  const wallpaper = useDesktopStore(state => state.wallpaper);
  const theme = useSettingsStore(state => state.theme);
  const { profile } = useProfileStore();
  const { isAuthenticated } = useAuthStore();
  const { status: syncStatus } = useSyncStore();
  const openWindow = useWindowStore(state => state.openWindow);

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const getGreeting = () => {
    const hour = time.getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 18) return 'Good afternoon';
    return 'Good evening';
  };

  const getWallpaperName = () => {
    if (wallpaper.includes('gradient')) return 'Gradient';
    if (wallpaper.includes('url')) return 'Custom Image';
    return 'Default';
  };

  return (
    <div className="flex items-center gap-4 bg-black/20 p-4 rounded-os border border-white/10 shadow-os shrink-0 relative overflow-hidden group">
      <div className="absolute inset-0 opacity-20 pointer-events-none transition-opacity group-hover:opacity-30" 
           style={{ background: 'linear-gradient(135deg, rgba(236,72,153,0.5) 0%, rgba(99,102,241,0.5) 100%)' }} />
      
      <div className="w-14 h-14 rounded-full bg-os-accent/20 flex items-center justify-center border-2 border-os-accent/30 shadow-[0_0_15px_rgba(236,72,153,0.3)] shrink-0 z-10">
        {isAuthenticated && profile.profilePicture ? <img src={profile.profilePicture} alt="Profile" className="w-full h-full object-cover rounded-full" /> : <User size={24} className="text-os-accent" />}
      </div>
      
      <div className="flex-1 min-w-0 z-10">
        <h2 className="text-xl font-medium text-os-text truncate leading-tight">
          {getGreeting()}, {isAuthenticated ? profile.displayName : 'Visitor'}
        </h2>
        <div className="text-xs text-os-text-muted mt-1 flex flex-wrap gap-x-3 gap-y-1">
          <span className="flex items-center gap-1">
            <span className={`w-1.5 h-1.5 rounded-full ${isAuthenticated ? 'bg-pink-400' : 'bg-gray-400'}`}></span>
            {isAuthenticated ? (syncStatus === 'synced' ? 'Synced' : syncStatus === 'syncing' ? 'Syncing...' : 'Online') : 'Local Mode'}
          </span>
          <span className="opacity-50">•</span>
          <span>{theme.charAt(0).toUpperCase() + theme.slice(1)} Theme</span>
          <span className="opacity-50">•</span>
          <span>{getWallpaperName()}</span>
        </div>
      </div>
      
      <button 
        onClick={() => {
          openWindow('settings');
          if (onClose) onClose();
        }}
        className="p-2.5 rounded-os hover:bg-white/10 transition-colors z-10 text-os-text-muted hover:text-os-text shrink-0 border border-transparent hover:border-white/5"
      >
        <Settings size={20} />
      </button>
    </div>
  );
}
