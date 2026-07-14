import React, { useEffect, useRef } from 'react';
import { useAudioStore } from '../store/useAudioStore';
import { osEvents } from './notifications/EventBus';

export function AudioService() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  
  const currentTrackId = useAudioStore(state => state.currentTrackId);
  const queue = useAudioStore(state => state.queue);
  const isPlaying = useAudioStore(state => state.isPlaying);
  const volume = useAudioStore(state => state.volume);
  const isMuted = useAudioStore(state => state.isMuted);
  
  const play = useAudioStore(state => state.play);
  const pause = useAudioStore(state => state.pause);
  const next = useAudioStore(state => state.next);
  const previous = useAudioStore(state => state.previous);
  const setProgress = useAudioStore(state => state.setProgress);
  
  const tracks = useAudioStore(state => state.tracks);
  
  const currentTrack = tracks.find(t => t.id === currentTrackId);

  useEffect(() => {
    if (!audioRef.current) return;
    
    if (isPlaying) {
      audioRef.current.play().catch(e => {
        console.error("Playback failed:", e);
        pause();
      });
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying, currentTrackId, pause]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
      audioRef.current.muted = isMuted;
    }
  }, [volume, isMuted]);
  
  // Publish event when track changes
  useEffect(() => {
    if (currentTrack) {
      osEvents.publish({ 
        type: 'MusicStarted', 
        payload: { 
          trackId: currentTrack.id, 
          title: currentTrack.title, 
          artist: currentTrack.artist, 
          coverUrl: currentTrack.coverArt 
        } 
      });
    }
  }, [currentTrack]);
  
  useEffect(() => {
    if ('mediaSession' in navigator && currentTrack) {
      navigator.mediaSession.metadata = new MediaMetadata({
        title: currentTrack.title,
        artist: currentTrack.artist,
        album: currentTrack.album,
        artwork: [
          { src: currentTrack.coverArt, sizes: '512x512', type: 'image/jpeg' }
        ]
      });

      navigator.mediaSession.setActionHandler('play', play);
      navigator.mediaSession.setActionHandler('pause', pause);
      navigator.mediaSession.setActionHandler('previoustrack', previous);
      navigator.mediaSession.setActionHandler('nexttrack', next);
    }
  }, [currentTrack, play, pause, previous, next]);

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setProgress(audioRef.current.currentTime);
    }
  };

  const handleEnded = () => {
    next();
  };

  return (
    <audio
      ref={audioRef}
      src={currentTrack?.audioSource}
      onTimeUpdate={handleTimeUpdate}
      onEnded={handleEnded}
      preload="auto"
    />
  );
}
