import React from 'react';
import { useAudioStore } from '../store/useAudioStore';
import { useWindowStore } from '../store/useWindowStore';
import { Music2 } from 'lucide-react';
import { cn } from '../utils/cn';

export function NowPlayingWidget() {
  const currentTrackId = useAudioStore(state => state.currentTrackId);
  const tracks = useAudioStore(state => state.tracks);
  const isPlaying = useAudioStore(state => state.isPlaying);
  const { openWindow } = useWindowStore();
  
  if (!currentTrackId) return null;
  
  const currentTrack = tracks.find(t => t.id === currentTrackId);
  if (!currentTrack) return null;

  return (
    <button 
      onClick={() => openWindow('spun')}
      className={cn(
        "hidden sm:flex items-center gap-2 px-3 h-9 rounded-lg transition-colors cursor-pointer max-w-[200px]",
        isPlaying ? "bg-os-accent/10 text-os-accent hover:bg-os-accent/20" : "text-os-text-muted hover:text-os-text hover:bg-white/10"
      )}
    >
      <Music2 size={14} className={isPlaying ? "animate-pulse" : ""} />
      <span className="text-xs truncate font-medium">{currentTrack.title}</span>
      <span className="text-xs truncate opacity-70 hidden md:inline">- {currentTrack.artist}</span>
    </button>
  );
}
