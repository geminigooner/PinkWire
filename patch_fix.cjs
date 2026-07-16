const fs = require('fs');
const path = 'src/applications/wallpaper/store/useWallpaperStore.ts';
let content = fs.readFileSync(path, 'utf8');

content = content.replace(/favorite: false,\n    favorite: false,/g, 'favorite: false,');

fs.writeFileSync(path, content);
