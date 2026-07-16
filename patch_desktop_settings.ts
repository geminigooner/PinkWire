import fs from 'fs';

let content = fs.readFileSync('src/applications/settings/components/DesktopSettings.tsx', 'utf8');

// Add import
if (!content.includes('useMediaStore')) {
  content = content.replace(
    "import { handleWallpaperUpload } from '../../../store/wallpaperManager';",
    "import { handleWallpaperUpload } from '../../../store/wallpaperManager';\nimport { useMediaStore } from '../../media/store/useMediaStore';"
  );
}

// Inside the component
if (!content.includes('const uploadedWallpapers = useMediaStore')) {
  content = content.replace(
    "const fileInputRef = useRef<HTMLInputElement>(null);",
    `const fileInputRef = useRef<HTMLInputElement>(null);
  const mediaItems = useMediaStore(state => state.items);
  const uploadedWallpapers = mediaItems.filter(item => item.category === 'Wallpapers').map(item => ({
    id: item.url,
    url: item.url,
    title: item.displayName,
    author: 'Uploaded'
  }));`
  );
  
  // Combine WALLPAPERS and uploadedWallpapers
  content = content.replace(
    "WALLPAPERS.map((wp)",
    "[...uploadedWallpapers, ...WALLPAPERS].map((wp)"
  );
  
  fs.writeFileSync('src/applications/settings/components/DesktopSettings.tsx', content);
}
