import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Track, Playlist, Album, Artist } from '../types/audio';

export type RepeatMode = 'off' | 'all' | 'one';

interface AudioState {
  tracks: Track[];
  playlists: Playlist[];
  albums: Album[];
  artists: Artist[];
  
  queue: Track[];
  currentTrackId: string | null;
  isPlaying: boolean;
  volume: number;
  isMuted: boolean;
  progress: number;
  repeatMode: RepeatMode;
  isShuffle: boolean;
  miniPlayerVisible: boolean;
  
  // Actions
  setLibrary: (data: { tracks: Track[], playlists: Playlist[], albums: Album[], artists: Artist[] }) => void;
  playTrack: (track: Track, queue?: Track[]) => void;
  pause: () => void;
  play: () => void;
  next: () => void;
  previous: () => void;
  seek: (time: number) => void;
  setVolume: (volume: number) => void;
  toggleMute: () => void;
  toggleRepeat: () => void;
  toggleShuffle: () => void;
  addToQueue: (track: Track) => void;
  removeFromQueue: (index: number) => void;
  clearQueue: () => void;
  setQueue: (queue: Track[]) => void;
  setProgress: (time: number) => void;
  toggleMiniPlayer: () => void;
  toggleFavorite: (trackId: string) => void;
}

export const useAudioStore = create<AudioState>()(
  persist(
    (set, get) => ({
      tracks: [],
      playlists: [],
      albums: [],
      artists: [],
      
      queue: [],
      currentTrackId: null,
      isPlaying: false,
      volume: 1,
      isMuted: false,
      progress: 0,
      repeatMode: 'off',
      isShuffle: false,
      miniPlayerVisible: false,
      
      setLibrary: (data) => set(data),
      
      playTrack: (track, newQueue) => {
        set({ 
          currentTrackId: track.id, 
          isPlaying: true, 
          progress: 0,
          queue: newQueue || get().queue
        });
      },
      
      pause: () => set({ isPlaying: false }),
      
      play: () => {
        const { currentTrackId, queue } = get();
        if (currentTrackId) {
          set({ isPlaying: true });
        } else if (queue.length > 0) {
          set({ currentTrackId: queue[0].id, isPlaying: true, progress: 0 });
        }
      },
      
      next: () => {
        const { queue, currentTrackId, repeatMode, isShuffle } = get();
        if (!currentTrackId || queue.length === 0) return;
        
        if (repeatMode === 'one') {
          set({ progress: 0, isPlaying: true });
          return;
        }
        
        if (isShuffle) {
          const currentIndex = queue.findIndex(t => t.id === currentTrackId);
          let nextIndex;
          do {
            nextIndex = Math.floor(Math.random() * queue.length);
          } while (nextIndex === currentIndex && queue.length > 1);
          set({ currentTrackId: queue[nextIndex].id, progress: 0, isPlaying: true });
          return;
        }
        
        const currentIndex = queue.findIndex(t => t.id === currentTrackId);
        if (currentIndex < queue.length - 1) {
          set({ currentTrackId: queue[currentIndex + 1].id, progress: 0, isPlaying: true });
        } else if (repeatMode === 'all') {
          set({ currentTrackId: queue[0].id, progress: 0, isPlaying: true });
        } else {
          set({ isPlaying: false, progress: 0 });
        }
      },
      
      previous: () => {
        const { queue, currentTrackId, progress } = get();
        if (!currentTrackId || queue.length === 0) return;
        
        if (progress > 3) {
          set({ progress: 0 });
          return;
        }
        
        const currentIndex = queue.findIndex(t => t.id === currentTrackId);
        if (currentIndex > 0) {
          set({ currentTrackId: queue[currentIndex - 1].id, progress: 0, isPlaying: true });
        } else {
          set({ progress: 0 });
        }
      },
      
      seek: (time) => set({ progress: time }),
      setVolume: (volume) => set({ volume }),
      toggleMute: () => set(state => ({ isMuted: !state.isMuted })),
      
      toggleRepeat: () => set(state => {
        const modes: RepeatMode[] = ['off', 'all', 'one'];
        const nextIndex = (modes.indexOf(state.repeatMode) + 1) % modes.length;
        return { repeatMode: modes[nextIndex] };
      }),
      
      toggleShuffle: () => set(state => ({ isShuffle: !state.isShuffle })),
      
      addToQueue: (track) => set(state => ({ queue: [...state.queue, track] })),
      removeFromQueue: (index) => set(state => ({ 
        queue: state.queue.filter((_, i) => i !== index) 
      })),
      clearQueue: () => set({ queue: [] }),
      setQueue: (queue) => set({ queue }),
      setProgress: (progress) => set({ progress }),
      
      toggleMiniPlayer: () => set(state => ({ miniPlayerVisible: !state.miniPlayerVisible })),
      
      toggleFavorite: (trackId) => set(state => ({
        tracks: state.tracks.map(t => 
          t.id === trackId ? { ...t, favorite: !t.favorite } : t
        )
      }))
    }),
    {
      name: 'pinkwire-audio-store',
      partialize: (state) => ({
        queue: state.queue,
        currentTrackId: state.currentTrackId,
        volume: state.volume,
        isMuted: state.isMuted,
        repeatMode: state.repeatMode,
        isShuffle: state.isShuffle,
        miniPlayerVisible: state.miniPlayerVisible,
        tracks: state.tracks.filter(t => t.favorite) // Only persist favorites maybe? Actually, we'll initialize the library on boot, but keep favorite status.
      })
    }
  )
);
