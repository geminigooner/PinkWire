import React, { useEffect, useRef } from 'react';
import { useAudioStore } from '../store/useAudioStore';
import { useSettingsStore } from '../store/useSettingsStore';
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
  const { soundEnabled, sounds, volume: sysVolume } = useSettingsStore();
  
  const currentTrack = tracks.find(t => t.id === currentTrackId);

  // Play system sounds on EventBus events
  useEffect(() => {
    const playSystemSound = (type: string) => {
      if (!soundEnabled) return;
      // Synthesize a short beep for sounds since we don't have audio files
      try {
        const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.connect(gain);
        gain.connect(ctx.destination);
        gain.gain.value = (sysVolume / 100) * 0.1;

        if (type === 'Notification') {
          if (!sounds.notification) return;
          osc.type = 'sine';
          osc.frequency.setValueAtTime(600, ctx.currentTime);
          osc.frequency.exponentialRampToValueAtTime(1200, ctx.currentTime + 0.1);
          osc.start();
          osc.stop(ctx.currentTime + 0.15);
        } else if (type === 'Achievement') {
          if (!sounds.success) return;
          osc.type = 'triangle';
          osc.frequency.setValueAtTime(400, ctx.currentTime);
          osc.frequency.setValueAtTime(600, ctx.currentTime + 0.1);
          osc.frequency.setValueAtTime(800, ctx.currentTime + 0.2);
          osc.start();
          osc.stop(ctx.currentTime + 0.3);
        } else if (type === 'Error') {
          if (!sounds.error) return;
          osc.type = 'sawtooth';
          osc.frequency.setValueAtTime(200, ctx.currentTime);
          osc.frequency.linearRampToValueAtTime(100, ctx.currentTime + 0.2);
          osc.start();
          osc.stop(ctx.currentTime + 0.2);
        }
      } catch (e) {
        console.warn('AudioContext not supported or blocked', e);
      }
    };

    const unsubscribe = osEvents.subscribe((event) => {
      if (event.type === 'Toast') playSystemSound('Notification');
      if (event.type === 'AchievementUnlocked') playSystemSound('Achievement');
      if (event.type === 'AppError') playSystemSound('Error');
    });

    return unsubscribe;
  }, [soundEnabled, sounds, sysVolume]);

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
