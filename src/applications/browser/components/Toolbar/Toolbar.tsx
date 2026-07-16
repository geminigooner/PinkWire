import React, { useState, useEffect } from 'react';
import { useBrowserStore } from '../../store/useBrowserStore';
import { useWindowStore } from '../../../../store/useWindowStore';
import { ArrowLeft, ArrowRight, RotateCw, Home, Search, Star, MoreVertical, Globe } from 'lucide-react';
import { HOMEPAGE_URL } from '../../data/mockData';
import { cn } from '../../../../utils/cn';

export function Toolbar() {
  const { tabs, activeTabId, navigate, goBack, goForward, reload, bookmarks } = useBrowserStore();
  const openWindow = useWindowStore(state => state.openWindow);
  
  const activeTab = tabs.find(t => t.id === activeTabId);
  
  const [address, setAddress] = useState('');

  useEffect(() => {
    if (activeTab) {
      setAddress(activeTab.url);
    }
  }, [activeTab?.url, activeTab?.id]);

  if (!activeTab) return null;

  const canGoBack = activeTab.historyIndex > 0;
  const canGoForward = activeTab.historyIndex < activeTab.history.length - 1;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (address.trim()) {
      navigate(activeTab.id, address.trim());
    }
  };

  const handleBookmarkClick = (url: string) => {
    if (url.startsWith('pinkwire://')) {
      const appParts = url.replace('pinkwire://', '').split('/');
      const appId = appParts[0];
      const data = appParts.length > 1 ? { path: appParts.slice(1) } : undefined;
      
      // Map legacy/custom urls to real apps
      if (appId === 'archive' || appId === 'ledger' || appId === 'echo' || appId === 'dark-velvet' || appId === 'konset' || appId === 'vestige') {
        openWindow('explorer', { path: ['projects', `${appId}_proj`] });
      } else if (appId === 'desktop') {
        // do nothing or focus desktop
      } else if (appId === 'photos') {
        openWindow('disposable');
      } else if (appId === 'downloads') {
        openWindow('explorer', { path: ['downloads'] });
      } else if (appId === 'projects') {
        openWindow('explorer', { path: ['projects'] });
      } else {
        openWindow(appId, data);
      }
    } else {
      navigate(activeTab.id, url);
    }
  };

  return (
    <div className="flex flex-col border-b border-os-window-border bg-os-titlebar-bg/70 shrink-0">
      {/* Main Toolbar */}
      <div className="h-12 px-2 sm:px-4 flex items-center gap-2">
        <div className="flex items-center gap-1">
          <button 
            onClick={() => goBack(activeTab.id)}
            disabled={!canGoBack}
            className={cn("p-1.5 rounded-os transition-colors", canGoBack ? "text-os-text-muted hover:text-os-text hover:bg-white/10" : "text-os-text-muted/30 cursor-not-allowed")}
          >
            <ArrowLeft size={18} />
          </button>
          <button 
            onClick={() => goForward(activeTab.id)}
            disabled={!canGoForward}
            className={cn("p-1.5 rounded-os transition-colors", canGoForward ? "text-os-text-muted hover:text-os-text hover:bg-white/10" : "text-os-text-muted/30 cursor-not-allowed")}
          >
            <ArrowRight size={18} />
          </button>
          <button 
            onClick={() => reload(activeTab.id)}
            className="p-1.5 rounded-os text-os-text-muted hover:text-os-text hover:bg-white/10 transition-colors"
          >
            <RotateCw size={16} className={cn(activeTab.isLoading && "animate-spin")} />
          </button>
          <button 
            onClick={() => navigate(activeTab.id, HOMEPAGE_URL)}
            className="p-1.5 rounded-os text-os-text-muted hover:text-os-text hover:bg-white/10 transition-colors hidden sm:block"
          >
            <Home size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex-1 relative flex items-center max-w-3xl mx-auto">
          <div className="absolute left-3 text-os-text-muted/70 pointer-events-none">
            {address.startsWith('https') ? <Search size={14} /> : <Globe size={14} />}
          </div>
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="w-full bg-black/40 border border-os-window-border rounded-full pl-9 pr-10 py-1.5 text-sm text-os-text focus:outline-none focus:border-os-accent/50 focus:ring-1 focus:ring-os-accent/50 transition-all font-mono shadow-os"
          />
          <button type="button" className="absolute right-2 p-1 text-os-text-muted hover:text-os-text hover:bg-white/10 rounded-full transition-colors">
            <Star size={14} />
          </button>
        </form>

        <button className="p-1.5 rounded-os text-os-text-muted hover:text-os-text hover:bg-white/10 transition-colors hidden sm:block">
          <MoreVertical size={18} />
        </button>
      </div>

      {/* Bookmarks Bar */}
      <div className="h-8 px-4 flex items-center gap-4 overflow-x-auto scrollbar-hide text-xs border-t border-os-window-border/30 bg-black/20">
        {bookmarks.map(bookmark => (
          <button
            key={bookmark.id}
            onClick={() => handleBookmarkClick(bookmark.url)}
            className="flex items-center gap-2 px-2 py-1 rounded-os text-os-text-muted hover:text-os-text hover:bg-white/10 transition-colors whitespace-nowrap"
          >
            <Globe size={12} className="opacity-70" />
            <span>{bookmark.title}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
