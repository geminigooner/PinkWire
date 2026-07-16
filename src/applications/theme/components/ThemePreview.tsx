import React from 'react';
import { useThemeStore } from '../store/useThemeStore';
import { useAuthStore } from '../../../store/useAuthStore';
import { ChevronLeft, Check, Heart, Edit2, Trash2, Copy } from 'lucide-react';
import { cn } from '../../../utils/cn';
import { formatDistanceToNow } from 'date-fns';

export function ThemePreview({ onEdit }: { onEdit: () => void }) {
  const { previewThemeId, setPreviewThemeId, themes, activeThemeId, applyTheme, updateTheme, deleteTheme, duplicateTheme } = useThemeStore();
  const { isAuthenticated } = useAuthStore();

  const theme = themes.find(t => t.id === previewThemeId);

  if (!theme) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center">
        <p className="text-os-text-muted">Theme not found.</p>
        <button onClick={() => setPreviewThemeId(null)} className="mt-4 text-os-accent hover:underline">Go back</button>
      </div>
    );
  }

  const isActive = activeThemeId === theme.id;

  const handleToggleFavorite = () => {
    updateTheme(theme.id, { favorite: !theme.favorite });
  };

  const handleDelete = () => {
    if (confirm('Are you sure you want to delete this theme?')) {
      deleteTheme(theme.id);
      setPreviewThemeId(null);
    }
  };
  
  const handleDuplicate = () => {
    duplicateTheme(theme.id);
    // Find the new theme (it's inserted at the top)
    const store = useThemeStore.getState();
    setPreviewThemeId(store.themes[0].id);
  };

  return (
    <div className="flex-1 flex flex-col min-w-0 bg-os-bg relative" style={{ backgroundColor: theme.primaryColor }}>
      {/* Abstract Background */}
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-40 blur-sm"
        style={{ 
          backgroundImage: theme.wallpaper.startsWith('http') || theme.wallpaper.startsWith('data:') ? `url('${theme.wallpaper}')` : 'none',
          background: !theme.wallpaper.startsWith('http') && !theme.wallpaper.startsWith('data:') ? theme.wallpaper : undefined
        }}
      />

      {/* Top Bar */}
      <div className="absolute top-0 inset-x-0 h-16 bg-gradient-to-b from-black/80 to-transparent z-10 flex items-center justify-between px-4">
        <button 
          onClick={() => setPreviewThemeId(null)}
          className="flex items-center gap-2 text-white hover:text-os-accent transition-colors bg-black/30 backdrop-blur-md px-3 py-1.5 rounded-lg"
        >
          <ChevronLeft size={20} />
          <span>Back</span>
        </button>
        
        <div className="flex items-center gap-2">
          {isAuthenticated && (
            <>
              <button onClick={handleDuplicate} title="Duplicate Theme" className="p-2 bg-black/30 backdrop-blur-md text-white hover:text-os-accent rounded-lg transition-colors">
                <Copy size={16} />
              </button>
              <button onClick={onEdit} title="Edit Theme" className="p-2 bg-black/30 backdrop-blur-md text-white hover:text-os-accent rounded-lg transition-colors">
                <Edit2 size={16} />
              </button>
              {!isActive && (
                <button onClick={handleDelete} title="Delete Theme" className="p-2 bg-black/30 backdrop-blur-md text-white hover:text-red-500 rounded-lg transition-colors">
                  <Trash2 size={16} />
                </button>
              )}
            </>
          )}
        </div>
      </div>

      {/* Main Preview Area */}
      <div className="flex-1 relative z-0 flex items-center justify-center p-4 md:p-12 overflow-y-auto">
        <div 
          className="w-full max-w-2xl border shadow-2xl flex flex-col overflow-hidden backdrop-blur-os pointer-events-none"
          style={{ 
            backgroundColor: theme.secondaryColor,
            borderColor: theme.borderColor,
            borderRadius: theme.radius,
            boxShadow: theme.shadow,
            backdropFilter: `blur(${theme.blur})`,
            fontFamily: theme.fontFamily
          }}
        >
          <div className="h-10 flex items-center px-4 gap-2 border-b" style={{ backgroundColor: theme.titlebarColor, borderColor: theme.borderColor }}>
            <div className="w-3 h-3 rounded-full bg-red-500/80" />
            <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
            <div className="w-3 h-3 rounded-full bg-green-500/80" />
            <div className="flex-1 text-center font-medium text-sm" style={{ color: theme.textColor }}>
              {theme.name} Preview
            </div>
          </div>
          <div className="p-6 md:p-8 space-y-6">
            <h1 className="text-3xl font-bold" style={{ color: theme.textColor }}>Typography & Colors</h1>
            <p className="text-base" style={{ color: theme.textMutedColor }}>
              This is how a standard paragraph looks in this theme. The primary accent color is applied to buttons and interactive elements.
            </p>
            
            <div className="flex gap-4">
              <button 
                className="px-6 py-2.5 font-medium transition-colors"
                style={{ 
                  backgroundColor: theme.accentColor, 
                  color: '#fff', 
                  borderRadius: theme.radius 
                }}
              >
                Primary Action
              </button>
              <button 
                className="px-6 py-2.5 font-medium transition-colors border"
                style={{ 
                  backgroundColor: 'transparent',
                  borderColor: theme.borderColor,
                  color: theme.textColor, 
                  borderRadius: theme.radius 
                }}
              >
                Secondary
              </button>
            </div>
            
            <div className="p-4 border rounded-os" style={{ borderColor: theme.borderColor, backgroundColor: theme.taskbarColor }}>
              <div className="flex justify-between items-center">
                <span style={{ color: theme.textColor }}>Notification Alert</span>
                <span className="text-xs px-2 py-1" style={{ backgroundColor: theme.accentColor, color: '#fff', borderRadius: theme.radius }}>New</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Info Bar */}
      <div className="bg-black/80 backdrop-blur-xl border-t border-white/10 p-4 md:p-6 shrink-0 z-10 relative text-white">
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row gap-6 items-start md:items-center justify-between">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[10px] uppercase tracking-wider font-bold text-black bg-white px-2 py-0.5 rounded-full">
                {theme.category}
              </span>
              <span className="text-xs text-white/50">
                Created {formatDistanceToNow(new Date(theme.createdDate), { addSuffix: true })}
              </span>
            </div>
            <h1 className="text-2xl font-bold truncate" style={{ fontFamily: theme.fontFamily }}>{theme.name}</h1>
            <p className="text-sm text-white/70 mt-1">{theme.description || 'No description provided.'}</p>
            
            <div className="flex items-center gap-4 mt-3">
              <p className="text-sm">
                <span className="text-white/50">By</span> <span className="font-medium">{theme.author}</span>
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-3 w-full md:w-auto">
            <button 
              onClick={handleToggleFavorite}
              className={cn(
                "p-3 rounded-xl border transition-all flex-shrink-0",
                theme.favorite 
                  ? "bg-rose-500/20 border-rose-500/50 text-rose-500" 
                  : "bg-white/10 border-white/20 hover:bg-white/20"
              )}
            >
              <Heart size={20} fill={theme.favorite ? "currentColor" : "none"} />
            </button>
            
            <button 
              onClick={() => applyTheme(theme.id)}
              disabled={isActive}
              className={cn(
                "flex-1 md:w-48 flex items-center justify-center gap-2 py-3 rounded-xl font-medium transition-all",
                isActive
                  ? "bg-white/20 text-white border border-white/30 cursor-default"
                  : "bg-os-accent text-white shadow-[0_0_15px_rgba(var(--os-accent),0.5)] hover:scale-105"
              )}
            >
              {isActive ? (
                <>
                  <Check size={18} />
                  <span>Current Theme</span>
                </>
              ) : (
                <span>Apply Theme</span>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
