import React, { useState } from 'react';
import { useWallpaperStore } from '../store/useWallpaperStore';
import { useAuthStore } from '../../../store/useAuthStore';
import { Search, Folder, Heart, Sparkles, Image as ImageIcon, Menu, X, Plus } from 'lucide-react';
import { cn } from '../../../utils/cn';

export function Sidebar() {
  const { categories, activeCategory, setActiveCategory, searchQuery, setSearchQuery } = useWallpaperStore();
  const { isAuthenticated } = useAuthStore();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Mobile Toggle */}
      <button 
        className="md:hidden absolute top-3 left-3 z-50 p-2 bg-black/50 rounded-os text-white"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      {/* Sidebar Content */}
      <div className={cn(
        "absolute md:relative z-40 w-64 h-full border-r border-os-window-border bg-os-window-bg/95 flex flex-col transition-transform duration-300 backdrop-blur-os-os-os",
        isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
      )}>
        <div className="p-4 border-b border-os-window-border bg-os-titlebar-bg/50 pt-14 md:pt-4">
          <div className="relative">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-os-text-muted" />
            <input
              type="text"
              placeholder="Search wallpapers..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-black/40 border border-os-window-border rounded-os pl-9 pr-4 py-2 text-sm text-os-text placeholder:text-os-text-muted focus:outline-none focus:border-os-accent/50 transition-all"
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-6">
          <div>
            <h3 className="px-2 text-xs font-medium text-os-text-muted mb-2 uppercase tracking-wider">Library</h3>
            <div className="space-y-1">
              <button
                onClick={() => { setActiveCategory('All'); setIsOpen(false); }}
                className={cn(
                  "w-full flex items-center gap-3 px-3 py-2 rounded-os text-sm transition-colors",
                  activeCategory === 'All' ? "bg-os-accent text-white" : "text-os-text hover:bg-white/10"
                )}
              >
                <ImageIcon size={16} className={activeCategory === 'All' ? "text-white" : "text-os-text-muted"} />
                All Wallpapers
              </button>
              <button
                onClick={() => { setActiveCategory('Featured'); setIsOpen(false); }}
                className={cn(
                  "w-full flex items-center gap-3 px-3 py-2 rounded-os text-sm transition-colors",
                  activeCategory === 'Featured' ? "bg-os-accent text-white" : "text-os-text hover:bg-white/10"
                )}
              >
                <Sparkles size={16} className={activeCategory === 'Featured' ? "text-white" : "text-yellow-500"} />
                Featured
              </button>
              <button
                onClick={() => { setActiveCategory('Favorites'); setIsOpen(false); }}
                className={cn(
                  "w-full flex items-center gap-3 px-3 py-2 rounded-os text-sm transition-colors",
                  activeCategory === 'Favorites' ? "bg-os-accent text-white" : "text-os-text hover:bg-white/10"
                )}
              >
                <Heart size={16} className={activeCategory === 'Favorites' ? "text-white" : "text-rose-500"} />
                Favorites
              </button>
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between px-2 mb-2">
              <h3 className="text-xs font-medium text-os-text-muted uppercase tracking-wider">Collections</h3>
              {isAuthenticated && (
                <button title="New Category" className="text-os-text-muted hover:text-os-text">
                  <Plus size={14} />
                </button>
              )}
            </div>
            <div className="space-y-1">
              {categories.map(category => (
                <button
                  key={category}
                  onClick={() => { setActiveCategory(category); setIsOpen(false); }}
                  className={cn(
                    "w-full flex items-center gap-3 px-3 py-2 rounded-os text-sm transition-colors",
                    activeCategory === category ? "bg-os-accent text-white" : "text-os-text hover:bg-white/10"
                  )}
                >
                  <Folder size={16} className={activeCategory === category ? "text-white" : "text-os-text-muted"} />
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      {/* Mobile backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-30 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
}
