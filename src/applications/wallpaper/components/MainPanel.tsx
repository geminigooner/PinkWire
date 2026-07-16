import React from 'react';
import { useWallpaperStore } from '../store/useWallpaperStore';
import { WallpaperGrid } from './WallpaperGrid';
import { WallpaperPreview } from './WallpaperPreview';
import { useAuthStore } from '../../../store/useAuthStore';
import { Plus } from 'lucide-react';
import { UploadModal } from './UploadModal';
import { useState } from 'react';

export function MainPanel() {
  const { previewWallpaperId, activeCategory } = useWallpaperStore();
  const { isAuthenticated } = useAuthStore();
  const [showUpload, setShowUpload] = useState(false);

  return (
    <div className="flex-1 flex flex-col min-w-0 relative">
      {!previewWallpaperId && (
        <div className="h-14 shrink-0 border-b border-os-window-border bg-os-titlebar-bg/70 px-4 md:px-6 flex items-center justify-between ml-12 md:ml-0">
          <h2 className="font-medium text-os-text capitalize">{activeCategory}</h2>
          
          {isAuthenticated && (
            <button onClick={() => setShowUpload(true)} className="flex items-center gap-1.5 px-3 py-1.5 rounded-os text-sm font-medium bg-os-accent/20 text-os-accent hover:bg-os-accent hover:text-white transition-colors">
              <Plus size={16} />
              <span className="hidden sm:inline">Upload</span>
            </button>
          )}
        </div>
      )}

      {previewWallpaperId ? <WallpaperPreview /> : <WallpaperGrid />}
      {showUpload && <UploadModal onClose={() => setShowUpload(false)} />}
    </div>
  );
}
