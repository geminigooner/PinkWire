import React, { useState } from 'react';
import { Clock } from './Clock';
import { StartMenu } from './StartMenu';
import { useWindowStore } from '../store/useWindowStore';
import { AppRegistry } from '../applications/registry';
import { cn } from '../utils/cn';
import { Command, Wifi, Volume2, BatteryMedium } from 'lucide-react';
import { AnimatePresence } from 'motion/react';

export function Taskbar() {
  const [isStartMenuOpen, setIsStartMenuOpen] = useState(false);
  const { windows, focusedWindowId, focusWindow, restoreWindow, minimizeWindow } = useWindowStore();

  return (
    <>
      <div className="absolute bottom-0 left-0 right-0 h-12 bg-os-taskbar-bg backdrop-blur-xl border-t border-os-window-border flex items-center px-2 z-50 pointer-events-auto shadow-[0_-4px_20px_rgba(0,0,0,0.5)]">
        <button 
          onClick={() => setIsStartMenuOpen(!isStartMenuOpen)}
          className={cn(
            "start-button h-9 px-3 rounded-lg flex items-center justify-center transition-colors",
            isStartMenuOpen ? "bg-os-accent/20 text-os-accent" : "hover:bg-white/10 text-os-text"
          )}
        >
          <Command size={20} />
        </button>

        <div className="w-px h-6 bg-os-window-border mx-2" />

        <div className="flex-1 flex items-center gap-1 overflow-x-auto px-2 scrollbar-hide">
          {windows.map(w => {
            const app = AppRegistry[w.appId];
            if (!app) return null;
            const Icon = app.icon;
            const isFocused = focusedWindowId === w.id && !w.isMinimized;
            
            return (
              <button
                key={w.id}
                onClick={() => {
                  if (w.isMinimized) {
                    restoreWindow(w.id);
                    focusWindow(w.id);
                  } else if (isFocused) {
                    minimizeWindow(w.id);
                  } else {
                    restoreWindow(w.id);
                    focusWindow(w.id);
                  }
                }}
                className={cn(
                  "h-9 px-3 rounded-lg flex items-center gap-2 max-w-[160px] transition-all",
                  isFocused 
                    ? "bg-os-titlebar-bg text-os-text shadow-inner border border-os-window-border" 
                    : "hover:bg-white/10 text-os-text-muted"
                )}
              >
                {Icon && <Icon size={16} className={isFocused ? "text-os-accent" : ""} />}
                <span className="text-sm truncate">{w.title}</span>
              </button>
            )
          })}
        </div>

        <div className="flex items-center gap-1 h-full px-2">
          {/* System Tray Placeholder */}
          <div className="hidden sm:flex items-center gap-2 px-3 h-9 text-os-text-muted hover:text-os-text hover:bg-white/10 rounded-lg transition-colors cursor-pointer">
            <Wifi size={16} />
            <Volume2 size={16} />
            <BatteryMedium size={16} />
          </div>
          
          <div className="px-3 h-9 flex items-center text-sm font-medium text-os-text hover:bg-white/10 rounded-lg transition-colors cursor-default">
            <Clock />
          </div>
        </div>
      </div>
      
      <AnimatePresence>
        {isStartMenuOpen && (
          <StartMenu onClose={() => setIsStartMenuOpen(false)} />
        )}
      </AnimatePresence>
    </>
  );
}
