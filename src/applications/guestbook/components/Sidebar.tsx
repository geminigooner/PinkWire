import React, { useMemo } from 'react';
import { useGuestbookStore } from '../store/useGuestbookStore';
import { BookHeart, History, Search, Star, Users } from 'lucide-react';
import { cn } from '../../../utils/cn';
import { format, parseISO } from 'date-fns';

export function Sidebar() {
  const { filter, setFilter, entries, archiveMonthYear, setArchiveMonthYear, isSidebarOpen, toggleSidebar } = useGuestbookStore();

  const publishedEntries = entries.filter(e => e.moderationStatus === 'Publish');

  const archives = useMemo(() => {
    const map = new Map<string, number>();
    publishedEntries.forEach(entry => {
      const d = parseISO(entry.timestamp);
      const key = format(d, 'yyyy-MM');
      map.set(key, (map.get(key) || 0) + 1);
    });
    return Array.from(map.entries())
      .sort((a, b) => b[0].localeCompare(a[0]))
      .map(([key, count]) => ({
        key,
        label: format(parseISO(`${key}-01`), 'MMMM yyyy'),
        count
      }));
  }, [publishedEntries]);

  return (
    <>
      {isSidebarOpen && (
        <div 
          className="md:hidden fixed inset-0 bg-black/40 backdrop-blur-os-os-os z-[40]" 
          onClick={toggleSidebar}
        />
      )}
      <div className={cn(
        "w-64 shrink-0 border-r border-os-window-border bg-black/30 flex-col h-full overflow-y-auto custom-scrollbar absolute md:relative z-[50] transition-transform duration-300",
        isSidebarOpen ? "translate-x-0 flex" : "-translate-x-full md:translate-x-0 hidden md:flex"
      )}>
        <div className="p-4 space-y-6">
          <div>
            <h3 className="px-2 text-xs font-semibold text-os-text-muted mb-2 uppercase tracking-widest">Views</h3>
            <div className="space-y-1">
              <div className="px-2 pb-4 block md:hidden">
                <div className="relative">
                  <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-os-text-muted" />
                  <input
                    type="text"
                    placeholder="Search..."
                    value={useGuestbookStore(state => state.searchQuery)}
                    onChange={(e) => useGuestbookStore.getState().setSearchQuery(e.target.value)}
                    className="w-full bg-os-window-bg/10 border border-os-window-border rounded-full pl-9 pr-4 py-1.5 text-sm text-os-text placeholder:text-os-text-muted focus:outline-none focus:border-os-accent focus:ring-1 focus:ring-os-accent transition-all font-sans"
                  />
                </div>
              </div>
              
              <button
                onClick={() => { setFilter('all'); setArchiveMonthYear(null); if (window.innerWidth < 768) toggleSidebar(); }}
                className={cn(
                  "w-full flex items-center justify-between gap-3 px-3 py-2 rounded-os text-sm transition-colors",
                  filter === 'all' ? "bg-os-accent/20 text-os-text font-medium shadow-os" : "text-os-text-muted hover:bg-white/5"
                )}
              >
                <span className="flex items-center gap-3">
                  <Users size={16} className={filter === 'all' ? "text-os-accent" : "text-os-text-muted"} />
                  Recent Visitors
                </span>
                <span className="text-xs bg-os-window-bg/10 px-2 py-0.5 rounded-full">{publishedEntries.length}</span>
              </button>
              <button
                onClick={() => { setFilter('favorites'); setArchiveMonthYear(null); if (window.innerWidth < 768) toggleSidebar(); }}
                className={cn(
                  "w-full flex items-center justify-between gap-3 px-3 py-2 rounded-os text-sm transition-colors",
                  filter === 'favorites' ? "bg-os-accent/20 text-os-text font-medium shadow-os" : "text-os-text-muted hover:bg-white/5"
                )}
              >
                <span className="flex items-center gap-3">
                  <Star size={16} className={filter === 'favorites' ? "text-[#f59e0b] fill-[#f59e0b]" : "text-os-text-muted"} />
                  Favorites
                </span>
                <span className="text-xs bg-os-window-bg/10 px-2 py-0.5 rounded-full">
                  {publishedEntries.filter(e => e.favorite).length}
                </span>
              </button>
            </div>
          </div>

          <div>
            <h3 className="px-2 text-xs font-semibold text-os-text-muted mb-2 uppercase tracking-widest flex items-center gap-2">
              <History size={14} /> Guestbook Archive
            </h3>
            <div className="space-y-1 mt-3">
              {archives.map(arch => (
                <button
                  key={arch.key}
                  onClick={() => { setFilter('archive'); setArchiveMonthYear(arch.key); if (window.innerWidth < 768) toggleSidebar(); }}
                  className={cn(
                    "w-full flex items-center justify-between gap-3 px-3 py-1.5 rounded-os text-sm transition-colors",
                    filter === 'archive' && archiveMonthYear === arch.key 
                      ? "bg-os-accent/20 text-os-text font-medium shadow-os" 
                      : "text-os-text-muted hover:bg-white/5"
                  )}
                >
                  <span className="truncate">{arch.label}</span>
                  <span className="text-[10px] opacity-70">{arch.count}</span>
                </button>
              ))}
              {archives.length === 0 && (
                <div className="px-3 py-2 text-xs text-os-text-muted italic">No archived entries yet.</div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
