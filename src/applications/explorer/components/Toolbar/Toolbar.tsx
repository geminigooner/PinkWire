import React from 'react';
import { useExplorerStore } from '../../store/useExplorerStore';
import { 
  ArrowLeft, ArrowRight, ArrowUp, Search, 
  Menu, Grid, LayoutGrid, List, AlignJustify, Eye, EyeOff 
} from 'lucide-react';
import { cn } from '../../../../utils/cn';
import { ViewMode } from '../../types';
import { useAuthStore } from '../../../../store/useAuthStore';
import { Upload } from 'lucide-react';

export function Toolbar() {
  const { isAuthenticated } = useAuthStore();
  const { 
    currentPath, history, historyIndex, 
    navigateBack, navigateForward, navigateUp, 
    searchQuery, setSearchQuery,
    viewMode, setViewMode,
    isSidebarOpen, setSidebarOpen,
    showHiddenFiles, setShowHiddenFiles,
    files
  } = useExplorerStore();

  const canGoBack = historyIndex > 0;
  const canGoForward = historyIndex < history.length - 1;
  const canGoUp = currentPath.length > 1;

  const currentFolderId = currentPath[currentPath.length - 1];
  const currentFolder = files.find(f => f.id === currentFolderId);

  const viewModes: { id: ViewMode; icon: React.ElementType; label: string }[] = [
    { id: 'large', icon: Grid, label: 'Large Icons' },
    { id: 'medium', icon: LayoutGrid, label: 'Medium Icons' },
    { id: 'list', icon: List, label: 'List' },
    { id: 'details', icon: AlignJustify, label: 'Details' },
  ];

  return (
    <div className="h-14 shrink-0 border-b border-os-window-border bg-os-titlebar-bg/70 px-2 sm:px-4 flex items-center justify-between gap-2">
      <div className="flex items-center gap-1 sm:gap-2">
        <button
          onClick={() => setSidebarOpen(!isSidebarOpen)}
          className="md:hidden flex items-center justify-center p-1.5 rounded-os text-os-text-muted hover:text-os-text hover:bg-white/10 transition-colors"
        >
          <Menu size={18} />
        </button>

        <div className="flex items-center gap-1">
          <button 
            onClick={navigateBack}
            disabled={!canGoBack}
            className={cn(
              "p-1.5 rounded-os transition-colors",
              canGoBack ? "text-os-text-muted hover:text-os-text hover:bg-white/10" : "text-os-text-muted/30 cursor-not-allowed"
            )}
          >
            <ArrowLeft size={18} />
          </button>
          <button 
            onClick={navigateForward}
            disabled={!canGoForward}
            className={cn(
              "p-1.5 rounded-os transition-colors",
              canGoForward ? "text-os-text-muted hover:text-os-text hover:bg-white/10" : "text-os-text-muted/30 cursor-not-allowed"
            )}
          >
            <ArrowRight size={18} />
          </button>
          <button 
            onClick={navigateUp}
            disabled={!canGoUp}
            className={cn(
              "p-1.5 rounded-os transition-colors",
              canGoUp ? "text-os-text-muted hover:text-os-text hover:bg-white/10" : "text-os-text-muted/30 cursor-not-allowed"
            )}
          >
            <ArrowUp size={18} />
          </button>
        </div>
        
        {/* Breadcrumbs simplified as just the folder name for now, or address bar style */}
        <div className="hidden sm:flex items-center ml-2">
          <div className="bg-black/40 border border-os-window-border rounded-os px-3 py-1.5 text-xs text-os-text flex items-center min-w-[200px] max-w-[400px]">
            {currentFolder?.name || currentFolderId}
          </div>
          {isAuthenticated && (
            <button className="ml-2 flex items-center gap-1.5 px-3 py-1.5 rounded-os text-xs font-medium bg-os-accent text-white hover:bg-os-accent/80 transition-colors">
              <Upload size={14} /> Upload
            </button>
          )}
        </div>
      </div>

      <div className="flex items-center gap-2 sm:gap-4">
        <div className="hidden lg:flex items-center bg-black/40 border border-os-window-border rounded-os p-1">
          {viewModes.map(mode => {
            const Icon = mode.icon;
            return (
              <button
                key={mode.id}
                onClick={() => setViewMode(mode.id)}
                title={mode.label}
                className={cn(
                  "p-1.5 rounded-os transition-colors",
                  viewMode === mode.id ? "bg-os-accent text-white shadow-os" : "text-os-text-muted hover:text-os-text hover:bg-white/5"
                )}
              >
                <Icon size={14} />
              </button>
            );
          })}
          <div className="w-px h-4 bg-os-window-border mx-1" />
          <button
            onClick={() => setShowHiddenFiles(!showHiddenFiles)}
            title={showHiddenFiles ? "Hide Hidden Files" : "Show Hidden Files"}
            className={cn(
              "p-1.5 rounded-os transition-colors",
              showHiddenFiles ? "text-os-accent hover:bg-white/5" : "text-os-text-muted hover:text-os-text hover:bg-white/5"
            )}
          >
            {showHiddenFiles ? <Eye size={14} /> : <EyeOff size={14} />}
          </button>
        </div>

        <div className="relative">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-os-text-muted" />
          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-24 sm:w-48 bg-black/40 border border-os-window-border rounded-full pl-9 pr-4 py-1.5 text-xs text-os-text placeholder:text-os-text-muted focus:outline-none focus:border-os-accent/50 focus:ring-1 focus:ring-os-accent/50 transition-all"
          />
        </div>
      </div>
    </div>
  );
}
