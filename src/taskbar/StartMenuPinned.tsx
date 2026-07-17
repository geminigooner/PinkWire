import React, { useState } from 'react';
import { AppRegistry } from '../applications/registry';
import { useWindowStore } from '../store/useWindowStore';

// In a real app we'd persist pinned apps in a store. For now, hardcode the defaults based on design.
const DEFAULT_PINNED = ['pinkwire', 'journal', 'guestbook', 'browser', 'explorer', 'settings', 'release'];

export function StartMenuPinned({ onClose }: { onClose: () => void }) {
  const openWindow = useWindowStore(state => state.openWindow);
  // Optional: add reorder/pin state to useSettingsStore later
  const [pinnedApps] = useState(DEFAULT_PINNED);

  return (
    <div className="shrink-0">
      <h3 className="text-xs font-semibold text-os-text-muted px-2 mb-3 tracking-wider">PINNED</h3>
      <div className="grid grid-cols-4 sm:grid-cols-6 gap-2 sm:gap-4">
        {pinnedApps.map(appId => {
          const app = AppRegistry[appId];
          if (!app) return null;
          
          return (
            <button
              key={app.id}
              onClick={() => {
                openWindow(app.id);
                onClose();
              }}
              className="flex flex-col items-center gap-2 p-2 hover:bg-white/10 rounded-os transition-all group active:scale-95"
            >
              <div className="w-12 h-12 bg-black/30 rounded-os flex items-center justify-center shadow-os border border-white/10 group-hover:border-os-accent/50 group-hover:bg-black/40 transition-all relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <app.icon size={24} className="text-os-accent drop-shadow-os group-hover:scale-110 transition-transform duration-300" />
              </div>
              <span className="text-[11px] font-medium text-os-text-muted group-hover:text-os-text transition-colors truncate w-full text-center">
                {app.name}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
