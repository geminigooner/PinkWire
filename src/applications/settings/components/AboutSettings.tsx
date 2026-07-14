import React from 'react';
import { useSettingsStore } from '../../../store/useSettingsStore';
import { useDesktopStore } from '../../../store/useDesktopStore';
import { AppRegistry } from '../../registry';
import { Monitor, Cpu, HardDrive, User, Clock, Package } from 'lucide-react';

export function AboutSettings() {
  const { theme } = useSettingsStore();
  const { wallpaper } = useDesktopStore();
  
  const installedAppsCount = Object.keys(AppRegistry).length;

  return (
    <div className="p-8 max-w-4xl mx-auto space-y-12">
      <div className="text-center mb-12">
        <div className="w-24 h-24 mx-auto bg-gradient-to-tr from-os-accent to-purple-500 rounded-2xl shadow-xl flex items-center justify-center mb-6">
          <Monitor size={48} className="text-white drop-shadow-md" />
        </div>
        <h1 className="text-4xl font-light tracking-tight mb-2">PinkWire OS</h1>
        <p className="text-os-text-muted">Version 2.4.1 (Stable)</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        <div className="bg-black/20 border border-os-window-border rounded-xl p-6 backdrop-blur-sm shadow-inner">
          <h3 className="text-sm font-medium text-os-text-muted mb-4 uppercase tracking-wider flex items-center gap-2">
            <Cpu size={16} /> System Status
          </h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center border-b border-os-window-border pb-2">
              <span className="text-os-text-muted text-sm">Status</span>
              <span className="text-emerald-400 text-sm font-medium flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" /> Running
              </span>
            </div>
            <div className="flex justify-between items-center border-b border-os-window-border pb-2">
              <span className="text-os-text-muted text-sm">Uptime</span>
              <span className="text-os-text text-sm">942 days, 14 hours</span>
            </div>
            <div className="flex justify-between items-center border-b border-os-window-border pb-2">
              <span className="text-os-text-muted text-sm">Current User</span>
              <span className="text-os-text text-sm flex items-center gap-2"><User size={14} className="text-os-accent" /> Amanda</span>
            </div>
          </div>
        </div>

        <div className="bg-black/20 border border-os-window-border rounded-xl p-6 backdrop-blur-sm shadow-inner">
          <h3 className="text-sm font-medium text-os-text-muted mb-4 uppercase tracking-wider flex items-center gap-2">
            <Package size={16} /> Configuration
          </h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center border-b border-os-window-border pb-2">
              <span className="text-os-text-muted text-sm">Current Theme</span>
              <span className="text-os-text text-sm capitalize">{theme}</span>
            </div>
            <div className="flex justify-between items-center border-b border-os-window-border pb-2">
              <span className="text-os-text-muted text-sm">Wallpaper</span>
              <span className="text-os-text text-sm max-w-[150px] truncate">{wallpaper.startsWith('bg-') ? 'Gradient' : 'Custom Image'}</span>
            </div>
            <div className="flex justify-between items-center border-b border-os-window-border pb-2">
              <span className="text-os-text-muted text-sm">Installed Apps</span>
              <span className="text-os-text text-sm">{installedAppsCount} Applications</span>
            </div>
          </div>
        </div>
        
        <div className="md:col-span-2 bg-black/20 border border-os-window-border rounded-xl p-6 backdrop-blur-sm shadow-inner">
          <h3 className="text-sm font-medium text-os-text-muted mb-4 uppercase tracking-wider flex items-center gap-2">
            <HardDrive size={16} /> Storage
          </h3>
          <div className="space-y-3">
            <div className="flex justify-between text-sm mb-1">
              <span className="text-os-text">Local Storage</span>
              <span className="text-os-text-muted">4.2 MB / 10.0 MB</span>
            </div>
            <div className="w-full h-3 bg-black/40 rounded-full overflow-hidden border border-os-window-border/50">
              <div className="h-full bg-gradient-to-r from-os-accent to-purple-500 w-[42%]" />
            </div>
            <p className="text-xs text-os-text-muted mt-2 text-center">Your settings and personalization data are safely stored on this device.</p>
          </div>
        </div>

      </div>
    </div>
  );
}
