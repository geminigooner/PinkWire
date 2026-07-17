import React, { useState, useEffect } from 'react';
import { Wifi, Volume2, BatteryMedium, Moon, Sun } from 'lucide-react';
import { SyncIndicator } from '../components/sync/SyncIndicator';
import { useSettingsStore } from '../store/useSettingsStore';

export function SystemTray() {
  const [battery, setBattery] = useState(100);
  const atmosphere = useSettingsStore(state => state.atmosphere);

  useEffect(() => {
    if ('getBattery' in navigator) {
      (navigator as any).getBattery().then((b: any) => {
        setBattery(Math.floor(b.level * 100));
        b.addEventListener('levelchange', () => {
          setBattery(Math.floor(b.level * 100));
        });
      });
    }
  }, []);

  return (
    <div className="flex items-center gap-2 sm:gap-3 px-2 sm:px-3 h-9 text-os-text-muted hover:text-os-text hover:bg-white/10 rounded-os transition-colors cursor-pointer group">
      <SyncIndicator />
      <div className="flex items-center gap-1.5 opacity-70 group-hover:opacity-100 transition-opacity hidden sm:flex">
        <Wifi size={14} />
      </div>
      <div className="flex items-center gap-1.5 opacity-70 group-hover:opacity-100 transition-opacity hidden sm:flex">
        <Volume2 size={14} />
      </div>
      <div className="flex items-center gap-1.5 opacity-70 group-hover:opacity-100 transition-opacity text-[11px] font-medium tracking-wider">
        <BatteryMedium size={14} />
        <span className="hidden sm:inline">{battery}%</span>
      </div>
      <div className="w-px h-3 bg-white/20 mx-0.5 sm:mx-1 opacity-50 hidden sm:block" />
      <div className="flex items-center gap-1.5 opacity-70 group-hover:opacity-100 transition-opacity">
        {atmosphere === 'night' ? <Moon size={14} /> : <Sun size={14} />}
      </div>
    </div>
  );
}
