import React from 'react';
import { useBrowserStore } from '../../store/useBrowserStore';
import { X, Plus, Globe } from 'lucide-react';
import { cn } from '../../../../utils/cn';

export function TabBar() {
  const { tabs, activeTabId, setActiveTab, closeTab, createTab } = useBrowserStore();

  return (
    <div className="flex items-center h-10 bg-os-titlebar-bg/90 border-b border-os-window-border px-2 gap-1 overflow-x-auto scrollbar-hide pt-1">
      {tabs.map(tab => {
        const isActive = tab.id === activeTabId;
        return (
          <div
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={cn(
              "group relative flex items-center min-w-[120px] max-w-[200px] h-full px-3 rounded-t-lg transition-all cursor-default select-none border border-b-0 border-os-window-border",
              isActive 
                ? "bg-os-window-bg text-os-text" 
                : "bg-transparent text-os-text-muted hover:bg-white/5"
            )}
          >
            {/* Active tab overlay line */}
            {isActive && <div className="absolute top-0 left-0 right-0 h-0.5 bg-os-accent rounded-t-lg" />}
            
            <Globe size={14} className={cn("shrink-0 mr-2", isActive ? "text-os-accent" : "text-os-text-muted")} />
            <span className="truncate text-xs flex-1">{tab.title || 'New Tab'}</span>
            
            <button
              onClick={(e) => { e.stopPropagation(); closeTab(tab.id); }}
              className="shrink-0 p-1 rounded-os opacity-0 group-hover:opacity-100 hover:bg-white/20 transition-all ml-1"
            >
              <X size={12} />
            </button>
          </div>
        );
      })}
      
      <button
        onClick={() => createTab()}
        className="shrink-0 p-1.5 ml-1 rounded-os text-os-text-muted hover:text-os-text hover:bg-white/10 transition-colors"
      >
        <Plus size={16} />
      </button>
    </div>
  );
}
