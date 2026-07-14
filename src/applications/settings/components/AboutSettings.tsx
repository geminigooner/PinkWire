import React, { useState, useEffect } from 'react';
import { useSettingsStore } from '../../../store/useSettingsStore';
import { useDesktopStore } from '../../../store/useDesktopStore';
import { AppRegistry } from '../../registry';
import { Monitor, Cpu, HardDrive, User, Package, Heart } from 'lucide-react';

export function AboutSettings() {
  const { theme } = useSettingsStore();
  const { wallpaper } = useDesktopStore();
  
  const installedAppsCount = Object.keys(AppRegistry).length;

  const [memoryUsage, setMemoryUsage] = useState(42);
  const [cpuUsage, setCpuUsage] = useState(12);

  useEffect(() => {
    const interval = setInterval(() => {
      setMemoryUsage(prev => Math.min(99, Math.max(20, prev + (Math.random() * 10 - 5))));
      setCpuUsage(prev => Math.min(100, Math.max(1, prev + (Math.random() * 20 - 10))));
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="p-4 sm:p-8 max-w-4xl mx-auto space-y-8 sm:space-y-12">
      <div className="text-center mb-12">
        <div className="w-24 h-24 mx-auto bg-gradient-to-tr from-os-accent to-purple-500 rounded-2xl shadow-xl flex items-center justify-center mb-6 cursor-help transition-transform hover:scale-105 active:scale-95" onDoubleClick={() => {
          import('../../../store/useAchievementStore').then(({ useAchievementStore }) => {
            useAchievementStore.getState().unlockAchievement('visited_three_days'); // Fun shortcut trigger
          }).catch(e => console.error(e));
        }}>
          <Monitor size={48} className="text-white drop-shadow-md" />
        </div>
        <h1 className="text-4xl font-light tracking-tight mb-2">PinkWire OS</h1>
        <p className="text-os-text-muted">Version 2.4.1 (Stable)</p>
        <p className="text-os-text-muted text-xs mt-1">Build 8492 • "Midnight Velvet"</p>
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
              <span className="text-os-text text-sm">1,402 days, 14 hours</span>
            </div>
            <div className="flex justify-between items-center border-b border-os-window-border pb-2">
              <span className="text-os-text-muted text-sm">CPU Usage (Simulated)</span>
              <span className="text-os-text text-sm">{Math.round(cpuUsage)}%</span>
            </div>
            <div className="flex justify-between items-center border-b border-os-window-border pb-2">
              <span className="text-os-text-muted text-sm">Memory Usage (Simulated)</span>
              <span className="text-os-text text-sm">{Math.round(memoryUsage)}% (1.2 GB)</span>
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
            <div className="flex justify-between items-center border-b border-os-window-border pb-2">
              <span className="text-os-text-muted text-sm">Developer</span>
              <span className="text-os-text text-sm flex items-center gap-2"><User size={14} className="text-os-accent" /> Amanda Danielle</span>
            </div>
          </div>
        </div>
        
        <div className="md:col-span-2 bg-black/20 border border-os-window-border rounded-xl p-6 backdrop-blur-sm shadow-inner text-center space-y-4">
          <h3 className="text-sm font-medium text-os-text-muted uppercase tracking-wider flex items-center justify-center gap-2">
            <Heart size={16} className="text-os-accent" /> Credits
          </h3>
          <p className="text-os-text text-sm leading-relaxed max-w-lg mx-auto">
            <strong>PinkWire OS</strong><br/>
            Designed and developed by Amanda Danielle. <br/><br/>
            <span className="text-os-text-muted">Built with curiosity, humor, late nights, and entirely too much pink.</span>
          </p>
        </div>
      </div>
    </div>
  );
}
