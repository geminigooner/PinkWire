import React from 'react';
import { useDisposableStore } from '../../store/useDisposableStore';

export function StatusBar() {
  const { photos, currentAlbumId, selectedPhotoIds, albums } = useDisposableStore();

  const currentAlbum = albums.find(a => a.id === currentAlbumId);
  const totalPhotos = currentAlbumId === 'all' ? photos.length : photos.filter(p => p.albumId === currentAlbumId || (currentAlbumId === 'favorites' && p.isFavorite)).length;

  return (
    <div className="h-8 shrink-0 border-t border-os-window-border bg-os-titlebar-bg flex items-center justify-between px-4 text-[10px] text-os-text-muted">
      <div className="flex items-center gap-4">
        <span>{totalPhotos} {totalPhotos === 1 ? 'item' : 'items'}</span>
        {selectedPhotoIds.length > 0 && (
          <span>{selectedPhotoIds.length} selected</span>
        )}
      </div>
      <div>
        {currentAlbum?.name || 'All Photos'}
      </div>
    </div>
  );
}
