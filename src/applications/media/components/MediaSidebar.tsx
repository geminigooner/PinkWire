import React from 'react';
import { useMediaStore, MediaCategory } from '../store/useMediaStore';
import { 
  Image as ImageIcon, Smile, Book, BookHeart, 
  Disc, User, Download, File, Star, X
} from 'lucide-react';
import { cn } from '../../../utils/cn';

const categories: { name: MediaCategory; icon: React.ElementType }[] = [
  { name: 'Memes', icon: Smile },
  { name: 'Wallpapers', icon: ImageIcon },
  { name: 'Journal', icon: Book },
  { name: 'Guestbook', icon: BookHeart },
  { name: 'Album Covers', icon: Disc },
  { name: 'Profile Photos', icon: User },
  { name: 'Downloads', icon: Download },
  { name: 'General', icon: File },
];

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export function MediaSidebar({ isOpen, onClose }: Props) {
  const { filterCategory, setFilterCategory, filterFavorite, setFilterFavorite, items } = useMediaStore();
  
  const getCategoryCount = (cat: MediaCategory) => items.filter(i => i.category === cat).length;
  const favoritesCount = items.filter(i => i.favorite).length;

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black/50 backdrop-blur-os-os-os md:hidden"
          onClick={onClose}
        />
      )}
      
      {/* Sidebar */}
      <div className={cn(
        "absolute md:relative z-50 h-full w-64 bg-os-titlebar-bg/90 md:bg-transparent backdrop-blur-os-os-os md:backdrop-blur-os-os-none border-r border-os-window-border flex flex-col transition-transform duration-300 ease-out",
        isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
      )}>
        <div className="flex items-center justify-between p-4 md:hidden border-b border-os-window-border">
          <span className="font-semibold">Media Library</span>
          <button onClick={onClose} className="p-1 hover:bg-white/10 rounded-os">
            <X size={18} />
          </button>
        </div>
        
        <div className="flex-1 overflow-y-auto p-3 space-y-6 custom-scrollbar">
          <div className="space-y-1">
            <button
              onClick={() => { setFilterCategory('All'); setFilterFavorite(false); if (isOpen) onClose(); }}
              className={cn(
                "w-full flex items-center justify-between px-3 py-2 rounded-os text-sm transition-colors",
                filterCategory === 'All' && !filterFavorite
                  ? "bg-os-accent text-white"
                  : "text-os-text hover:bg-white/5"
              )}
            >
              <div className="flex items-center gap-3">
                <ImageIcon size={16} className={filterCategory === 'All' && !filterFavorite ? "" : "text-os-accent"} />
                <span>All Media</span>
              </div>
              <span className="text-xs opacity-60">{items.length}</span>
            </button>
            <button
              onClick={() => { setFilterFavorite(true); setFilterCategory('All'); if (isOpen) onClose(); }}
              className={cn(
                "w-full flex items-center justify-between px-3 py-2 rounded-os text-sm transition-colors",
                filterFavorite
                  ? "bg-rose-500/20 text-rose-400"
                  : "text-os-text hover:bg-white/5"
              )}
            >
              <div className="flex items-center gap-3">
                <Star size={16} className={filterFavorite ? "fill-current" : "text-rose-400"} />
                <span>Favorites</span>
              </div>
              <span className="text-xs opacity-60">{favoritesCount}</span>
            </button>
          </div>
          
          <div>
            <h3 className="px-3 text-xs font-semibold text-os-text-muted uppercase tracking-wider mb-2">Categories</h3>
            <div className="space-y-1">
              {categories.map((cat) => {
                const Icon = cat.icon;
                const isSelected = filterCategory === cat.name && !filterFavorite;
                return (
                  <button
                    key={cat.name}
                    onClick={() => { setFilterCategory(cat.name); setFilterFavorite(false); if (isOpen) onClose(); }}
                    className={cn(
                      "w-full flex items-center justify-between px-3 py-2 rounded-os text-sm transition-colors",
                      isSelected
                        ? "bg-os-accent/20 text-os-accent"
                        : "text-os-text hover:bg-white/5"
                    )}
                  >
                    <div className="flex items-center gap-3">
                      <Icon size={16} className="opacity-70" />
                      <span>{cat.name}</span>
                    </div>
                    <span className="text-xs opacity-60">{getCategoryCount(cat.name)}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
