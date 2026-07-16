import React, { useState } from 'react';
import { Clock } from './Clock';
import { StartMenu } from './StartMenu';
import { useWindowStore } from '../store/useWindowStore';
import { useAuthStore } from '../store/useAuthStore';
import { AppRegistry } from '../applications/registry';
import { cn } from '../utils/cn';
import { Command } from 'lucide-react';
import { AnimatePresence } from 'motion/react';
import { NowPlayingWidget } from './NowPlayingWidget';
import { NotificationCenter } from './NotificationCenter';
import { SystemTray } from './SystemTray';

export function Taskbar() {
  const [isStartMenuOpen, setIsStartMenuOpen] = useState(false);
  const { windows, focusedWindowId, focusWindow, restoreWindow, minimizeWindow } = useWindowStore();

  return (
    <>
      <div className="absolute bottom-0 left-0 right-0 h-12 bg-os-taskbar-bg backdrop-blur-os-os-os border-t border-os-window-border flex items-center px-2 z-50 pointer-events-auto shadow-[0_-4px_20px_rgba(0,0,0,0.5)]">
        <button 
          aria-label="Start Menu"
          onClick={() => setIsStartMenuOpen(!isStartMenuOpen)}
          onDoubleClick={() => {
            import('../store/useAchievementStore').then(({ useAchievementStore }) => {
              useAchievementStore.getState().unlockAchievement('secret_shortcut_logo' as any);
              import('../store/useDesktopStore').then(({ useDesktopStore }) => {
                useDesktopStore.getState().addSticker({ type: '💖', x: window.innerWidth / 2 - 50, y: window.innerHeight / 2 - 50, rotation: 0, scale: 2 });
              });
            }).catch(e => console.error(e));
          }}
          className={cn(
            "start-button h-9 px-3 rounded-os flex items-center justify-center transition-colors",
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
                  "h-9 px-3 rounded-os flex items-center gap-2 max-w-[160px] transition-all",
                  isFocused 
                    ? "bg-os-titlebar-bg text-os-text shadow-os border border-os-window-border" 
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
          <NowPlayingWidget />
          
          <SystemTray />
          
          <NotificationCenter />
          
          <div className="px-3 h-9 flex items-center text-sm font-medium text-os-text hover:bg-white/10 rounded-os transition-colors cursor-default" onClick={() => useWindowStore.getState().openWindow('admin')} onDoubleClick={() => {
            import('../store/useAchievementStore').then(({ useAchievementStore }) => {
              useAchievementStore.getState().unlockAchievement('secret_shortcut_clock' as any);
              // Create time travel effect logic? For now just unlock achievement and notify
              import('../services/notifications/EventBus').then(({ osEvents }) => {
                osEvents.publish({ type: 'Toast', payload: { message: "Whoa, did time just skip a beat?" } });
              });
            }).catch(e => console.error(e));
          }}>
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
