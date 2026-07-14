import React, { useState } from 'react';
import { useAudioStore } from '../../../store/useAudioStore';
import { Play, Pause, SkipBack, SkipForward, Volume2, VolumeX, Repeat, Repeat1, Shuffle, ListMusic, Heart, Activity } from 'lucide-react';
import { cn } from '../../../utils/cn';

export function BottomPlayer() {
  const { 
    currentTrackId, tracks, isPlaying, volume, isMuted, progress, repeatMode, isShuffle,
    play, pause, next, previous, setVolume, toggleMute, toggleRepeat, toggleShuffle, seek, toggleFavorite
  } = useAudioStore();

  const [isScrubbing, setIsScrubbing] = useState(false);
  const [localProgress, setLocalProgress] = useState(progress);

  const currentTrack = tracks.find(t => t.id === currentTrackId);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = Math.floor(seconds % 60);
    return `${m}:${s.toString().padStart(2, '0')}`;
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = Number(e.target.value);
    setLocalProgress(val);
  };

  const handleSeekEnd = () => {
    seek(localProgress);
    setIsScrubbing(false);
  };

  const displayProgress = isScrubbing ? localProgress : progress;
  const duration = currentTrack?.duration || 0;

  return (
    <div className="h-16 md:h-20 bg-[#181818] border-t border-[#282828] px-2 md:px-4 flex items-center justify-between pointer-events-auto">
      {/* Track Info */}
      <div className="flex items-center gap-2 md:gap-4 w-1/3 md:w-1/4 md:min-w-[200px]">
        {currentTrack ? (
          <>
            <img src={currentTrack.coverArt} alt={currentTrack.title} className="w-10 h-10 md:w-14 md:h-14 rounded-md object-cover shadow-md shrink-0" />
            <div className="flex flex-col min-w-0">
              <span className="text-xs md:text-sm text-white font-medium truncate">{currentTrack.title}</span>
              <span className="text-[10px] md:text-xs text-[#a7a7a7] truncate">{currentTrack.artist}</span>
            </div>
            <button onClick={() => toggleFavorite(currentTrack.id)} className="ml-1 md:ml-2 text-[#a7a7a7] hover:text-white transition-colors hidden sm:block">
              <Heart size={14} className="md:w-4 md:h-4" fill={currentTrack.favorite ? "currentColor" : "none"} />
            </button>
          </>
        ) : (
          <div className="text-xs text-[#a7a7a7]">No track</div>
        )}
      </div>

      {/* Controls */}
      <div className="flex flex-col items-center flex-1 max-w-[50vw] md:max-w-[40vw] w-full gap-1 md:gap-2">
        <div className="flex items-center gap-3 md:gap-6">
          <button onClick={toggleShuffle} className={cn("hidden sm:block text-[#a7a7a7] hover:text-white transition-colors", isShuffle && "text-os-accent hover:text-os-accent-hover")}>
            <Shuffle size={14} className="md:w-4 md:h-4" />
          </button>
          <button onClick={previous} className="text-[#a7a7a7] hover:text-white transition-colors">
            <SkipBack size={16} className="md:w-5 md:h-5" fill="currentColor" />
          </button>
          <button 
            onClick={isPlaying ? pause : play} 
            className="w-7 h-7 md:w-8 md:h-8 rounded-full bg-white text-black flex items-center justify-center hover:scale-105 transition-transform"
          >
            {isPlaying ? <Pause size={14} className="md:w-4 md:h-4" fill="currentColor" /> : <Play size={14} className="md:w-4 md:h-4 ml-0.5" fill="currentColor" />}
          </button>
          <button onClick={next} className="text-[#a7a7a7] hover:text-white transition-colors">
            <SkipForward size={16} className="md:w-5 md:h-5" fill="currentColor" />
          </button>
          <button onClick={toggleRepeat} className={cn("hidden sm:block text-[#a7a7a7] hover:text-white transition-colors", repeatMode !== 'off' && "text-os-accent hover:text-os-accent-hover")}>
            {repeatMode === 'one' ? <Repeat1 size={14} className="md:w-4 md:h-4" /> : <Repeat size={14} className="md:w-4 md:h-4" />}
          </button>
        </div>
        
        <div className="flex items-center gap-2 w-full text-[10px] md:text-xs text-[#a7a7a7] font-mono">
          <span className="hidden sm:inline">{formatTime(displayProgress)}</span>
          <input 
            type="range" 
            min="0" 
            max={duration || 100} 
            value={displayProgress}
            onMouseDown={() => setIsScrubbing(true)}
            onChange={handleSeek}
            onMouseUp={handleSeekEnd}
            onTouchStart={() => setIsScrubbing(true)}
            onTouchEnd={handleSeekEnd}
            className="flex-1 h-1 bg-[#4d4d4d] rounded-full appearance-none [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-2.5 [&::-webkit-slider-thumb]:h-2.5 md:[&::-webkit-slider-thumb]:w-3 md:[&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:rounded-full hover:[&::-webkit-slider-thumb]:bg-os-accent cursor-pointer"
          />
          <span className="hidden sm:inline">{formatTime(duration)}</span>
        </div>
      </div>

      {/* Right Controls */}
      <div className="hidden md:flex items-center justify-end gap-4 w-1/4 min-w-[200px]">
        <button className="text-[#a7a7a7] hover:text-white transition-colors" title="Visualizer">
          <Activity size={16} />
        </button>
        <button className="text-[#a7a7a7] hover:text-white transition-colors" title="Queue">
          <ListMusic size={16} />
        </button>
        <div className="flex items-center gap-2">
          <button onClick={toggleMute} className="text-[#a7a7a7] hover:text-white transition-colors">
            {isMuted || volume === 0 ? <VolumeX size={16} /> : <Volume2 size={16} />}
          </button>
          <input 
            type="range" 
            min="0" max="1" step="0.01" 
            value={isMuted ? 0 : volume}
            onChange={(e) => setVolume(Number(e.target.value))}
            className="w-24 h-1 bg-[#4d4d4d] rounded-full appearance-none [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:rounded-full hover:[&::-webkit-slider-thumb]:bg-os-accent cursor-pointer"
          />
        </div>
      </div>
    </div>
  );
}
