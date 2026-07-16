const fs = require('fs');
const path = 'src/applications/wallpaper/store/useWallpaperStore.ts';
let content = fs.readFileSync(path, 'utf8');

content = content.replace(
  `  featured: boolean;\n  uploadedDate: string;`,
  `  favorite: boolean;\n  featured: boolean;\n  uploadedDate: string;`
);

content = content.replace(
  `    featured: true,\n    uploadedDate: new Date().toISOString()`,
  `    favorite: false,\n    featured: true,\n    uploadedDate: new Date().toISOString()`
);
content = content.replace(
  `    featured: true,\n    uploadedDate: new Date().toISOString()`,
  `    favorite: false,\n    featured: true,\n    uploadedDate: new Date().toISOString()`
);
content = content.replace(
  `    featured: false,\n    uploadedDate: new Date().toISOString()`,
  `    favorite: false,\n    featured: false,\n    uploadedDate: new Date().toISOString()`
);

fs.writeFileSync(path, content);
