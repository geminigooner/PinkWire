const fs = require('fs');
const path = 'src/applications/registry.ts';
let content = fs.readFileSync(path, 'utf8');

if (!content.includes('WallpaperApp')) {
  content = content.replace(
    `import { GuestbookApp } from './guestbook/GuestbookApp';`,
    `import { GuestbookApp } from './guestbook/GuestbookApp';\nimport { WallpaperApp } from './wallpaper/WallpaperApp';`
  );

  content = content.replace(
    `  media: {`,
    `  wallpaper: {
    ...AppMetadataRegistry.wallpaper,
    component: WallpaperApp
  },
  media: {`
  );
  
  fs.writeFileSync(path, content);
}
