import React, { useState } from 'react';
import { MediaSidebar } from './components/MediaSidebar';
import { MediaToolbar } from './components/MediaToolbar';
import { MediaGrid } from './components/MediaGrid';
import { MediaList } from './components/MediaList';
import { UploadModal } from './components/UploadModal';
import { useMediaStore } from './store/useMediaStore';
import { useAuthStore } from '../../store/useAuthStore';
import { Film, SearchX } from 'lucide-react';
import { cn } from '../../utils/cn';

export function MediaApp() {
  const { items, viewMode, filterCategory, filterFavorite, searchQuery } = useMediaStore();
  const { isAuthenticated } = useAuthStore();
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [showUploadModal, setShowUploadModal] = useState(false);
  
  const filteredItems = items.filter(item => {
    if (filterCategory !== 'All' && item.category !== filterCategory) return false;
    if (filterFavorite && !item.favorite) return false;
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      return (
        item.displayName.toLowerCase().includes(q) ||
        item.filename.toLowerCase().includes(q) ||
        item.description?.toLowerCase().includes(q) ||
        item.tags.some(t => t.toLowerCase().includes(q))
      );
    }
    return true;
  });

  return (
    <div className="flex w-full h-full bg-os-window-bg text-os-text overflow-hidden font-sans rounded-b-xl">
      <MediaSidebar isOpen={isSidebarOpen} onClose={() => setSidebarOpen(false)} />
      
      <div className="flex-1 flex flex-col min-w-0 bg-black/20">
        <MediaToolbar 
          onToggleSidebar={() => setSidebarOpen(!isSidebarOpen)} 
          onUploadClick={() => setShowUploadModal(true)}
        />
        
        <div className="flex-1 overflow-y-auto p-4 custom-scrollbar">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center max-w-md mx-auto px-4">
              <div className="w-20 h-20 rounded-full bg-os-accent/20 flex items-center justify-center mb-6">
                <Film size={40} className="text-os-accent" />
              </div>
              <h2 className="text-2xl font-semibold mb-2">Media Library</h2>
              <p className="text-os-text-muted mb-8 text-sm leading-relaxed">
                Your centralized digital asset manager. Upload memes, wallpapers, and attachments to use across PinkWire OS.
              </p>
              {isAuthenticated ? (
                <button 
                  onClick={() => setShowUploadModal(true)}
                  className="px-6 py-2.5 bg-os-accent hover:bg-os-accent/90 text-white rounded-os font-medium transition-colors shadow-os shadow-os-accent/20"
                >
                  Upload First Image
                </button>
              ) : (
                <p className="text-xs text-os-text-muted/60 italic">Please login as Administrator to upload media.</p>
              )}
            </div>
          ) : filteredItems.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-os-text-muted">
              <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mb-4">
                <SearchX size={32} className="opacity-50" />
              </div>
              <p className="text-base font-medium text-os-text mb-1">No media found</p>
              <p className="text-sm">Try adjusting your filters or search query.</p>
            </div>
          ) : (
            viewMode === 'grid' ? <MediaGrid items={filteredItems} /> : <MediaList items={filteredItems} />
          )}
        </div>
      </div>
      
      {showUploadModal && <UploadModal onClose={() => setShowUploadModal(false)} />}
    </div>
  );
}
