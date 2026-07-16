import fs from 'fs';

let content = fs.readFileSync('src/applications/settings/components/DesktopSettings.tsx', 'utf8');

content = content.replace(
  "import { LayoutGrid, Monitor, Star, Trash2, Heart, User, Calendar, Image as ImageIcon, ToggleLeft, ToggleRight } from 'lucide-react';",
  "import { LayoutGrid, Monitor, Star, Trash2, Heart, User, Calendar, Image as ImageIcon, ToggleLeft, ToggleRight, Upload } from 'lucide-react';\nimport { useAuthStore } from '../../../store/useAuthStore';"
);

content = content.replace(
  "const { wallpaper, setWallpaper, wallpapers, favoriteWallpapers, toggleFavoriteWallpaper, wallpaperFit, setWallpaperFit, wallpaperBlur, setWallpaperBlur, stickers, removeSticker, autoArrangeIcons, setAutoArrangeIcons, snapToGrid, setSnapToGrid, showLabels, setShowLabels, resetDesktop } = useDesktopStore();",
  "const { wallpaper, setWallpaper, wallpapers, favoriteWallpapers, toggleFavoriteWallpaper, wallpaperFit, setWallpaperFit, wallpaperBlur, setWallpaperBlur, stickers, removeSticker, autoArrangeIcons, setAutoArrangeIcons, snapToGrid, setSnapToGrid, showLabels, setShowLabels, resetDesktop } = useDesktopStore();\n  const { isAuthenticated } = useAuthStore();"
);

content = content.replace(
  '<h3 className="text-sm font-medium text-os-text-muted mb-4 uppercase tracking-wider">Wallpapers</h3>',
  `<div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-medium text-os-text-muted uppercase tracking-wider">Wallpapers</h3>
              {isAuthenticated && (
                <button
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-os-accent/20 text-os-accent hover:bg-os-accent hover:text-white transition-colors"
                >
                  <Upload size={14} />
                  Upload
                </button>
              )}
            </div>`
);
fs.writeFileSync('src/applications/settings/components/DesktopSettings.tsx', content);
