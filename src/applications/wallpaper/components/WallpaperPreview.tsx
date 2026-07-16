import React from 'react';
import { useWallpaperStore } from '../store/useWallpaperStore';
import { useDesktopStore } from '../../../store/useDesktopStore';
import { useAuthStore } from '../../../store/useAuthStore';
import { ChevronLeft, Check, Heart, Edit2, Trash2, Maximize2, Tag, ChevronRight } from 'lucide-react';
import { useState } from 'react';
import { UploadModal } from './UploadModal';
import { cn } from '../../../utils/cn';
import { formatDistanceToNow } from 'date-fns';

export function WallpaperPreview() {
  const { previewWallpaperId, setPreviewWallpaperId, wallpapers, updateWallpaper, deleteWallpaper } = useWallpaperStore();
  const { wallpaper: currentWallpaper, setWallpaper } = useDesktopStore();
  const { isAuthenticated } = useAuthStore();

  const wallpaperIndex = wallpapers.findIndex(w => w.id === previewWallpaperId);
  const wallpaper = wallpapers[wallpaperIndex];
  
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [showEdit, setShowEdit] = useState(false);
  
  const handleNext = () => {
    if (wallpaperIndex < wallpapers.length - 1) {
      setPreviewWallpaperId(wallpapers[wallpaperIndex + 1].id);
    }
  };
  
  const handlePrev = () => {
    if (wallpaperIndex > 0) {
      setPreviewWallpaperId(wallpapers[wallpaperIndex - 1].id);
    }
  };
  
  const handleTouchStart = (e: React.TouchEvent) => setTouchStart(e.targetTouches[0].clientX);
  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStart === null) return;
    const touchEnd = e.changedTouches[0].clientX;
    const diff = touchStart - touchEnd;
    
    if (diff > 50) handleNext();
    else if (diff < -50) handlePrev();
    setTouchStart(null);
  };


  if (!wallpaper) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center">
        <p className="text-os-text-muted">Wallpaper not found.</p>
        <button onClick={() => setPreviewWallpaperId(null)} className="mt-4 text-os-accent hover:underline">Go back</button>
      </div>
    );
  }

  const isActive = currentWallpaper === wallpaper.url || currentWallpaper === wallpaper.id;

  const handleApply = () => {
    setWallpaper(wallpaper.url); // Use URL directly for immediate change
  };

  const handleToggleFavorite = () => {
    updateWallpaper(wallpaper.id, { favorite: !wallpaper.favorite });
  };

  const handleDelete = () => {
    if (confirm('Are you sure you want to delete this wallpaper?')) {
      deleteWallpaper(wallpaper.id);
      setPreviewWallpaperId(null);
    }
  };

  return (
    <div className="flex-1 flex flex-col min-w-0 bg-black/40">
      {/* Top Bar */}
      <div className="absolute top-0 inset-x-0 h-16 bg-gradient-to-b from-black/80 to-transparent z-10 flex items-center justify-between px-4">
        <button 
          onClick={() => setPreviewWallpaperId(null)}
          className="flex items-center gap-2 text-white hover:text-os-accent transition-colors bg-black/30 backdrop-blur-os-os-os px-3 py-1.5 rounded-os"
        >
          <ChevronLeft size={20} />
          <span>Back</span>
        </button>
        
        <div className="flex items-center gap-2">
          {isAuthenticated && (
            <>
              <button onClick={() => setShowEdit(true)} className="p-2 bg-black/30 backdrop-blur-os-os-os text-white hover:text-os-accent rounded-os transition-colors">
                <Edit2 size={16} />
              </button>
              <button onClick={handleDelete} className="p-2 bg-black/30 backdrop-blur-os-os-os text-white hover:text-red-500 rounded-os transition-colors">
                <Trash2 size={16} />
              </button>
            </>
          )}
        </div>
      </div>

      {/* Main Preview Area */}
      <div 
        className="flex-1 relative overflow-hidden flex items-center justify-center p-4 touch-pan-y"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {/* Blurred Background */}
        <div 
          className="absolute inset-0 bg-cover bg-center blur-xl opacity-30 scale-110"
          style={{ backgroundImage: `url('${wallpaper.url}')` }}
        />
        
        {/* Navigation Buttons */}
        {wallpaperIndex > 0 && (
          <button onClick={handlePrev} className="absolute left-4 z-20 p-2 md:p-3 bg-black/40 text-white hover:bg-black/70 rounded-full transition-colors hidden md:block">
            <ChevronLeft size={24} />
          </button>
        )}
        {wallpaperIndex < wallpapers.length - 1 && (
          <button onClick={handleNext} className="absolute right-4 z-20 p-2 md:p-3 bg-black/40 text-white hover:bg-black/70 rounded-full transition-colors hidden md:block">
            <ChevronRight size={24} />
          </button>
        )}

        {/* Actual Image */}
        <div className="relative z-0 max-w-full max-h-full rounded-os overflow-hidden shadow-os border border-white/10 group">
          <img 
            src={wallpaper.url} 
            alt={wallpaper.title}
            className="max-w-full max-h-full object-contain"
          />
        </div>
      </div>

      {/* Bottom Info Bar */}
      <div className="bg-os-window-bg/95 backdrop-blur-os-os-os border-t border-os-window-border p-4 md:p-6 shrink-0 z-10 relative">
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row gap-6 items-start md:items-center justify-between">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[10px] uppercase tracking-wider font-bold text-os-accent bg-os-accent/10 px-2 py-0.5 rounded-full">
                {wallpaper.category}
              </span>
              <span className="text-xs text-os-text-muted">
                {formatDistanceToNow(new Date(wallpaper.uploadedDate), { addSuffix: true })}
              </span>
            </div>
            <h1 className="text-2xl font-bold text-os-text truncate">{wallpaper.title}</h1>
            <p className="text-sm text-os-text-muted mt-1">{wallpaper.description || 'No description provided.'}</p>
            
            <div className="flex items-center gap-4 mt-3">
              <p className="text-sm">
                <span className="text-os-text-muted">By</span> <span className="font-medium">{wallpaper.artist}</span>
              </p>
              {wallpaper.tags.length > 0 && (
                <div className="flex items-center gap-2">
                  <Tag size={12} className="text-os-text-muted" />
                  <div className="flex gap-1">
                    {wallpaper.tags.slice(0, 3).map(tag => (
                      <span key={tag} className="text-xs text-os-text-muted hover:text-os-text cursor-pointer">#{tag}</span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
          
          <div className="flex items-center gap-3 w-full md:w-auto">
            <button 
              onClick={handleToggleFavorite}
              className={cn(
                "p-3 rounded-os border transition-all flex-shrink-0",
                wallpaper.favorite 
                  ? "bg-rose-500/10 border-rose-500/50 text-rose-500" 
                  : "bg-black/40 border-os-window-border text-os-text hover:bg-white/10"
              )}
            >
              <Heart size={20} fill={wallpaper.favorite ? "currentColor" : "none"} />
            </button>
            
            <button 
              onClick={handleApply}
              disabled={isActive}
              className={cn(
                "flex-1 md:w-48 flex items-center justify-center gap-2 py-3 rounded-os font-medium transition-all",
                isActive
                  ? "bg-os-accent/20 text-os-accent border border-os-accent/50 cursor-default"
                  : "bg-os-accent text-white hover:bg-os-accent-hover shadow-os hover:shadow-os-accent/25"
              )}
            >
              {isActive ? (
                <>
                  <Check size={18} />
                  <span>Applied</span>
                </>
              ) : (
                <span>Set Wallpaper</span>
              )}
            </button>
          </div>
        </div>
      </div>
    {showEdit && <UploadModal onClose={() => setShowEdit(false)} initialWallpaper={wallpaper} />}
    </div>
  );
}
