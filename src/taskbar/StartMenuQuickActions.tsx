import React from 'react';
import { useSettingsStore } from '../store/useSettingsStore';
import { useWindowStore } from '../store/useWindowStore';
import { Moon, Sun, Power, LogOut, Settings, Camera } from 'lucide-react';
import { cn } from '../utils/cn';
import { osEvents } from '../services/notifications/EventBus';

export function StartMenuQuickActions({ onClose }: { onClose: () => void }) {
  const atmosphere = useSettingsStore(state => state.atmosphere);
  const setAtmosphere = useSettingsStore(state => state.setAtmosphere);
  const openWindow = useWindowStore(state => state.openWindow);

  const toggleAtmosphere = () => {
    setAtmosphere(atmosphere === 'night' ? 'day' : 'night');
  };

  const handleAction = (action: () => void) => {
    action();
    onClose();
  };

  return (
    <div className="shrink-0 bg-black/20 p-3 rounded-2xl border border-white/5 grid grid-cols-4 gap-2">
      <button 
        onClick={() => handleAction(() => openWindow('settings'))}
        className="flex flex-col items-center justify-center h-[72px] rounded-xl hover:bg-white/10 transition-colors gap-1.5 text-os-text-muted hover:text-os-text"
      >
        <div className="p-2 bg-black/30 rounded-full shadow-inner border border-white/5">
          <Settings size={18} />
        </div>
        <span className="text-[10px] font-medium">Settings</span>
      </button>

      <button 
        onClick={toggleAtmosphere}
        className="flex flex-col items-center justify-center h-[72px] rounded-xl hover:bg-white/10 transition-colors gap-1.5 text-os-text-muted hover:text-os-text"
      >
        <div className="p-2 bg-black/30 rounded-full shadow-inner border border-white/5">
          {atmosphere === 'night' ? <Sun size={18} /> : <Moon size={18} />}
        </div>
        <span className="text-[10px] font-medium">Mode</span>
      </button>

      <button 
        onClick={() => {
          osEvents.publish({ type: 'PhotoDownloaded', payload: { filename: 'Screenshot-2026.png' } });
          onClose();
        }}
        className="flex flex-col items-center justify-center h-[72px] rounded-xl hover:bg-white/10 transition-colors gap-1.5 text-os-text-muted hover:text-os-text"
      >
        <div className="p-2 bg-black/30 rounded-full shadow-inner border border-white/5">
          <Camera size={18} />
        </div>
        <span className="text-[10px] font-medium">Snip</span>
      </button>

      <button 
        onClick={() => {
          // In a real app we'd sign out
          window.location.reload();
        }}
        className="flex flex-col items-center justify-center h-[72px] rounded-xl hover:bg-white/10 transition-colors gap-1.5 text-os-text-muted hover:text-red-400 group"
      >
        <div className="p-2 bg-black/30 rounded-full shadow-inner border border-white/5 group-hover:bg-red-500/20 group-hover:border-red-500/50 transition-colors">
          <Power size={18} />
        </div>
        <span className="text-[10px] font-medium">Power</span>
      </button>
    </div>
  );
}
