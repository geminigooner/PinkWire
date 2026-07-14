import React from 'react';
import { useBrowserStore } from '../../store/useBrowserStore';

export function StatusBar() {
  const { tabs, activeTabId } = useBrowserStore();
  const activeTab = tabs.find(t => t.id === activeTabId);

  return (
    <div className="h-6 shrink-0 bg-os-titlebar-bg/90 border-t border-os-window-border px-4 flex items-center justify-between text-[11px] text-os-text-muted select-none">
      <div className="flex items-center gap-4 truncate">
        {activeTab?.isLoading ? (
          <span>Waiting for {new URL(activeTab.url.startsWith('http') ? activeTab.url : 'http://localhost').hostname}...</span>
        ) : (
          <span className="truncate max-w-[200px] sm:max-w-[400px]">Done</span>
        )}
      </div>
      <div className="flex items-center gap-4 shrink-0">
        <span>Internet ExplAmanda</span>
      </div>
    </div>
  );
}
