import React, { useRef } from 'react';
import { useDesktopStore } from '../../../store/useDesktopStore';
import { WALLPAPERS } from '../data/wallpapers';
import { Upload, Star, LayoutGrid, Monitor, ToggleLeft, ToggleRight, Trash2, Heart, Calendar, User } from 'lucide-react';
import { cn } from '../../../utils/cn';
import { useAuthStore } from '../../../store/useAuthStore';
import { handleWallpaperUpload } from '../../../store/wallpaperManager';
import { useMediaStore } from '../../media/store/useMediaStore';

export function DesktopSettings() {
  const { isAuthenticated } = useAuthStore();
  const { 
    wallpaper, setWallpaper, wallpaperFit, setWallpaperFit, wallpaperBlur, setWallpaperBlur,
    autoArrangeIcons, setAutoArrangeIcons, snapToGrid, setSnapToGrid,
    showLabels, setShowLabels, resetDesktop, stickers, removeSticker,
    favoriteWallpapers, toggleFavoriteWallpaper
  } = useDesktopStore();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const mediaItems = useMediaStore(state => state.items);
  const uploadedWallpapers = mediaItems.filter(item => item.category === 'Wallpapers').map(item => ({
    id: item.url,
    url: item.url,
    title: item.displayName,
    author: 'Uploaded'
  }));

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      try {
        const id = await handleWallpaperUpload(file);
        setWallpaper(id);
      } catch (err: any) {
        alert('Oops, that image was a little too weird even for me. Try another one? (Failed to upload wallpaper)');
      }
    }
  };

  const isGradient = (url: string) => url.startsWith('bg-');
  
  const currentWallpaperMeta = WALLPAPERS.find(w => w.url === wallpaper);

  return (
    <div className="p-4 sm:p-8 max-w-5xl mx-auto space-y-8 sm:space-y-12">
      <div>
        <h2 className="text-2xl font-light mb-6">Desktop</h2>
        
        <div className="space-y-12">
          {/* Wallpaper Manager */}
          <section>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-medium text-os-text-muted uppercase tracking-wider">Wallpaper</h3>
              <div className="flex items-center gap-2">
                <input 
                  type="file" 
                  ref={fileInputRef} 
                  onChange={handleFileUpload} 
                  accept="image/*" 
                  className="hidden" 
                />
                <button 
                  onClick={() => fileInputRef.current?.click()}
                  className="flex items-center gap-2 px-3 py-1.5 bg-black/20 hover:bg-black/40 border border-os-window-border rounded-os text-sm text-os-text transition-colors"
                >
                  <Upload size={14} /> Upload
                </button>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 mb-6">
              {WALLPAPERS.map(w => {
                const isActive = wallpaper === w.url;
                return (
                  <button
                    key={w.id}
                    onClick={() => setWallpaper(w.url)}
                    className={cn(
                      "relative aspect-video rounded-os overflow-hidden border-2 transition-all group",
                      isActive ? "border-os-accent shadow-[0_0_15px_rgba(var(--os-accent),0.3)]" : "border-transparent hover:border-os-text-muted/50"
                    )}
                  >
                    {isGradient(w.url) ? (
                      <div className={cn("w-full h-full", w.url)} />
                    ) : (
                      <img src={w.url} alt={w.name} className="w-full h-full object-cover" />
                    )}
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-3">
                      <span className="text-white text-xs font-medium drop-shadow-os">{w.name}</span>
                    </div>
                    {isActive && (
                      <div className="absolute top-2 right-2 p-1 bg-os-accent rounded-full text-white shadow-os">
                        <Star size={12} fill="currentColor" />
                      </div>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Wallpaper Metadata & Settings */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-black/20 border border-os-window-border rounded-os p-5 flex flex-col justify-between">
                {currentWallpaperMeta ? (
                  <>
                    <div>
                      <div className="flex items-start justify-between mb-2">
                        <h4 className="text-lg font-medium text-os-text">{currentWallpaperMeta.name}</h4>
                        <button 
                          onClick={() => toggleFavoriteWallpaper(currentWallpaperMeta.id)}
                          className="text-os-text-muted hover:text-rose-400 transition-colors"
                          title="Favorite this wallpaper"
                        >
                          <Heart size={18} fill={favoriteWallpapers?.includes(currentWallpaperMeta.id) ? "currentColor" : "none"} className={favoriteWallpapers?.includes(currentWallpaperMeta.id) ? "text-rose-400" : ""} />
                        </button>
                      </div>
                      <p className="text-sm text-os-text-muted mb-4 italic">"{currentWallpaperMeta.description}"</p>
                    </div>
                    <div className="flex items-center gap-4 text-xs text-os-text-muted mt-auto">
                      <span className="flex items-center gap-1.5"><User size={12} /> {currentWallpaperMeta.creator}</span>
                      <span className="flex items-center gap-1.5"><Calendar size={12} /> {new Date(currentWallpaperMeta.dateAdded).toLocaleDateString()}</span>
                    </div>
                  </>
                ) : (
                  <div className="h-full flex flex-col items-center justify-center text-center text-os-text-muted py-4">
                    <p className="text-sm">Custom wallpaper selected.</p>
                    <p className="text-xs opacity-60 mt-1">No metadata available.</p>
                  </div>
                )}
              </div>

              <div className="bg-black/20 border border-os-window-border rounded-os p-5 flex flex-col justify-center gap-6">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-os-text-muted">Fit:</span>
                  <div className="flex items-center bg-black/40 border border-os-window-border rounded-os p-1">
                    {(['cover', 'contain', 'center'] as const).map(fit => (
                      <button
                        key={fit}
                        onClick={() => setWallpaperFit(fit)}
                        className={cn(
                          "px-3 py-1 text-xs rounded-os transition-colors capitalize",
                          wallpaperFit === fit ? "bg-os-accent text-white shadow-os" : "text-os-text-muted hover:text-os-text"
                        )}
                      >
                        {fit}
                      </button>
                    ))}
                  </div>
                </div>
                
                <div className="border-t border-os-window-border" />
                
                <button
                  onClick={() => setWallpaperBlur(!wallpaperBlur)}
                  className="w-full flex items-center justify-between text-sm text-os-text transition-colors"
                >
                  <span className="text-os-text-muted">Blur Background</span>
                  {wallpaperBlur ? <ToggleRight size={20} className="text-os-accent" /> : <ToggleLeft size={20} className="text-os-text-muted" />}
                </button>
              </div>
            </div>
          </section>

          {/* Desktop Layout */}
          <section>
            <h3 className="text-sm font-medium text-os-text-muted mb-4 uppercase tracking-wider">Layout</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-black/20 border border-os-window-border rounded-os p-4 space-y-4">
                <button
                  onClick={() => setAutoArrangeIcons(!autoArrangeIcons)}
                  className="w-full flex items-center justify-between text-sm text-os-text hover:bg-white/5 p-2 rounded-os transition-colors"
                >
                  <span className="flex items-center gap-2"><LayoutGrid size={16} className="text-os-accent" /> Auto Arrange Icons</span>
                  {autoArrangeIcons ? <ToggleRight size={20} className="text-os-accent" /> : <ToggleLeft size={20} className="text-os-text-muted" />}
                </button>
                
                <button
                  onClick={() => setSnapToGrid(!snapToGrid)}
                  className="w-full flex items-center justify-between text-sm text-os-text hover:bg-white/5 p-2 rounded-os transition-colors"
                >
                  <span className="flex items-center gap-2"><Monitor size={16} className="text-os-accent" /> Snap to Grid</span>
                  {snapToGrid ? <ToggleRight size={20} className="text-os-accent" /> : <ToggleLeft size={20} className="text-os-text-muted" />}
                </button>
                
                <button
                  onClick={() => setShowLabels(!showLabels)}
                  className="w-full flex items-center justify-between text-sm text-os-text hover:bg-white/5 p-2 rounded-os transition-colors"
                >
                  <span className="flex items-center gap-2"><Monitor size={16} className="text-os-accent" /> Show Desktop Labels</span>
                  {showLabels ? <ToggleRight size={20} className="text-os-accent" /> : <ToggleLeft size={20} className="text-os-text-muted" />}
                </button>
              </div>
              
              <div className="bg-black/20 border border-os-window-border rounded-os p-4 flex flex-col justify-center items-center text-center">
                <p className="text-sm text-os-text-muted mb-4">Messed up your desktop? You can reset icon positions to default.</p>
                <button 
                  onClick={resetDesktop}
                  className="px-4 py-2 bg-red-500/20 text-red-400 hover:bg-red-500/30 border border-red-500/30 rounded-os text-sm transition-colors font-medium"
                >
                  Reset Desktop Layout
                </button>
              </div>
            </div>
          </section>

          {/* Desktop Stickers Manager */}
          {stickers.length > 0 && (
            <section>
              <h3 className="text-sm font-medium text-os-text-muted mb-4 uppercase tracking-wider">Active Stickers</h3>
              <div className="bg-black/20 border border-os-window-border rounded-os p-4">
                <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-4">
                  {stickers.map(sticker => (
                    <div key={sticker.id} className="relative group bg-black/40 border border-os-window-border rounded-os p-2 flex flex-col items-center justify-center gap-2 aspect-square">
                      <div className="text-4xl select-none" style={{ transform: `rotate(${sticker.rotation}deg) scale(${sticker.scale})` }}>
                        {sticker.type}
                      </div>
                      {isAuthenticated && (
                        <button 
                          onClick={() => removeSticker(sticker.id)}
                        className="absolute top-1 right-1 p-1 bg-red-500/80 text-white rounded-os opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <Trash2 size={12} />
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </section>
          )}

        </div>
      </div>
    </div>
  );
}
