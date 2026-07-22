import React, { useState, useRef } from 'react';
import { useMediaStore } from '../../../media/store/useMediaStore';
import { useAuthStore } from '../../../../store/useAuthStore';
import { X, Search, UploadCloud, Loader2 } from 'lucide-react';

export function MediaPickerModal({ onClose, onSelect }: { onClose: () => void, onSelect: (url: string) => void }) {
  const { items, addItem } = useMediaStore();
  const [search, setSearch] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    const formData = new FormData();
    formData.append('file', file);

    try {
      const token = useAuthStore.getState().token || '';
      const res = await fetch('/api/upload', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formData
      });

      if (res.ok) {
        const data = await res.json();
        
        // Add to media store
        const newItem = {
          id: crypto.randomUUID ? crypto.randomUUID() : Math.random().toString(36).substring(2, 9),
          url: data.url,
          displayName: file.name,
          mimeType: file.type,
          size: file.size,
          category: 'Photos' as const,
          dateAdded: new Date().toISOString(),
          tags: ['uploaded', 'journal'],
          favorite: false
        };
        addItem(newItem);
        
        onSelect(data.url);
      } else {
        console.error("Upload failed", await res.text());
        alert("Upload failed");
      }
    } catch (error) {
      console.error("Upload error", error);
      alert("Upload failed");
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const filteredItems = items.filter(item => 
    item.displayName.toLowerCase().includes(search.toLowerCase()) ||
    item.tags.some(t => t.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-os-os-os p-4">
      <div className="w-full max-w-4xl max-h-[80vh] bg-os-window-bg border border-os-window-border rounded-os shadow-os flex flex-col overflow-hidden">
        <div className="h-12 border-b border-os-window-border bg-os-titlebar-bg flex items-center justify-between px-4">
          <h2 className="font-semibold text-os-text">Select Media</h2>
          <div className="flex items-center gap-2">
            <input 
              type="file" 
              ref={fileInputRef}
              onChange={handleFileUpload}
              accept="image/*,video/*"
              className="hidden"
            />
            <button 
              onClick={() => fileInputRef.current?.click()}
              disabled={isUploading}
              className="flex items-center gap-1.5 px-3 py-1 bg-white/5 hover:bg-white/10 rounded-os text-sm text-os-text transition-colors disabled:opacity-50"
            >
              {isUploading ? <Loader2 size={14} className="animate-spin" /> : <UploadCloud size={14} />}
              Upload
            </button>
            <button onClick={onClose} className="p-1 hover:bg-white/10 rounded-os text-os-text-muted hover:text-os-text transition-colors">
              <X size={18} />
            </button>
          </div>
        </div>
        
        <div className="p-4 border-b border-os-window-border bg-os-window-bg/50">
          <div className="relative">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-os-text-muted" />
            <input 
              type="text" 
              placeholder="Search media..." 
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full bg-black/20 border border-os-window-border rounded-os pl-9 pr-4 py-2 text-sm text-os-text outline-none focus:border-os-accent/50"
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-4">
          {filteredItems.length === 0 ? (
            <div className="h-full flex items-center justify-center text-os-text-muted">
              No media found. Upload something in the Media Library first.
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {filteredItems.map(item => (
                <div 
                  key={item.id} 
                  onClick={() => onSelect(item.url)}
                  className="group relative aspect-square bg-black/40 rounded-os border border-os-window-border overflow-hidden cursor-pointer hover:border-os-accent transition-colors"
                >
                  {item.mimeType.startsWith('image/') ? (
                    <img src={item.url} alt={item.displayName} className="w-full h-full object-cover transition-transform group-hover:scale-105" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-os-text-muted break-all p-2 text-center text-xs">
                      {item.displayName}
                    </div>
                  )}
                  <div className="absolute inset-x-0 bottom-0 bg-black/80 p-2 transform translate-y-full group-hover:translate-y-0 transition-transform">
                    <p className="text-[10px] text-white truncate">{item.displayName}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
