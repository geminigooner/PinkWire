import fs from 'fs';
let content = fs.readFileSync('src/store/useDesktopStore.ts', 'utf8');

content = content.replace(
  '  wallpaperBlur: boolean;',
  `  wallpaperBlur: boolean;
  favoriteWallpapers: string[];`
);

content = content.replace(
  '  setWallpaperBlur: (blur: boolean) => void;',
  `  setWallpaperBlur: (blur: boolean) => void;
  toggleFavoriteWallpaper: (id: string) => void;`
);

content = content.replace(
  '      wallpaperBlur: false,',
  `      wallpaperBlur: false,
      favoriteWallpapers: [],`
);

content = content.replace(
  '      setWallpaperBlur: (wallpaperBlur) => set({ wallpaperBlur }),',
  `      setWallpaperBlur: (wallpaperBlur) => set({ wallpaperBlur }),
      toggleFavoriteWallpaper: (id) => set((state) => ({
        favoriteWallpapers: state.favoriteWallpapers.includes(id) 
          ? state.favoriteWallpapers.filter(w => w !== id)
          : [...state.favoriteWallpapers, id]
      })),`
);

content = content.replace(
  '        wallpaperBlur: state.wallpaperBlur,',
  `        wallpaperBlur: state.wallpaperBlur,
        favoriteWallpapers: state.favoriteWallpapers,`
);

fs.writeFileSync('src/store/useDesktopStore.ts', content);
