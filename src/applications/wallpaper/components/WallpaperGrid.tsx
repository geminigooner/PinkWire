import React from 'react';
import { useWallpaperStore } from '../store/useWallpaperStore';
import { useDesktopStore } from '../../../store/useDesktopStore';
import { cn } from '../../../utils/cn';
import { Heart, Sparkles, CheckCircle2 } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

export function WallpaperGrid() {
  const { wallpapers, activeCategory, searchQuery, setPreviewWallpaperId } = useWallpaperStore();
  const { wallpaper: currentWallpaper } = useDesktopStore();

  const filtered = wallpapers.filter(w => {
    if (activeCategory === 'Favorites' && !w.favorite) return false;
    if (activeCategory === 'Featured' && !w.featured) return false;
    if (activeCategory !== 'All' && activeCategory !== 'Favorites' && activeCategory !== 'Featured' && w.category !== activeCategory) return false;
    
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      if (!w.title.toLowerCase().includes(q) && 
          !w.artist.toLowerCase().includes(q) && 
          !w.tags.some(t => t.toLowerCase().includes(q))) {
        return false;
      }
    }
    return true;
  });

  return (
    <div className="flex-1 overflow-y-auto p-4 md:p-6 bg-black/20">
      {filtered.length === 0 ? (
        <div className="h-full flex items-center justify-center text-os-text-muted">
          No wallpapers found.
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
          {filtered.map(wallpaper => {
            const isActive = currentWallpaper === wallpaper.url || currentWallpaper === wallpaper.id;
            
            return (
              <div
                key={wallpaper.id}
                onClick={() => setPreviewWallpaperId(wallpaper.id)}
                className={cn(
                  "group relative aspect-[9/16] md:aspect-video rounded-os overflow-hidden cursor-pointer border-2 transition-all duration-300",
                  isActive ? "border-os-accent shadow-[0_0_15px_rgba(var(--os-accent),0.3)]" : "border-transparent hover:border-white/20"
                )}
              >
                <div 
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                  style={{ backgroundImage: `url('${wallpaper.thumbnailUrl || wallpaper.url}')` }}
                />
                
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                  <h3 className="text-white font-medium truncate">{wallpaper.title}</h3>
                  <p className="text-xs text-white/70 truncate">{wallpaper.artist}</p>
                </div>

                {isActive && (
                  <div className="absolute top-2 right-2 bg-os-accent text-white rounded-full p-1 shadow-os">
                    <CheckCircle2 size={16} />
                  </div>
                )}
                
                <div className="absolute top-2 left-2 flex gap-1">
                  {wallpaper.featured && (
                    <div className="bg-black/50 backdrop-blur-os-os-os rounded-full p-1.5 text-yellow-500">
                      <Sparkles size={12} />
                    </div>
                  )}
                  {wallpaper.favorite && (
                    <div className="bg-black/50 backdrop-blur-os-os-os rounded-full p-1.5 text-rose-500">
                      <Heart size={12} fill="currentColor" />
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
