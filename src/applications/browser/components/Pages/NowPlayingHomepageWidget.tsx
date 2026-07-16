import React from 'react';
import { useAudioStore } from '../../../../store/useAudioStore';
import { useWindowStore } from '../../../../store/useWindowStore';
import { Music2 } from 'lucide-react';
import { cn } from '../../../../utils/cn';

export function NowPlayingHomepageWidget() {
  const currentTrackId = useAudioStore(state => state.currentTrackId);
  const tracks = useAudioStore(state => state.tracks);
  const isPlaying = useAudioStore(state => state.isPlaying);
  const { openWindow } = useWindowStore();
  
  if (!currentTrackId) return null;
  
  const currentTrack = tracks.find(t => t.id === currentTrackId);
  if (!currentTrack) return null;

  return (
    <div className="mt-8">
      <button
        onClick={() => openWindow('spun')}
        className={cn(
          "flex items-center gap-4 bg-os-window-bg/40 border border-os-window-border rounded-os p-4 backdrop-blur-os-os-os hover:bg-os-window-bg/60 transition-all text-left group w-full max-w-sm",
          isPlaying ? "border-os-accent/30 shadow-[0_0_15px_rgba(236,72,153,0.15)]" : ""
        )}
      >
        <div className="relative w-12 h-12 rounded-os overflow-hidden shrink-0 shadow-os">
          <img src={currentTrack.coverArt} alt={currentTrack.title} className="w-full h-full object-cover" />
          {isPlaying && (
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
              <Music2 size={16} className="text-white animate-pulse" />
            </div>
          )}
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-xs text-os-accent font-medium mb-0.5 tracking-wider uppercase">Now Playing</p>
          <p className="text-sm font-semibold text-os-text truncate group-hover:text-white transition-colors">{currentTrack.title}</p>
          <p className="text-xs text-os-text-muted truncate">{currentTrack.artist}</p>
        </div>
      </button>
    </div>
  );
}
