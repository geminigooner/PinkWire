import React, { useState } from 'react';
import { MediaItem, useMediaStore, MediaCategory } from '../store/useMediaStore';
import { useAuthStore } from '../../../store/useAuthStore';
import { X, Trash2, Save, Star, Calendar, File, LayoutTemplate } from 'lucide-react';
import { cn } from '../../../utils/cn';

const CATEGORIES: MediaCategory[] = [
  'Memes', 'Wallpapers', 'Journal', 'Guestbook', 'Album Covers', 'Profile Photos', 'Downloads', 'General'
];

interface Props {
  item: MediaItem;
  onClose: () => void;
}

export function MediaEditModal({ item, onClose }: Props) {
  const { updateMedia, deleteMedia, toggleFavorite } = useMediaStore();
  const { isAuthenticated } = useAuthStore();
  
  const [displayName, setDisplayName] = useState(item.displayName);
  const [category, setCategory] = useState<MediaCategory>(item.category);
  const [description, setDescription] = useState(item.description || '');
  const [tags, setTags] = useState(item.tags.join(', '));
  
  const [isEditing, setIsEditing] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const handleSave = () => {
    updateMedia(item.id, {
      displayName,
      category,
      description,
      tags: tags.split(',').map(t => t.trim()).filter(Boolean)
    });
    setIsEditing(false);
  };

  const handleDelete = async () => {
    // Attempt backend delete if URL is a server path
    if (item.url.startsWith('/uploads/')) {
      try {
        const token = sessionStorage.getItem('admin_token') || localStorage.getItem('admin_token') || 'amanda-admin-session';
        await fetch(`/api/upload/${item.filename}`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
      } catch (err) {
        console.error("Failed to delete file from server:", err);
      }
    }
    deleteMedia(item.id);
    onClose();
  };

  const formatSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-os-os-os animate-in fade-in duration-200">
      <div className="bg-os-window-bg border border-os-window-border rounded-os shadow-os w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col md:flex-row">
        
        {/* Preview Area */}
        <div className="w-full md:w-3/5 bg-black/50 flex flex-col relative border-b md:border-b-0 md:border-r border-os-window-border">
          <div className="absolute top-4 right-4 z-10 flex gap-2">
            {(isAuthenticated || item.favorite) && (
              <button 
                onClick={() => { if (isAuthenticated) toggleFavorite(item.id); }}
                className={cn(
                  "p-2 rounded-os backdrop-blur-os-os-os transition-colors",
                  item.favorite ? "bg-rose-500/20 text-rose-500 hover:bg-rose-500/30 border border-rose-500/30" : "bg-black/40 text-white/70 hover:text-white hover:bg-black/60 border border-white/10"
                )}
                title={item.favorite ? "Remove from Favorites" : "Add to Favorites"}
              >
                <Star size={18} className={item.favorite ? "fill-current" : ""} />
              </button>
            )}
            <button 
              onClick={onClose}
              className="p-2 bg-black/40 hover:bg-black/60 text-white/70 hover:text-white rounded-os backdrop-blur-os-os-os transition-colors border border-white/10 md:hidden"
            >
              <X size={18} />
            </button>
          </div>
          
          <div className="flex-1 flex items-center justify-center p-4 md:p-8 min-h-[300px]">
            <img 
              src={item.url} 
              alt={item.displayName} 
              className="max-w-full max-h-full object-contain drop-shadow-os rounded-os" 
            />
          </div>
        </div>
        
        {/* Details Area */}
        <div className="w-full md:w-2/5 flex flex-col bg-os-window-bg overflow-y-auto custom-scrollbar">
          <div className="p-4 border-b border-os-window-border flex items-center justify-between sticky top-0 bg-os-window-bg/95 backdrop-blur-os-os z-10 hidden md:flex">
            <h3 className="font-semibold text-os-text">Media Details</h3>
            <div className="flex gap-2">
              <button onClick={onClose} className="p-1 hover:bg-white/10 rounded-os transition-colors">
                <X size={20} />
              </button>
            </div>
          </div>
          
          <div className="p-6 space-y-6">
            {showDeleteConfirm ? (
              <div className="bg-red-500/10 border border-red-500/20 rounded-os p-4 text-center">
                <p className="text-red-400 text-sm font-medium mb-4">Are you sure you want to delete this media permanently?</p>
                <div className="flex gap-2 justify-center">
                  <button 
                    onClick={() => setShowDeleteConfirm(false)}
                    className="px-4 py-1.5 bg-white/5 hover:bg-white/10 text-os-text rounded-os text-sm transition-colors"
                  >
                    Cancel
                  </button>
                  <button 
                    onClick={handleDelete}
                    className="px-4 py-1.5 bg-red-500 hover:bg-red-600 text-white rounded-os text-sm font-medium transition-colors"
                  >
                    Yes, Delete
                  </button>
                </div>
              </div>
            ) : null}

            {isEditing && isAuthenticated ? (
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-medium text-os-text-muted uppercase tracking-wider mb-1.5">Display Name</label>
                  <input
                    type="text"
                    value={displayName}
                    onChange={e => setDisplayName(e.target.value)}
                    className="w-full bg-black/40 border border-os-window-border rounded-os px-3 py-2 text-sm text-os-text focus:outline-none focus:border-os-accent/50 focus:ring-1 focus:ring-os-accent/50"
                  />
                </div>
                
                <div>
                  <label className="block text-xs font-medium text-os-text-muted uppercase tracking-wider mb-1.5">Category</label>
                  <select
                    value={category}
                    onChange={e => setCategory(e.target.value as MediaCategory)}
                    className="w-full bg-black/40 border border-os-window-border rounded-os px-3 py-2 text-sm text-os-text focus:outline-none focus:border-os-accent/50 focus:ring-1 focus:ring-os-accent/50 appearance-none"
                  >
                    {CATEGORIES.map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-xs font-medium text-os-text-muted uppercase tracking-wider mb-1.5">Tags (comma separated)</label>
                  <input
                    type="text"
                    value={tags}
                    onChange={e => setTags(e.target.value)}
                    className="w-full bg-black/40 border border-os-window-border rounded-os px-3 py-2 text-sm text-os-text focus:outline-none focus:border-os-accent/50 focus:ring-1 focus:ring-os-accent/50"
                  />
                </div>
                
                <div>
                  <label className="block text-xs font-medium text-os-text-muted uppercase tracking-wider mb-1.5">Description</label>
                  <textarea
                    value={description}
                    onChange={e => setDescription(e.target.value)}
                    className="w-full bg-black/40 border border-os-window-border rounded-os px-3 py-2 text-sm text-os-text focus:outline-none focus:border-os-accent/50 focus:ring-1 focus:ring-os-accent/50 resize-none h-24"
                  />
                </div>
                
                <div className="flex gap-2 pt-2">
                  <button 
                    onClick={() => setIsEditing(false)}
                    className="flex-1 px-4 py-2 bg-white/5 hover:bg-white/10 text-os-text rounded-os text-sm font-medium transition-colors"
                  >
                    Cancel
                  </button>
                  <button 
                    onClick={handleSave}
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-os-accent hover:bg-os-accent/90 text-white rounded-os text-sm font-medium transition-colors shadow-os"
                  >
                    <Save size={16} /> Save Changes
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-6">
                <div>
                  <div className="flex items-start justify-between gap-4 mb-2">
                    <h2 className="text-xl font-bold text-os-text leading-tight">{item.displayName}</h2>
                  </div>
                  <div className="flex items-center gap-2 mb-4">
                    <span className="text-xs uppercase tracking-wider px-2 py-0.5 rounded-full bg-os-accent/20 text-os-accent border border-os-accent/30 font-medium">
                      {item.category}
                    </span>
                  </div>
                  {item.description ? (
                    <p className="text-sm text-os-text-muted leading-relaxed">{item.description}</p>
                  ) : (
                    <p className="text-sm text-os-text-muted/50 italic">No description provided.</p>
                  )}
                </div>
                
                {item.tags.length > 0 && (
                  <div>
                    <h4 className="text-xs font-medium text-os-text-muted uppercase tracking-wider mb-2">Tags</h4>
                    <div className="flex flex-wrap gap-2">
                      {item.tags.map(tag => (
                        <span key={tag} className="text-xs px-2 py-1 bg-black/40 border border-os-window-border rounded-os text-os-text">
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
                
                <div className="space-y-3 bg-black/20 p-4 rounded-os border border-os-window-border">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-os-text-muted flex items-center gap-2"><File size={14} /> Filename</span>
                    <span className="text-os-text truncate max-w-[150px]" title={item.filename}>{item.filename}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-os-text-muted flex items-center gap-2"><LayoutTemplate size={14} /> Type</span>
                    <span className="text-os-text">{item.mimeType}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-os-text-muted flex items-center gap-2"><File size={14} /> Size</span>
                    <span className="text-os-text">{formatSize(item.size)}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-os-text-muted flex items-center gap-2"><Calendar size={14} /> Uploaded</span>
                    <span className="text-os-text">{new Date(item.dateUploaded).toLocaleDateString()}</span>
                  </div>
                </div>

                {isAuthenticated && !showDeleteConfirm && (
                  <div className="flex gap-2 pt-4">
                    <button 
                      onClick={() => setIsEditing(true)}
                      className="flex-1 px-4 py-2 bg-white/5 hover:bg-white/10 text-os-text rounded-os text-sm font-medium transition-colors"
                    >
                      Edit Info
                    </button>
                    <button 
                      onClick={() => setShowDeleteConfirm(true)}
                      className="flex items-center justify-center gap-2 px-4 py-2 bg-red-500/10 hover:bg-red-500/20 text-red-400 rounded-os text-sm font-medium transition-colors border border-red-500/20"
                    >
                      <Trash2 size={16} /> Delete
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
