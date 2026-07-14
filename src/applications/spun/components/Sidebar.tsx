import React from 'react';
import { useSpunStore } from '../store/useSpunStore';
import { useAudioStore } from '../../../store/useAudioStore';
import { Music, ListMusic, Disc, Mic2, Heart, Clock } from 'lucide-react';
import { cn } from '../../../utils/cn';

export function Sidebar() {
  const { currentView, navigate, isSidebarOpen, toggleSidebar } = useSpunStore();
  const playlists = useAudioStore(state => state.playlists);

  return (
    <>
      {/* Mobile Overlay */}
      {isSidebarOpen && (
        <div 
          className="md:hidden fixed inset-0 bg-black/50 z-[40]" 
          onClick={toggleSidebar}
        />
      )}
      
      <div className={cn(
        "w-56 bg-[#181818] border-r border-[#282828] flex flex-col h-full overflow-y-auto absolute md:relative z-[50] transition-transform duration-300",
        isSidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0",
        !isSidebarOpen && "md:hidden"
      )}>
        <div className="p-4 flex flex-col gap-1">
          <h3 className="text-xs font-semibold text-[#a7a7a7] uppercase tracking-wider mb-2 px-2">Your Music</h3>
          {[
            { id: 'library', label: 'Library', icon: Music },
            { id: 'playlists', label: 'Playlists', icon: ListMusic },
            { id: 'albums', label: 'Albums', icon: Disc },
            { id: 'artists', label: 'Artists', icon: Mic2 },
          ].map(item => (
            <button
              key={item.id}
              onClick={() => {
                navigate(item.id as any);
                if (window.innerWidth < 768) toggleSidebar();
              }}
              className={cn(
                "flex items-center gap-3 px-2 py-2 rounded-md text-sm transition-colors",
                currentView === item.id 
                  ? "bg-[#282828] text-white font-medium" 
                  : "text-[#a7a7a7] hover:text-white hover:bg-[#282828]/50"
              )}
            >
              <item.icon size={18} />
              {item.label}
            </button>
          ))}
        </div>

        <div className="p-4 flex flex-col gap-1">
          <h3 className="text-xs font-semibold text-[#a7a7a7] uppercase tracking-wider mb-2 px-2">Collection</h3>
          {[
            { id: 'favorites', label: 'Favorites', icon: Heart },
            { id: 'recently_played', label: 'Recently Played', icon: Clock },
          ].map(item => (
            <button
              key={item.id}
              onClick={() => {
                navigate(item.id as any);
                if (window.innerWidth < 768) toggleSidebar();
              }}
              className={cn(
                "flex items-center gap-3 px-2 py-2 rounded-md text-sm transition-colors",
                currentView === item.id 
                  ? "bg-[#282828] text-white font-medium" 
                  : "text-[#a7a7a7] hover:text-white hover:bg-[#282828]/50"
              )}
            >
              <item.icon size={18} />
              {item.label}
            </button>
          ))}
        </div>

        <div className="p-4 flex flex-col gap-1 flex-1">
          <h3 className="text-xs font-semibold text-[#a7a7a7] uppercase tracking-wider mb-2 px-2">Playlists</h3>
          {playlists.map(playlist => (
            <button
              key={playlist.id}
              onClick={() => {
                navigate('playlist_detail', playlist.id);
                if (window.innerWidth < 768) toggleSidebar();
              }}
              className={cn(
                "flex items-center gap-3 px-2 py-2 rounded-md text-sm transition-colors truncate text-left",
                currentView === 'playlist_detail' && useSpunStore.getState().selectedId === playlist.id
                  ? "bg-[#282828] text-white font-medium" 
                  : "text-[#a7a7a7] hover:text-white hover:bg-[#282828]/50"
              )}
            >
              <span className="truncate">{playlist.name}</span>
            </button>
          ))}
        </div>
      </div>
    </>
  );
}
