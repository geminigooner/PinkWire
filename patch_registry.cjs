const fs = require('fs');

// Patch metadata.ts
let metadataContent = fs.readFileSync('src/applications/metadata.ts', 'utf8');
if (!metadataContent.includes('release')) {
  metadataContent = metadataContent.replace(
    `import { Zap, Book, Image as ImageIcon, Globe, Folder, Settings, Disc, BookHeart, Lock, Film, Monitor } from 'lucide-react';`,
    `import { Zap, Book, Image as ImageIcon, Globe, Folder, Settings, Disc, BookHeart, Lock, Film, Monitor, Rocket } from 'lucide-react';`
  );
  
  metadataContent = metadataContent.replace(
    `}
};`,
    `  },
  release: {
    id: 'release',
    name: 'Deployment Center',
    icon: Rocket,
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
  
  fs.writeFileSync('src/applications/metadata.ts', metadataContent);
}

// Patch registry.ts
let registryContent = fs.readFileSync('src/applications/registry.ts', 'utf8');
if (!registryContent.includes('release')) {
  registryContent = registryContent.replace(
    `import { ThemeApp } from './theme/ThemeApp';`,
    `import { ThemeApp } from './theme/ThemeApp';\nimport { ReleaseManagerApp } from './release/ReleaseManagerApp';`
  );
  
  registryContent = registryContent.replace(
    `  media: {
    ...AppMetadataRegistry.media,
    component: MediaApp
  }
};`,
    `  media: {
    ...AppMetadataRegistry.media,
    component: MediaApp
  },
  release: {
    ...AppMetadataRegistry.release,
    component: ReleaseManagerApp
  }
};`
  );
  
  fs.writeFileSync('src/applications/registry.ts', registryContent);
}
