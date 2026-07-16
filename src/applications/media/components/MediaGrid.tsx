import React, { useState } from 'react';
import { MediaItem, useMediaStore } from '../store/useMediaStore';
import { useAuthStore } from '../../../store/useAuthStore';
import { Star, Image as ImageIcon } from 'lucide-react';
import { cn } from '../../../utils/cn';
import { useWindowStore } from '../../../store/useWindowStore';
import { MediaEditModal } from './MediaEditModal';

export function MediaGrid({ items }: { items: MediaItem[] }) {
  const [selectedItem, setSelectedItem] = useState<MediaItem | null>(null);
  const { toggleFavorite } = useMediaStore();
  const { isAuthenticated } = useAuthStore();

  return (
    <>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
        {items.map(item => (
          <div 
            key={item.id} 
            className="group relative bg-black/40 border border-os-window-border rounded-os overflow-hidden cursor-pointer hover:border-os-accent/50 transition-colors shadow-os"
            onClick={() => setSelectedItem(item)}
            onDoubleClick={() => useWindowStore.getState().openWindow('disposable', { imageUrl: item.url })}
          >
            <div className="aspect-square bg-black/50 flex items-center justify-center relative overflow-hidden">
              {item.url ? (
                <img src={item.url} alt={item.displayName} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" loading="lazy" />
              ) : (
                <ImageIcon className="text-os-text-muted opacity-30" size={32} />
              )}
              
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30 opacity-0 group-hover:opacity-100 transition-opacity" />
              
              {(isAuthenticated || item.favorite) && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    if (isAuthenticated) toggleFavorite(item.id);
                  }}
                  className={cn(
                    "absolute top-2 right-2 p-1.5 rounded-full transition-all",
                    item.favorite ? "bg-rose-500 text-white opacity-100" : "bg-black/40 text-white/70 opacity-0 group-hover:opacity-100 hover:bg-black/60",
                    !isAuthenticated && item.favorite && "cursor-default" // Non-admin can see it's favorite but not click
                  )}
                >
                  <Star size={14} className={item.favorite ? "fill-current" : ""} />
                </button>
              )}
              
              <div className="absolute bottom-2 left-2 right-2 text-xs text-white opacity-0 group-hover:opacity-100 transition-opacity truncate font-medium drop-shadow-os">
                {item.displayName}
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {selectedItem && (
        <MediaEditModal item={selectedItem} onClose={() => setSelectedItem(null)} />
      )}
    </>
  );
}
