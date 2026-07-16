import React, { useState } from 'react';
import { MediaItem, useMediaStore } from '../store/useMediaStore';
import { useAuthStore } from '../../../store/useAuthStore';
import { Star, Image as ImageIcon, Calendar, File } from 'lucide-react';
import { cn } from '../../../utils/cn';
import { useWindowStore } from '../../../store/useWindowStore';
import { MediaEditModal } from './MediaEditModal';

export function MediaList({ items }: { items: MediaItem[] }) {
  const [selectedItem, setSelectedItem] = useState<MediaItem | null>(null);
  const { toggleFavorite } = useMediaStore();
  const { isAuthenticated } = useAuthStore();

  const formatSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
  };

  return (
    <>
      <div className="flex flex-col gap-2">
        {items.map(item => (
          <div 
            key={item.id} 
            className="flex items-center gap-4 bg-black/40 border border-os-window-border rounded-os p-2 cursor-pointer hover:border-os-accent/50 hover:bg-black/60 transition-colors shadow-os"
            onClick={() => setSelectedItem(item)}
            onDoubleClick={() => useWindowStore.getState().openWindow('disposable', { imageUrl: item.url })}
          >
            <div className="w-16 h-16 shrink-0 bg-black/50 rounded-os flex items-center justify-center overflow-hidden border border-white/5">
              {item.url ? (
                <img src={item.url} alt={item.displayName} className="w-full h-full object-cover" loading="lazy" />
              ) : (
                <ImageIcon className="text-os-text-muted opacity-30" size={24} />
              )}
            </div>
            
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <h3 className="font-medium text-sm text-os-text truncate">{item.displayName}</h3>
                <span className="text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-full bg-os-accent/20 text-os-accent border border-os-accent/30 shrink-0">
                  {item.category}
                </span>
              </div>
              <div className="flex items-center gap-4 text-xs text-os-text-muted">
                <span className="flex items-center gap-1.5 truncate">
                  <File size={12} /> {item.filename} ({formatSize(item.size)})
                </span>
                <span className="hidden sm:flex items-center gap-1.5 shrink-0">
                  <Calendar size={12} /> {new Date(item.dateUploaded).toLocaleDateString()}
                </span>
              </div>
            </div>
            
            {(isAuthenticated || item.favorite) && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  if (isAuthenticated) toggleFavorite(item.id);
                }}
                className={cn(
                  "p-2 rounded-full transition-colors shrink-0",
                  item.favorite ? "text-rose-500" : "text-os-text-muted hover:text-os-text hover:bg-white/10",
                  !isAuthenticated && item.favorite && "cursor-default hover:bg-transparent"
                )}
              >
                <Star size={16} className={item.favorite ? "fill-current" : ""} />
              </button>
            )}
          </div>
        ))}
      </div>
      
      {selectedItem && (
        <MediaEditModal item={selectedItem} onClose={() => setSelectedItem(null)} />
      )}
    </>
  );
}
