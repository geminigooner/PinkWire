import React from 'react';
import { useDisposableStore } from '../../store/useDisposableStore';
import { cn } from '../../../../utils/cn';
import { Search, Folder, Heart, Clock, Monitor, Image as ImageIcon } from 'lucide-react';

export function Sidebar() {
  const { albums, currentAlbumId, setCurrentAlbum } = useDisposableStore();

  const renderIcon = (id: string, isSmart?: boolean) => {
    if (id === 'all') return <ImageIcon size={16} />;
    if (id === 'favorites') return <Heart size={16} />;
    if (id === 'recent') return <Clock size={16} />;
    if (id === 'screenshots') return <Monitor size={16} />;
    if (isSmart) return <ImageIcon size={16} />;
    return <Folder size={16} />;
  };

  return (
    <div className="w-56 md:w-64 hidden sm:flex shrink-0 border-r border-os-window-border bg-os-window-bg/80 flex flex-col h-full">
      <div className="p-4 border-b border-os-window-border bg-os-titlebar-bg/50">
        <h2 className="font-semibold text-os-text text-sm">Library</h2>
      </div>
      
      <div className="flex-1 overflow-y-auto scrollbar-hide p-2 space-y-6">
        <div>
          <div className="space-y-0.5">
            {albums.filter(a => a.isSmart).map(album => (
              <button
                key={album.id}
                onClick={() => setCurrentAlbum(album.id)}
                className={cn(
                  "w-full flex items-center gap-3 px-3 py-1.5 rounded-md text-sm transition-colors",
                  currentAlbumId === album.id 
                    ? "bg-os-accent text-white" 
                    : "text-os-text hover:bg-white/10"
                )}
              >
                <span className={cn(
                  currentAlbumId === album.id ? "text-white" : "text-os-accent"
                )}>
                  {renderIcon(album.id, album.isSmart)}
                </span>
                {album.name}
              </button>
            ))}
          </div>
        </div>

        <div>
          <h3 className="px-3 text-xs font-medium text-os-text-muted mb-2 uppercase tracking-wider">Albums</h3>
          <div className="space-y-0.5">
            {albums.filter(a => !a.isSmart).map(album => (
              <button
                key={album.id}
                onClick={() => setCurrentAlbum(album.id)}
                className={cn(
                  "w-full flex items-center gap-3 px-3 py-1.5 rounded-md text-sm transition-colors",
                  currentAlbumId === album.id 
                    ? "bg-os-accent text-white" 
                    : "text-os-text hover:bg-white/10"
                )}
              >
                <span className={cn(
                  currentAlbumId === album.id ? "text-white" : "text-os-text-muted"
                )}>
                  {renderIcon(album.id)}
                </span>
                {album.name}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
