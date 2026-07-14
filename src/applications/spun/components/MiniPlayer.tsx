import React, { useRef } from 'react';
import { motion } from 'motion/react';
import { useAudioStore } from '../../../store/useAudioStore';
import { useWindowStore } from '../../../store/useWindowStore';
import { Play, Pause, SkipBack, SkipForward, X, ExternalLink } from 'lucide-react';

export function MiniPlayer() {
  const { 
    miniPlayerVisible, toggleMiniPlayer, currentTrackId, tracks, 
    isPlaying, play, pause, next, previous
  } = useAudioStore();
  const { openWindow } = useWindowStore();
  
  const currentTrack = tracks.find(t => t.id === currentTrackId);
  
  if (!miniPlayerVisible) return null;

  return (
    <motion.div
      drag
      dragMomentum={false}
      dragConstraints={{ left: -window.innerWidth + 280, right: 0, top: -window.innerHeight + 200, bottom: 0 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9 }}
      className="absolute right-4 bottom-16 z-[60] w-64 bg-os-window-bg/95 backdrop-blur-xl border border-os-window-border rounded-xl shadow-2xl overflow-hidden pointer-events-auto"
    >
      <div className="flex items-center justify-between px-3 py-2 border-b border-white/5 bg-black/20">
        <span className="text-xs font-semibold text-os-text/70 uppercase tracking-wider">Now Playing</span>
        <div className="flex items-center gap-1">
          <button onClick={() => openWindow('spun')} className="p-1 text-os-text-muted hover:text-os-text hover:bg-white/10 rounded transition-colors">
            <ExternalLink size={12} />
          </button>
          <button onClick={toggleMiniPlayer} className="p-1 text-os-text-muted hover:text-white hover:bg-red-500 rounded transition-colors">
            <X size={12} />
          </button>
        </div>
      </div>
      
      {currentTrack ? (
        <div className="p-4 flex flex-col gap-4">
          <div className="flex gap-3 items-center">
            <img src={currentTrack.coverArt} alt={currentTrack.title} className="w-12 h-12 rounded shadow-md object-cover" />
            <div className="flex flex-col min-w-0">
              <span className="text-sm font-medium text-white truncate">{currentTrack.title}</span>
              <span className="text-xs text-os-text-muted truncate">{currentTrack.artist}</span>
            </div>
          </div>
          
          <div className="flex justify-center gap-4 items-center">
            <button onClick={previous} className="text-os-text-muted hover:text-white transition-colors">
              <SkipBack size={18} fill="currentColor" />
            </button>
            <button 
              onClick={isPlaying ? pause : play} 
              className="w-10 h-10 rounded-full bg-white text-black flex items-center justify-center hover:scale-105 transition-transform"
            >
              {isPlaying ? <Pause size={18} fill="currentColor" /> : <Play size={18} fill="currentColor" className="ml-0.5" />}
            </button>
            <button onClick={next} className="text-os-text-muted hover:text-white transition-colors">
              <SkipForward size={18} fill="currentColor" />
            </button>
          </div>
        </div>
      ) : (
        <div className="p-4 text-center text-sm text-os-text-muted">
          No track playing
        </div>
      )}
    </motion.div>
  );
}
