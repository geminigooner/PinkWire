import React, { useEffect, useRef } from 'react';
import { AppRegistry } from '../applications/registry';
import { useWindowStore } from '../store/useWindowStore';
import { useDesktopStore } from '../store/useDesktopStore';
import { Power, User } from 'lucide-react';
import { motion } from 'motion/react';

export function StartMenu({ onClose }: { onClose: () => void }) {
  const openWindow = useWindowStore(state => state.openWindow);
  const setHasBooted = useDesktopStore(state => state.setHasBooted);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        const target = e.target as HTMLElement;
        if (!target.closest('.start-button')) {
          onClose();
        }
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [onClose]);

  const handleShutdown = () => {
    // Reset boot state to show boot sequence again on next reload
    setHasBooted(false);
    window.location.reload();
  };

  return (
    <div className="absolute bottom-14 left-2 z-50 pointer-events-auto" ref={menuRef}>
      <motion.div 
        initial={{ opacity: 0, y: 10, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 10, scale: 0.95 }}
        transition={{ duration: 0.15 }}
        className="w-80 h-96 bg-os-taskbar-bg backdrop-blur-xl border border-os-window-border rounded-xl shadow-2xl flex flex-col overflow-hidden"
      >
        <div className="p-4 flex-1 overflow-y-auto scrollbar-hide">
          <div className="text-xs font-semibold text-os-text-muted mb-3 px-2">PINNED APPS</div>
          <div className="grid grid-cols-4 gap-2">
            {Object.values(AppRegistry).map((app) => (
              <button
                key={app.id}
                onClick={() => {
                  openWindow(app.id);
                  onClose();
                }}
                className="flex flex-col items-center gap-2 p-3 hover:bg-white/10 rounded-xl transition-colors group"
              >
                <div className="w-10 h-10 bg-os-titlebar-bg rounded-lg flex items-center justify-center shadow border border-os-window-border group-hover:border-os-accent/50 transition-colors">
                  <app.icon size={20} className="text-os-accent" />
                </div>
                <span className="text-[10px] text-os-text-muted group-hover:text-os-text transition-colors truncate w-full text-center">{app.name}</span>
              </button>
            ))}
          </div>
        </div>
        
        <div className="h-14 bg-black/20 border-t border-os-window-border flex items-center justify-between px-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-os-accent flex items-center justify-center shadow-[0_0_10px_rgba(236,72,153,0.5)]">
              <User size={16} className="text-white" />
            </div>
            <span className="text-sm font-medium text-os-text">Pookie</span>
          </div>
          <button onClick={handleShutdown} title="Shut down" className="p-2 hover:bg-white/10 rounded-lg transition-colors text-os-text-muted hover:text-red-400">
            <Power size={18} />
          </button>
        </div>
      </motion.div>
    </div>
  );
}
