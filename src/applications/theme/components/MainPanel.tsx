import React, { useState } from 'react';
import { useThemeStore } from '../store/useThemeStore';
import { useAuthStore } from '../../../store/useAuthStore';
import { ThemeGrid } from './ThemeGrid';
import { ThemePreview } from './ThemePreview';
import { ThemeEditor } from './ThemeEditor';
import { Plus } from 'lucide-react';

export function MainPanel() {
  const { previewThemeId, activeCategory } = useThemeStore();
  const { isAuthenticated } = useAuthStore();
  const [isEditing, setIsEditing] = useState(false);

  return (
    <div className="flex-1 flex flex-col min-w-0 relative bg-black/20">
      {!previewThemeId && !isEditing && (
        <div className="h-14 shrink-0 border-b border-os-window-border bg-os-titlebar-bg/70 px-4 md:px-6 flex items-center justify-between ml-12 md:ml-0">
          <h2 className="font-medium text-os-text capitalize">{activeCategory} Themes</h2>
          
          {isAuthenticated && (
            <button 
              onClick={() => setIsEditing(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-os text-sm font-medium bg-os-accent/20 text-os-accent hover:bg-os-accent hover:text-white transition-colors"
            >
              <Plus size={16} />
              <span className="hidden sm:inline">Create Theme</span>
            </button>
          )}
        </div>
      )}

      {isEditing ? (
        <ThemeEditor onClose={() => setIsEditing(false)} />
      ) : previewThemeId ? (
        <ThemePreview onEdit={() => setIsEditing(true)} />
      ) : (
        <ThemeGrid />
      )}
    </div>
  );
}
