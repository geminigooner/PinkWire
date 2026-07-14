import React from 'react';
import { useSpunStore } from '../store/useSpunStore';
import { useAudioStore } from '../../../store/useAudioStore';
import { Play, Menu } from 'lucide-react';
import { cn } from '../../../utils/cn';

export function MainView() {
  const { currentView, selectedId, toggleSidebar } = useSpunStore();
  const tracks = useAudioStore(state => state.tracks);
  const playTrack = useAudioStore(state => state.playTrack);

  const renderContent = () => {
    switch (currentView) {
      case 'library':
        return (
          <div className="p-4 md:p-6">
            <h2 className="text-xl md:text-2xl font-bold mb-4 md:mb-6">Library</h2>
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 md:gap-4">
              {tracks.map(track => (
                <div key={track.id} className="bg-[#181818] rounded-md p-3 md:p-4 hover:bg-[#282828] transition-colors group cursor-pointer" onClick={() => playTrack(track, tracks)}>
                  <div className="relative aspect-square mb-3 md:mb-4">
                    <img src={track.coverArt} alt={track.title} className="w-full h-full object-cover rounded-md shadow-md" />
                    <button 
                      className="absolute bottom-2 right-2 w-8 h-8 md:w-10 md:h-10 rounded-full bg-os-accent text-white flex items-center justify-center shadow-lg opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity translate-y-0 md:translate-y-2 md:group-hover:translate-y-0"
                      onClick={(e) => {
                        e.stopPropagation();
                        playTrack(track, tracks);
                      }}
                    >
                      <Play size={16} fill="currentColor" className="ml-0.5 md:ml-1 md:w-5 md:h-5" />
                    </button>
                  </div>
                  <h3 className="font-semibold text-white text-sm md:text-base truncate">{track.title}</h3>
                  <p className="text-xs md:text-sm text-[#a7a7a7] truncate mt-0.5 md:mt-1">{track.artist}</p>
                </div>
              ))}
            </div>
          </div>
        );
      case 'playlists':
      case 'albums':
      case 'artists':
      case 'favorites':
      case 'recently_played':
      case 'album_detail':
      case 'playlist_detail':
      case 'artist_detail':
      default:
        return (
          <div className="flex-1 flex flex-col items-center justify-center text-[#a7a7a7] h-full p-4 text-center">
            <p>View: {currentView}</p>
            <p className="text-xs mt-2 opacity-50">Content coming soon</p>
          </div>
        );
    }
  };

  return (
    <div className="flex-1 bg-[#121212] overflow-y-auto flex flex-col min-h-0 relative">
      <div className="sticky top-0 z-10 bg-[#121212]/90 backdrop-blur flex items-center p-4 border-b border-transparent md:hidden">
        <button 
          onClick={toggleSidebar}
          className="p-2 -ml-2 text-white hover:bg-white/10 rounded-full transition-colors"
        >
          <Menu size={20} />
        </button>
        <span className="ml-2 font-bold text-white capitalize">{currentView.replace('_', ' ')}</span>
      </div>
      {renderContent()}
    </div>
  );
}
