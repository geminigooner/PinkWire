import fs from 'fs';

// Patch metadata.ts
let metaContent = fs.readFileSync('src/applications/metadata.ts', 'utf8');
if (!metaContent.includes("id: 'admin'")) {
  metaContent = metaContent.replace(
    "import { Zap, Book, Image as ImageIcon, Globe, Folder, Settings, Disc, BookHeart } from 'lucide-react';",
    "import { Zap, Book, Image as ImageIcon, Globe, Folder, Settings, Disc, BookHeart, Lock } from 'lucide-react';"
  );
  
  metaContent = metaContent.replace(
    "};",
    `  ,admin: {
    id: 'admin',
    name: 'Authentication',
    icon: Lock,
    defaultWidth: 400,
    defaultHeight: 500,
    minWidth: 400,
    minHeight: 500,
    resizable: false,
    draggable: true,
    instancePolicy: 'single'
  }
};`
  );
  fs.writeFileSync('src/applications/metadata.ts', metaContent);
}

// Patch registry.ts
let regContent = fs.readFileSync('src/applications/registry.ts', 'utf8');
if (!regContent.includes("admin: {")) {
  regContent = regContent.replace(
    "};",
    `  ,admin: {
    ...AppMetadataRegistry.admin,
    component: AdminLoginApp
  }
};`
  );
  fs.writeFileSync('src/applications/registry.ts', regContent);
}

