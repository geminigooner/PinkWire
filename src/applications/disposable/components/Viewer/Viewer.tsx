import React, { useEffect, useState } from 'react';
import { useDisposableStore } from '../../store/useDisposableStore';
import { X, ChevronLeft, ChevronRight, ZoomIn, ZoomOut, RotateCw, Maximize } from 'lucide-react';
import { cn } from '../../../../utils/cn';
import { motion, AnimatePresence } from 'motion/react';

export function Viewer() {
  const { viewerPhotoUrl, closeViewer, photos, openViewer, slideshowActive, toggleSlideshow } = useDisposableStore();
  const [zoom, setZoom] = useState(1);
  const [rotation, setRotation] = useState(0);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!viewerPhotoUrl) return;
      if (e.key === 'Escape') closeViewer();
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'ArrowLeft') handlePrev();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [viewerPhotoUrl, photos]);

  // Slideshow
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (slideshowActive && viewerPhotoUrl) {
      timer = setInterval(() => {
        handleNext();
      }, 3000);
    }
    return () => clearInterval(timer);
  }, [slideshowActive, viewerPhotoUrl, photos]);

  if (!viewerPhotoUrl) return null;

  // Find index if it's in our library
  const currentIndex = photos.findIndex(p => p.url === viewerPhotoUrl);
  
  const handleNext = () => {
    if (currentIndex === -1 || photos.length === 0) return;
    const nextIdx = (currentIndex + 1) % photos.length;
    openViewer(photos[nextIdx].url);
    resetTransform();
  };

  const handlePrev = () => {
    if (currentIndex === -1 || photos.length === 0) return;
    const prevIdx = (currentIndex - 1 + photos.length) % photos.length;
    openViewer(photos[prevIdx].url);
    resetTransform();
  };

  const resetTransform = () => {
    setZoom(1);
    setRotation(0);
  };

  return (
    <AnimatePresence>
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="absolute inset-0 z-50 bg-black/95 backdrop-blur-os-os-os flex items-center justify-center overflow-hidden"
      >
        {/* Top Controls */}
        <div className="absolute top-0 left-0 w-full p-4 flex justify-between items-center bg-gradient-to-b from-black/80 to-transparent z-10">
          <div className="text-white/80 text-xs font-medium">
            {currentIndex !== -1 ? `${currentIndex + 1} of ${photos.length}` : 'External Image'}
          </div>
          
          <div className="flex items-center gap-2">
            <button onClick={() => setZoom(z => Math.max(0.5, z - 0.25))} className="p-2 text-white/70 hover:text-white bg-black/20 hover:bg-white/10 rounded-full transition-colors">
              <ZoomOut size={16} />
            </button>
            <button onClick={() => setZoom(z => Math.min(3, z + 0.25))} className="p-2 text-white/70 hover:text-white bg-black/20 hover:bg-white/10 rounded-full transition-colors">
              <ZoomIn size={16} />
            </button>
            <button onClick={() => setRotation(r => r + 90)} className="p-2 text-white/70 hover:text-white bg-black/20 hover:bg-white/10 rounded-full transition-colors">
              <RotateCw size={16} />
            </button>
            <button onClick={() => setZoom(1)} className="p-2 text-white/70 hover:text-white bg-black/20 hover:bg-white/10 rounded-full transition-colors">
              <Maximize size={16} />
            </button>
            <div className="w-px h-4 bg-white/20 mx-2" />
            <button onClick={closeViewer} className="p-2 text-white/70 hover:text-white hover:bg-red-500/80 rounded-full transition-colors">
              <X size={16} />
            </button>
          </div>
        </div>

        {/* Navigation */}
        {currentIndex !== -1 && (
          <>
            <button onClick={handlePrev} className="absolute left-4 top-1/2 -translate-y-1/2 p-3 text-white/50 hover:text-white bg-black/20 hover:bg-white/10 rounded-full transition-all z-10">
              <ChevronLeft size={24} />
            </button>
            <button onClick={handleNext} className="absolute right-4 top-1/2 -translate-y-1/2 p-3 text-white/50 hover:text-white bg-black/20 hover:bg-white/10 rounded-full transition-all z-10">
              <ChevronRight size={24} />
            </button>
          </>
        )}

        {/* Image */}
        <motion.div 
          className="relative max-w-[90%] max-h-[90%] flex items-center justify-center"
          animate={{ scale: zoom, rotate: rotation }}
          transition={{ type: "spring", damping: 25, stiffness: 200 }}
        >
          <img 
            src={viewerPhotoUrl} 
            alt="Viewer" 
            className="max-w-full max-h-[85vh] object-contain shadow-os rounded-os"
          />
        </motion.div>
        
        {/* Bottom Info (if exists) */}
        {currentIndex !== -1 && (
          <div className="absolute bottom-0 left-0 w-full p-6 bg-gradient-to-t from-black/90 to-transparent flex flex-col items-center justify-end pointer-events-none">
            <h3 className="text-white text-lg font-medium">{photos[currentIndex].title}</h3>
            {photos[currentIndex].caption && (
              <p className="text-white/70 text-sm mt-1">{photos[currentIndex].caption}</p>
            )}
          </div>
        )}
      </motion.div>
    </AnimatePresence>
  );
}
