import React from 'react';
import { useDisposableStore } from '../../store/useDisposableStore';
import { cn } from '../../../../utils/cn';

export function MainView() {
  const { photos, currentAlbumId, searchQuery, viewMode, openViewer } = useDisposableStore();

  const filteredPhotos = photos.filter(photo => {
    // Filter by album
    if (currentAlbumId === 'favorites' && !photo.isFavorite) return false;
    if (currentAlbumId !== 'all' && currentAlbumId !== 'favorites' && currentAlbumId !== 'recent' && currentAlbumId !== 'screenshots' && photo.albumId !== currentAlbumId) return false;
    
    // Filter by search
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      if (!photo.title.toLowerCase().includes(q) && 
          !photo.caption?.toLowerCase().includes(q) &&
          !photo.tags.some(t => t.toLowerCase().includes(q))) {
        return false;
      }
    }
    
    return true;
  });

  const getGridClass = () => {
    switch (viewMode) {
      case 'small': return 'grid-cols-4 sm:grid-cols-6 lg:grid-cols-8 gap-1';
      case 'medium': return 'grid-cols-3 sm:grid-cols-4 lg:grid-cols-5 gap-4 p-4';
      case 'large': return 'grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 p-6';
      case 'polaroid': return 'grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-8 p-8';
      case 'contact': return 'grid-cols-5 sm:grid-cols-7 lg:grid-cols-10 gap-0 p-4';
      default: return 'grid-cols-4 gap-4 p-4';
    }
  };

  return (
    <div className="flex-1 overflow-y-auto bg-black/20">
      <div className={cn("grid", getGridClass())}>
        {filteredPhotos.map((photo, i) => {
          if (viewMode === 'polaroid') {
            const rotation = (i % 5) - 2; // slight random rotation
            return (
              <div 
                key={photo.id}
                onDoubleClick={() => openViewer(photo.url)}
                className="bg-white p-3 pb-10 shadow-lg cursor-pointer transition-transform hover:scale-105 hover:z-10 group"
                style={{ transform: `rotate(${rotation}deg)` }}
              >
                <div className="aspect-square overflow-hidden bg-black/5">
                  <img src={photo.url} alt={photo.title} className="w-full h-full object-cover" loading="lazy" />
                </div>
                <div className="mt-3 text-center text-black/80 font-medium font-sans text-xs">
                  {photo.title}
                </div>
              </div>
            );
          }
          
          if (viewMode === 'contact') {
            return (
              <div 
                key={photo.id}
                onDoubleClick={() => openViewer(photo.url)}
                className="aspect-[3/4] cursor-pointer grayscale contrast-125 hover:grayscale-0 transition-all border border-black/50 p-1 bg-white/5"
              >
                <img src={photo.url} alt={photo.title} className="w-full h-full object-cover" loading="lazy" />
              </div>
            );
          }

          return (
            <div 
              key={photo.id}
              onDoubleClick={() => openViewer(photo.url)}
              className="relative group cursor-pointer overflow-hidden rounded-lg aspect-square bg-black/20 border border-os-window-border"
            >
              <img 
                src={photo.url} 
                alt={photo.title} 
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-3">
                <span className="text-white text-xs font-medium truncate">{photo.title}</span>
                {photo.caption && <span className="text-white/70 text-[10px] truncate">{photo.caption}</span>}
              </div>
            </div>
          );
        })}
      </div>
      
      {filteredPhotos.length === 0 && (
        <div className="h-full flex items-center justify-center text-os-text-muted text-sm">
          No photos found.
        </div>
      )}
    </div>
  );
}
