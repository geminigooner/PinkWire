import React, { useEffect, useState } from 'react';
import { useDesktopStore } from '../store/useDesktopStore';
import { resolveWallpaperUrl } from '../store/wallpaperManager';
import { cn } from '../utils/cn';

export function Wallpaper() {
  const { wallpaper, wallpaperFit, wallpaperBlur } = useDesktopStore();
  const [resolvedWallpaper, setResolvedWallpaper] = useState(wallpaper);
  
  useEffect(() => {
    resolveWallpaperUrl(wallpaper).then(setResolvedWallpaper);
  }, [wallpaper]);

  const isUrl = resolvedWallpaper.startsWith('http') || resolvedWallpaper.startsWith('url') || resolvedWallpaper.startsWith('data:');

  return (
    <div 
      className={cn(
        "absolute inset-0 -z-10 transition-all duration-1000 origin-center animate-[breathe_20s_ease-in-out_infinite_alternate]",
        !isUrl ? resolvedWallpaper : '',
        wallpaperBlur ? 'blur-md scale-105' : ''
      )}
      style={isUrl ? { 
        backgroundImage: resolvedWallpaper.startsWith('data:') || resolvedWallpaper.startsWith('http') ? `url('${resolvedWallpaper}')` : resolvedWallpaper,
        backgroundSize: wallpaperFit === 'center' ? 'auto' : wallpaperFit,
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      } : {}}
    />
  );
}
