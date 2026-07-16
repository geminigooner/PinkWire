const fs = require('fs');
const path = 'src/desktop/Wallpaper.tsx';
let content = fs.readFileSync(path, 'utf8');

content = `
import React, { useEffect, useState } from 'react';
import { useDesktopStore } from '../store/useDesktopStore';
import { resolveWallpaperUrl } from '../store/wallpaperManager';
import { cn } from '../utils/cn';

export function Wallpaper() {
  const { wallpaper, wallpaperFit, wallpaperBlur } = useDesktopStore();
  
  const [currentWallpaper, setCurrentWallpaper] = useState(wallpaper);
  const [previousWallpaper, setPreviousWallpaper] = useState(wallpaper);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    resolveWallpaperUrl(wallpaper).then(url => {
      if (url !== currentWallpaper) {
        setPreviousWallpaper(currentWallpaper);
        setCurrentWallpaper(url);
        setIsTransitioning(true);
        
        setTimeout(() => {
          setIsTransitioning(false);
        }, 1000); // match duration
      }
    });
  }, [wallpaper, currentWallpaper]);

  const renderLayer = (url: string, opacityClass: string) => {
    const isUrl = url.startsWith('http') || url.startsWith('url') || url.startsWith('data:');
    
    return (
      <div 
        className={cn(
          "absolute inset-0 -z-10 transition-opacity duration-1000 origin-center animate-[breathe_20s_ease-in-out_infinite_alternate]",
          !isUrl ? url : '',
          wallpaperBlur ? 'blur-md scale-105' : '',
          opacityClass
        )}
        style={isUrl ? { 
          backgroundImage: url.startsWith('data:') || url.startsWith('http') ? \`url('\${url}')\` : url,
          backgroundSize: wallpaperFit === 'center' ? 'auto' : wallpaperFit,
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        } : {}}
      />
    );
  };

  return (
    <>
      {isTransitioning && renderLayer(previousWallpaper, "opacity-100")}
      {renderLayer(currentWallpaper, isTransitioning ? "opacity-0" : "opacity-100")}
    </>
  );
}
`;

fs.writeFileSync(path, content);
