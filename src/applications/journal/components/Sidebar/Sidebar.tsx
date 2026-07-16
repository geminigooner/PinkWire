import React from 'react';
import { useJournalStore } from '../../store/useJournalStore';
import { useAuthStore } from '../../../../store/useAuthStore';
import { Search, Folder, Heart, BookOpen, Hash, Edit3, Archive } from 'lucide-react';
import { cn } from '../../../../utils/cn';

export function Sidebar() {
  const { categories, activeCategoryId, setActiveCategory, articles, searchQuery, setSearchQuery, isSidebarOpen } = useJournalStore();
  const { isAuthenticated } = useAuthStore();
  
  // Extract unique tags from articles
  const allTags = Array.from(new Set(articles.flatMap(a => a.tags))).sort();

  return (
    <div className={cn(
      "w-64 shrink-0 border-r border-os-window-border bg-os-window-bg/95 flex flex-col h-full absolute md:relative z-20 transition-transform duration-300 backdrop-blur-xl",
      isSidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
    )}>
      <div className="p-4 border-b border-os-window-border bg-os-titlebar-bg/50">
        <div className="relative">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-os-text-muted" />
          <input
            type="text"
            placeholder="Search journal..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-black/40 border border-os-window-border rounded-lg pl-9 pr-4 py-1.5 text-sm text-os-text placeholder:text-os-text-muted focus:outline-none focus:border-os-accent/50 focus:ring-1 focus:ring-os-accent/50 transition-all"
          />
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto scrollbar-hide p-3 space-y-6">
        <div>
          <h3 className="px-2 text-xs font-medium text-os-text-muted mb-2 uppercase tracking-wider">Library</h3>
          <div className="space-y-0.5">
            <button
              onClick={() => setActiveCategory('all')}
              className={cn(
                "w-full flex items-center gap-3 px-2 py-1.5 rounded-md text-sm transition-colors",
                activeCategoryId === 'all' ? "bg-os-accent text-white" : "text-os-text hover:bg-white/10"
              )}
            >
              <BookOpen size={16} className={activeCategoryId === 'all' ? "text-white" : "text-os-text-muted"} />
              All Entries
            </button>
            <button
              onClick={() => setActiveCategory('favorites')}
              className={cn(
                "w-full flex items-center gap-3 px-2 py-1.5 rounded-md text-sm transition-colors",
                activeCategoryId === 'favorites' ? "bg-os-accent text-white" : "text-os-text hover:bg-white/10"
              )}
            >
              <Heart size={16} className={activeCategoryId === 'favorites' ? "text-white" : "text-os-accent"} />
              Favorites
            </button>
            
            {isAuthenticated && (
              <>
                <button
                  onClick={() => { setSearchQuery('draft'); setActiveCategory('all'); }}
                  className={cn(
                    "w-full flex items-center gap-3 px-2 py-1.5 rounded-md text-sm transition-colors",
                    searchQuery === 'draft' ? "bg-os-accent text-white" : "text-os-text hover:bg-white/10"
                  )}
                >
                  <Edit3 size={16} className={searchQuery === 'draft' ? "text-white" : "text-yellow-500"} />
                  Drafts
                </button>
                <button
                  onClick={() => { setSearchQuery('archived'); setActiveCategory('all'); }}
                  className={cn(
                    "w-full flex items-center gap-3 px-2 py-1.5 rounded-md text-sm transition-colors",
                    searchQuery === 'archived' ? "bg-os-accent text-white" : "text-os-text hover:bg-white/10"
                  )}
                >
                  <Archive size={16} className={searchQuery === 'archived' ? "text-white" : "text-os-text-muted"} />
                  Archived
                </button>
              </>
            )}
          </div>
        </div>

        <div>
          <h3 className="px-2 text-xs font-medium text-os-text-muted mb-2 uppercase tracking-wider">Categories</h3>
          <div className="space-y-0.5">
            {categories.filter(c => c.id !== 'all' && c.id !== 'favorites').map(category => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={cn(
                  "w-full flex items-center gap-3 px-2 py-1.5 rounded-md text-sm transition-colors",
                  activeCategoryId === category.id ? "bg-os-accent text-white" : "text-os-text hover:bg-white/10"
                )}
              >
                <Folder size={16} className={activeCategoryId === category.id ? "text-white" : "text-os-text-muted"} />
                {category.name}
              </button>
            ))}
          </div>
        </div>

        <div>
          <h3 className="px-2 text-xs font-medium text-os-text-muted mb-2 uppercase tracking-wider">Tags</h3>
          <div className="flex flex-wrap gap-1.5 px-2">
            {allTags.map(tag => (
              <button
                key={tag}
                onClick={() => {
                  setSearchQuery(tag);
                  setActiveCategory('all');
                }}
                className="inline-flex items-center text-[11px] px-2 py-1 rounded-md bg-black/40 border border-os-window-border text-os-text-muted hover:text-os-text hover:border-os-accent/50 transition-colors"
              >
                <Hash size={10} className="mr-0.5 opacity-70" />
                {tag}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
