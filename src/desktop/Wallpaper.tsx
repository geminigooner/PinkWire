import React from 'react';
import { useDesktopStore } from '../store/useDesktopStore';
import { cn } from '../utils/cn';

export function Wallpaper() {
  const { wallpaper, wallpaperFit, wallpaperBlur } = useDesktopStore();
  
  // If it starts with bg- or url, or data:
  const isUrl = wallpaper.startsWith('http') || wallpaper.startsWith('url') || wallpaper.startsWith('data:');

  return (
    <div 
      className={cn(
        "absolute inset-0 -z-10 transition-all duration-1000",
        !isUrl ? wallpaper : '',
        wallpaperBlur ? 'blur-md scale-105' : ''
      )}
      style={isUrl ? { 
        backgroundImage: `url(${wallpaper})`, 
        backgroundSize: wallpaperFit === 'fill' ? '100% 100%' : wallpaperFit, 
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      } : {}}
    />
  );
}
