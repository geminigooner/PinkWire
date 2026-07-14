import React from 'react';
import { useExplorerStore } from '../../store/useExplorerStore';
import { cn } from '../../../../utils/cn';
import { 
  Heart, Monitor, FileText, Image as ImageIcon, 
  Download, Music, FolderGit2, Archive, BookOpen
} from 'lucide-react';

export function Sidebar() {
  const { currentPath, setCurrentPath, files } = useExplorerStore();
  
  const currentFolderId = currentPath[currentPath.length - 1];

  const favorites = [
    { id: 'desktop', icon: Monitor, label: 'Desktop' },
    { id: 'documents', icon: FileText, label: 'Documents' },
    { id: 'pictures', icon: ImageIcon, label: 'Pictures' },
    { id: 'downloads', icon: Download, label: 'Downloads' },
    { id: 'music', icon: Music, label: 'Music' },
    { id: 'projects', icon: FolderGit2, label: 'Projects' },
    { id: 'archive', icon: Archive, label: 'Archive' },
    { id: 'journal_dir', icon: BookOpen, label: 'Journal' },
  ];

  return (
    <div className="w-56 md:w-64 hidden sm:flex shrink-0 border-r border-os-window-border bg-os-window-bg/80 flex flex-col h-full overflow-y-auto scrollbar-hide">
      <div className="p-4 border-b border-os-window-border bg-os-titlebar-bg/50">
        <h2 className="font-semibold text-os-text text-sm flex items-center gap-2">
          <Heart size={14} className="text-os-accent" /> Favorites
        </h2>
      </div>

      <div className="p-2 space-y-0.5">
        {favorites.map(fav => {
          const isActive = currentFolderId === fav.id;
          const Icon = fav.icon;
          
          return (
            <button
              key={fav.id}
              onClick={() => setCurrentPath([fav.id])}
              className={cn(
                "w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-all text-left",
                isActive 
                  ? "bg-os-accent text-white shadow-sm" 
                  : "text-os-text-muted hover:bg-white/5 hover:text-os-text"
              )}
            >
              <Icon size={16} className={isActive ? "text-white" : "text-os-accent/70"} />
              <span className="font-medium truncate">{fav.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
