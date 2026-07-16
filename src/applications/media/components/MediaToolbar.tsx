import React from 'react';
import { useMediaStore } from '../store/useMediaStore';
import { useAuthStore } from '../../../store/useAuthStore';
import { Menu, Search, Grid, List, Upload } from 'lucide-react';
import { cn } from '../../../utils/cn';

interface Props {
  onToggleSidebar: () => void;
  onUploadClick: () => void;
}

export function MediaToolbar({ onToggleSidebar, onUploadClick }: Props) {
  const { searchQuery, setSearchQuery, viewMode, setViewMode } = useMediaStore();
  const { isAuthenticated } = useAuthStore();

  return (
    <div className="h-14 shrink-0 border-b border-os-window-border bg-os-titlebar-bg/70 px-2 sm:px-4 flex items-center justify-between gap-4">
      <div className="flex items-center gap-2">
        <button
          onClick={onToggleSidebar}
          className="md:hidden flex items-center justify-center p-1.5 rounded-lg text-os-text-muted hover:text-os-text hover:bg-white/10 transition-colors"
        >
          <Menu size={18} />
        </button>
        
        {isAuthenticated && (
          <button 
            onClick={onUploadClick}
            className="flex items-center gap-2 px-3 py-1.5 bg-os-accent text-white rounded-lg text-sm font-medium hover:bg-os-accent/90 transition-colors shadow-sm"
          >
            <Upload size={16} />
            <span className="hidden sm:inline">Upload Media</span>
          </button>
        )}
      </div>

      <div className="flex items-center gap-2 sm:gap-4 flex-1 justify-end">
        <div className="relative max-w-xs w-full sm:w-64">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-os-text-muted" />
          <input
            type="text"
            placeholder="Search media..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-black/40 border border-os-window-border rounded-full pl-9 pr-4 py-1.5 text-xs text-os-text placeholder:text-os-text-muted focus:outline-none focus:border-os-accent/50 focus:ring-1 focus:ring-os-accent/50 transition-all"
          />
        </div>

        <div className="hidden sm:flex items-center bg-black/40 border border-os-window-border rounded-lg p-1">
          <button
            onClick={() => setViewMode('grid')}
            className={cn(
              "p-1.5 rounded-md transition-colors",
              viewMode === 'grid' ? "bg-os-accent text-white shadow-sm" : "text-os-text-muted hover:text-os-text hover:bg-white/5"
            )}
            title="Grid View"
          >
            <Grid size={14} />
          </button>
          <button
            onClick={() => setViewMode('list')}
            className={cn(
              "p-1.5 rounded-md transition-colors",
              viewMode === 'list' ? "bg-os-accent text-white shadow-sm" : "text-os-text-muted hover:text-os-text hover:bg-white/5"
            )}
            title="List View"
          >
            <List size={14} />
          </button>
        </div>
      </div>
    </div>
  );
}
