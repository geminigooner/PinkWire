const fs = require('fs');
const path = 'src/applications/wallpaper/components/WallpaperPreview.tsx';
let content = fs.readFileSync(path, 'utf8');

content = content.replace(
  `import { ChevronLeft, Check, Heart, Edit2, Trash2, Maximize2, Tag } from 'lucide-react';`,
  `import { ChevronLeft, Check, Heart, Edit2, Trash2, Maximize2, Tag, ChevronRight } from 'lucide-react';\nimport { useState } from 'react';`
);

content = content.replace(
  `const wallpaper = wallpapers.find(w => w.id === previewWallpaperId);`,
  `const wallpaperIndex = wallpapers.findIndex(w => w.id === previewWallpaperId);
  const wallpaper = wallpapers[wallpaperIndex];
  
  const [touchStart, setTouchStart] = useState<number | null>(null);
  
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
`
);

content = content.replace(
  `<div className="flex-1 relative overflow-hidden flex items-center justify-center p-4">`,
  `<div 
        className="flex-1 relative overflow-hidden flex items-center justify-center p-4 touch-pan-y"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >`
);

content = content.replace(
  `        {/* Actual Image */}`,
  `        {/* Navigation Buttons */}
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

        {/* Actual Image */}`
);

fs.writeFileSync(path, content);
