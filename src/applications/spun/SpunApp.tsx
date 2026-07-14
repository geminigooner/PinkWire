import React, { useEffect } from 'react';
import { Sidebar } from './components/Sidebar';
import { MainView } from './components/MainView';
import { BottomPlayer } from './components/BottomPlayer';
import { useAudioStore } from '../../store/useAudioStore';
import { SPUN_TRACKS, SPUN_ALBUMS, SPUN_ARTISTS, SPUN_PLAYLISTS } from './data/mockData';

export function SpunApp() {
  const setLibrary = useAudioStore(state => state.setLibrary);
  const tracks = useAudioStore(state => state.tracks);

  useEffect(() => {
    // Only load library if it's empty to preserve state like favorites if they were persisted
    // In our implementation, we'll just overwrite it for now since we want the mock data
    if (tracks.length === 0) {
      setLibrary({
        tracks: SPUN_TRACKS,
        albums: SPUN_ALBUMS,
        artists: SPUN_ARTISTS,
        playlists: SPUN_PLAYLISTS
      });
    }
  }, [tracks.length, setLibrary]);

  return (
    <div className="flex flex-col w-full h-full bg-[#1e1e1e] text-[#f5f5f5] overflow-hidden font-sans rounded-b-xl">
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <MainView />
      </div>
      <BottomPlayer />
    </div>
  );
}
