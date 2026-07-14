import React from 'react';
import { useDesktopStore } from '../store/useDesktopStore';

export function Wallpaper() {
  const wallpaper = useDesktopStore(state => state.wallpaper);
  
  // If it starts with bg-, it's a tailwind class, otherwise it's a URL
  const isUrl = wallpaper.startsWith('http') || wallpaper.startsWith('url');

  return (
    <div 
      className={`absolute inset-0 -z-10 ${!isUrl ? wallpaper : ''}`}
      style={isUrl ? { backgroundImage: `url(${wallpaper})`, backgroundSize: 'cover', backgroundPosition: 'center' } : {}}
    />
  );
}
