import fs from 'fs';

// Patch metadata.ts
let metaContent = fs.readFileSync('src/applications/metadata.ts', 'utf8');
if (!metaContent.includes("id: 'media'")) {
  metaContent = metaContent.replace(
    "import { Zap, Book, Image as ImageIcon, Globe, Folder, Settings, Disc, BookHeart, Lock } from 'lucide-react';",
    "import { Zap, Book, Image as ImageIcon, Globe, Folder, Settings, Disc, BookHeart, Lock, Film } from 'lucide-react';"
  );
  
  metaContent = metaContent.replace(
    "};",
    `  ,media: {
    id: 'media',
    name: 'Media Library',
    icon: Film,
    defaultWidth: 900,
    defaultHeight: 650,
    minWidth: 700,
    minHeight: 500,
    resizable: true,
    draggable: true,
    instancePolicy: 'single'
  }
};`
  );
  fs.writeFileSync('src/applications/metadata.ts', metaContent);
}

// Patch registry.ts
let regContent = fs.readFileSync('src/applications/registry.ts', 'utf8');
if (!regContent.includes("media: {")) {
  regContent = regContent.replace(
    "import { AdminLoginApp } from './auth/AdminLoginApp';",
    "import { AdminLoginApp } from './auth/AdminLoginApp';\nimport { MediaApp } from './media/MediaApp';"
  );

  regContent = regContent.replace(
    "};",
    `  ,media: {
    ...AppMetadataRegistry.media,
    component: MediaApp
  }
};`
  );
  fs.writeFileSync('src/applications/registry.ts', regContent);
}

