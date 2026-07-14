import React from 'react';
import { useDisposableStore } from '../../store/useDisposableStore';
import { ViewMode } from '../../types';
import { Search, Grid, LayoutGrid, Square, Film, Image as ImageIcon, Play, Menu } from 'lucide-react';
import { cn } from '../../../../utils/cn';

export function Toolbar() {
  const { searchQuery, setSearchQuery, viewMode, setViewMode, toggleSlideshow, slideshowActive, isSidebarOpen, setSidebarOpen } = useDisposableStore();

  const viewModes: { id: ViewMode; icon: any; label: string }[] = [
    { id: 'small', icon: Grid, label: 'Small' },
    { id: 'medium', icon: LayoutGrid, label: 'Medium' },
    { id: 'large', icon: Square, label: 'Large' },
    { id: 'polaroid', icon: ImageIcon, label: 'Polaroid' },
    { id: 'contact', icon: Film, label: 'Contact Sheet' },
  ];

  return (
    <div className="h-14 shrink-0 border-b border-os-window-border bg-os-titlebar-bg/70 px-4 flex items-center justify-between">
      <div className="flex items-center gap-2">
        <button
          onClick={() => setSidebarOpen(!isSidebarOpen)}
          className="md:hidden flex items-center gap-1.5 p-1.5 rounded-lg text-os-text-muted hover:text-os-text hover:bg-white/10 transition-colors"
        >
          <Menu size={20} />
        </button>
        <div className="relative">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-os-text-muted" />
          <input
            type="text"
            placeholder="Search photos..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-32 sm:w-48 bg-black/40 border border-os-window-border rounded-full pl-9 pr-4 py-1.5 text-xs text-os-text placeholder:text-os-text-muted focus:outline-none focus:border-os-accent/50 focus:ring-1 focus:ring-os-accent/50 transition-all"
          />
        </div>
      </div>

      <div className="flex items-center gap-2 sm:gap-4">
        <div className="hidden sm:flex items-center bg-black/40 border border-os-window-border rounded-lg p-1">
          {viewModes.map(mode => {
            const Icon = mode.icon;
            return (
              <button
                key={mode.id}
                onClick={() => setViewMode(mode.id)}
                title={mode.label}
                className={cn(
                  "p-1.5 rounded-md transition-colors",
                  viewMode === mode.id ? "bg-os-accent text-white shadow-sm" : "text-os-text-muted hover:text-os-text hover:bg-white/5"
                )}
              >
                <Icon size={14} />
              </button>
            );
          })}
        </div>
        <button 
          onClick={toggleSlideshow}
          className={cn(
            "flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors border",
            slideshowActive 
              ? "bg-os-accent border-os-accent text-white" 
              : "bg-black/40 border-os-window-border text-os-text hover:bg-white/10"
          )}
        >
          <Play size={12} fill={slideshowActive ? "currentColor" : "none"} />
          <span className="hidden sm:inline">Slideshow</span>
        </button>
      </div>
    </div>
  );
}
