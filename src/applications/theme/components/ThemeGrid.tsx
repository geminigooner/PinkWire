import React from 'react';
import { useThemeStore } from '../store/useThemeStore';
import { cn } from '../../../utils/cn';
import { Heart, Sparkles, CheckCircle2 } from 'lucide-react';

export function ThemeGrid() {
  const { themes, activeThemeId, activeCategory, searchQuery, setPreviewThemeId } = useThemeStore();

  const filtered = themes.filter(t => {
    if (activeCategory === 'Favorites' && !t.favorite) return false;
    if (activeCategory === 'Featured' && !t.featured) return false;
    if (activeCategory !== 'All' && activeCategory !== 'Favorites' && activeCategory !== 'Featured' && t.category !== activeCategory) return false;
    
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      if (!t.name.toLowerCase().includes(q) && 
          !t.author.toLowerCase().includes(q) && 
          !t.description.toLowerCase().includes(q)) {
        return false;
      }
    }
    return true;
  });

  return (
    <div className="flex-1 overflow-y-auto p-4 md:p-6">
      {filtered.length === 0 ? (
        <div className="h-full flex items-center justify-center text-os-text-muted">
          No themes found.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filtered.map(theme => {
            const isActive = activeThemeId === theme.id;
            
            return (
              <div
                key={theme.id}
                onClick={() => setPreviewThemeId(theme.id)}
                className={cn(
                  "group relative rounded-os overflow-hidden cursor-pointer border-2 transition-all duration-300 flex flex-col h-64",
                  isActive ? "border-os-accent shadow-[0_0_15px_rgba(var(--os-accent),0.3)]" : "border-os-window-border hover:border-os-text-muted"
                )}
                style={{ backgroundColor: theme.primaryColor }}
              >
                {/* Theme abstract preview graphic */}
                <div 
                  className="absolute inset-0 opacity-40 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                  style={{ 
                    backgroundImage: theme.wallpaper.startsWith('http') || theme.wallpaper.startsWith('data:') ? `url('${theme.wallpaper}')` : 'none',
                    background: !theme.wallpaper.startsWith('http') && !theme.wallpaper.startsWith('data:') ? theme.wallpaper : undefined
                  }}
                />
                
                {/* UI Mockup embedded in card */}
                <div className="relative flex-1 p-4 flex flex-col gap-3 pointer-events-none">
                  {/* Mock Window */}
                  <div 
                    className="w-full h-24 rounded-os shadow-os border flex flex-col overflow-hidden backdrop-blur-os"
                    style={{ 
                      backgroundColor: theme.secondaryColor,
                      borderColor: theme.borderColor,
                      borderRadius: theme.radius
                    }}
                  >
                    <div className="h-6 flex items-center px-2 gap-1.5" style={{ backgroundColor: theme.titlebarColor }}>
                      <div className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                      <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
                      <div className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
                    </div>
                    <div className="flex-1 p-3">
                      <div className="w-1/2 h-2 rounded-full mb-2" style={{ backgroundColor: theme.textColor, opacity: 0.8 }} />
                      <div className="w-3/4 h-2 rounded-full" style={{ backgroundColor: theme.textMutedColor, opacity: 0.5 }} />
                      
                      <div 
                        className="mt-4 px-2 py-1 text-[10px] w-max font-medium"
                        style={{ 
                          backgroundColor: theme.accentColor, 
                          color: '#fff', 
                          borderRadius: theme.radius 
                        }}
                      >
                        Button
                      </div>
                    </div>
                  </div>
                </div>

                {/* Info Bar */}
                <div className="relative bg-black/60 backdrop-blur-md p-4 border-t border-white/10 shrink-0">
                  <h3 className="text-white font-medium truncate" style={{ fontFamily: theme.fontFamily }}>{theme.name}</h3>
                  <p className="text-xs text-white/70 truncate">By {theme.author}</p>
                  
                  {isActive && (
                    <div className="absolute top-4 right-4 text-os-accent">
                      <CheckCircle2 size={18} />
                    </div>
                  )}
                </div>
                
                <div className="absolute top-2 right-2 flex gap-1">
                  {theme.featured && (
                    <div className="bg-black/50 backdrop-blur-md rounded-full p-1.5 text-yellow-500">
                      <Sparkles size={12} />
                    </div>
                  )}
                  {theme.favorite && (
                    <div className="bg-black/50 backdrop-blur-md rounded-full p-1.5 text-rose-500">
                      <Heart size={12} fill="currentColor" />
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
