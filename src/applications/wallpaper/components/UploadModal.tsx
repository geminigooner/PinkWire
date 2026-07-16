import React, { useState } from 'react';
import { useWallpaperStore, INITIAL_CATEGORIES, Wallpaper } from '../store/useWallpaperStore';
import { X, Upload, Check } from 'lucide-react';

export function UploadModal({ onClose, initialWallpaper }: { onClose: () => void, initialWallpaper?: Wallpaper }) {
  const { addWallpaper, updateWallpaper } = useWallpaperStore();
  
  const [title, setTitle] = useState(initialWallpaper?.title || '');
  const [artist, setArtist] = useState(initialWallpaper?.artist || 'PinkWire Design');
  const [description, setDescription] = useState(initialWallpaper?.description || '');
  const [url, setUrl] = useState(initialWallpaper?.url || '');
  const [category, setCategory] = useState(initialWallpaper?.category || INITIAL_CATEGORIES[0]);
  const [tags, setTags] = useState(initialWallpaper?.tags.join(', ') || '');
  
  const handleUpload = () => {
    if (!title || !url) return;
    
    if (initialWallpaper) {
      updateWallpaper(initialWallpaper.id, {
        title,
        artist,
        description,
        url,
        category,
        tags: tags.split(',').map(t => t.trim()).filter(Boolean)
      });
    } else {
      addWallpaper({
      title,
      artist,
      description,
      url,
      category,
      tags: tags.split(',').map(t => t.trim()).filter(Boolean),
      featured: false,
      favorite: false
      });
    }
    
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-os-os-os p-4">
      <div className="w-full max-w-lg bg-os-window-bg border border-os-window-border rounded-os shadow-os flex flex-col overflow-hidden">
        <div className="h-12 border-b border-os-window-border bg-os-titlebar-bg flex items-center justify-between px-4">
          <h2 className="font-semibold text-os-text">Upload Wallpaper</h2>
          <button onClick={onClose} className="p-1 hover:bg-white/10 rounded-os text-os-text-muted hover:text-os-text transition-colors">
            <X size={18} />
          </button>
        </div>
        
        <div className="p-6 space-y-4 max-h-[70vh] overflow-y-auto">
          <div className="space-y-1">
            <label className="text-xs uppercase tracking-wider text-os-text-muted font-medium">Title *</label>
            <input 
              type="text" 
              value={title}
              onChange={e => setTitle(e.target.value)}
              className="w-full bg-black/30 border border-os-window-border rounded-os px-3 py-2 text-sm text-os-text outline-none focus:border-os-accent/50"
            />
          </div>
          
          <div className="space-y-1">
            <label className="text-xs uppercase tracking-wider text-os-text-muted font-medium">Image URL *</label>
            <input 
              type="text" 
              placeholder="https://..."
              value={url}
              onChange={e => setUrl(e.target.value)}
              className="w-full bg-black/30 border border-os-window-border rounded-os px-3 py-2 text-sm text-os-text outline-none focus:border-os-accent/50"
            />
          </div>
          
          <div className="space-y-1">
            <label className="text-xs uppercase tracking-wider text-os-text-muted font-medium">Artist</label>
            <input 
              type="text" 
              value={artist}
              onChange={e => setArtist(e.target.value)}
              className="w-full bg-black/30 border border-os-window-border rounded-os px-3 py-2 text-sm text-os-text outline-none focus:border-os-accent/50"
            />
          </div>
          
          <div className="space-y-1">
            <label className="text-xs uppercase tracking-wider text-os-text-muted font-medium">Description</label>
            <textarea 
              value={description}
              onChange={e => setDescription(e.target.value)}
              className="w-full bg-black/30 border border-os-window-border rounded-os px-3 py-2 text-sm text-os-text outline-none focus:border-os-accent/50 resize-none h-20"
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs uppercase tracking-wider text-os-text-muted font-medium">Category</label>
              <select 
                value={category}
                onChange={e => setCategory(e.target.value)}
                className="w-full bg-black/30 border border-os-window-border rounded-os px-3 py-2 text-sm text-os-text outline-none focus:border-os-accent/50"
              >
                {INITIAL_CATEGORIES.map(c => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>
            
            <div className="space-y-1">
              <label className="text-xs uppercase tracking-wider text-os-text-muted font-medium">Tags (comma separated)</label>
              <input 
                type="text" 
                value={tags}
                onChange={e => setTags(e.target.value)}
                className="w-full bg-black/30 border border-os-window-border rounded-os px-3 py-2 text-sm text-os-text outline-none focus:border-os-accent/50"
              />
            </div>
          </div>
        </div>
        
        <div className="h-16 border-t border-os-window-border bg-os-titlebar-bg/50 px-4 flex items-center justify-end gap-3">
          <button onClick={onClose} className="px-4 py-2 rounded-os text-sm font-medium text-os-text-muted hover:text-os-text hover:bg-white/10 transition-colors">
            Cancel
          </button>
          <button 
            onClick={handleUpload}
            disabled={!title || !url}
            className="flex items-center gap-2 px-4 py-2 rounded-os text-sm font-medium bg-os-accent text-white hover:bg-os-accent-hover disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <Check size={16} />
            <span>Save Wallpaper</span>
          </button>
        </div>
      </div>
    </div>
  );
}
