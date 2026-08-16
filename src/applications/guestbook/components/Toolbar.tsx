import React from 'react';
import { useGuestbookStore } from '../store/useGuestbookStore';
import { Search, Filter, SortDesc, SortAsc, Menu, PauseCircle, PlayCircle } from 'lucide-react';
import { cn } from '../../../utils/cn';
import { useAuthStore } from '../../../store/useAuthStore';

export function Toolbar() {
  const { searchQuery, setSearchQuery, sortOrder, setSortOrder, toggleSidebar, isGuestbookEnabled, setIsGuestbookEnabled } = useGuestbookStore();
  const isAuthenticated = useAuthStore(state => state.isAuthenticated);

  return (
    <div className="h-14 px-4 border-b border-os-window-border bg-black/30/80 backdrop-blur-os-os-os flex items-center justify-between shrink-0 z-10">
      <div className="flex items-center gap-2">
        <button 
          onClick={toggleSidebar}
          className="md:hidden p-1.5 -ml-2 text-os-text-muted hover:bg-white/10 hover:text-os-text rounded-os transition-colors"
        >
          <Menu size={20} />
        </button>
        <h1 className="font-serif italic font-medium text-xl text-os-text tracking-tight">Guestbook</h1>
      </div>
      
      <div className="flex items-center gap-2 sm:gap-4 flex-1 justify-end">
        <div className="relative hidden sm:block w-full sm:w-64 max-w-[200px] sm:max-w-none">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-os-text-muted" />
          <input
            type="text"
            placeholder="Search entries..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-os-window-bg/10 border border-os-window-border rounded-full pl-9 pr-4 py-1.5 text-sm text-os-text placeholder:text-os-text-muted focus:outline-none focus:border-os-accent focus:ring-1 focus:ring-os-accent transition-all font-sans"
          />
        </div>

        <div className="flex items-center gap-1 sm:border-l sm:border-os-window-border sm:pl-4">
          <button 
            onClick={() => setSortOrder('newest')}
            className={cn("p-1.5 rounded-os transition-colors", sortOrder === 'newest' ? "bg-os-accent/20 text-os-text" : "text-os-text-muted hover:text-os-text hover:bg-white/5")}
            title="Sort Newest First"
          >
            <SortDesc size={18} />
          </button>
          <button 
            onClick={() => setSortOrder('oldest')}
            className={cn("p-1.5 rounded-os transition-colors", sortOrder === 'oldest' ? "bg-os-accent/20 text-os-text" : "text-os-text-muted hover:text-os-text hover:bg-white/5")}
            title="Sort Oldest First"
          >
            <SortAsc size={18} />
          </button>
          <button 
            onClick={() => setSortOrder('alphabetical')}
            className={cn("p-1.5 rounded-os transition-colors", sortOrder === 'alphabetical' ? "bg-os-accent/20 text-os-text" : "text-os-text-muted hover:text-os-text hover:bg-white/5")}
            title="Sort Alphabetical"
          >
            <Filter size={18} />
          </button>
          
          {isAuthenticated && (
            <button
              onClick={() => setIsGuestbookEnabled(!isGuestbookEnabled)}
              className={cn("p-1.5 ml-2 rounded-os transition-colors", isGuestbookEnabled ? "text-os-text-muted hover:text-os-text hover:bg-white/5" : "bg-red-100 text-red-500")}
              title={isGuestbookEnabled ? "Pause New Submissions" : "Resume Submissions"}
            >
              {isGuestbookEnabled ? <PauseCircle size={18} /> : <PlayCircle size={18} />}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
