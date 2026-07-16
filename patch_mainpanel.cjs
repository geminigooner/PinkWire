const fs = require('fs');
const path = 'src/applications/wallpaper/components/MainPanel.tsx';
let content = fs.readFileSync(path, 'utf8');

content = content.replace(
  `import { Plus } from 'lucide-react';`,
  `import { Plus } from 'lucide-react';\nimport { UploadModal } from './UploadModal';\nimport { useState } from 'react';`
);

content = content.replace(
  `const { previewWallpaperId, activeCategory } = useWallpaperStore();
  const { isAuthenticated } = useAuthStore();`,
  `const { previewWallpaperId, activeCategory } = useWallpaperStore();
  const { isAuthenticated } = useAuthStore();
  const [showUpload, setShowUpload] = useState(false);`
);

content = content.replace(
  `<button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium bg-os-accent/20 text-os-accent hover:bg-os-accent hover:text-white transition-colors">`,
  `<button onClick={() => setShowUpload(true)} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium bg-os-accent/20 text-os-accent hover:bg-os-accent hover:text-white transition-colors">`
);

content = content.replace(
  `      {previewWallpaperId ? <WallpaperPreview /> : <WallpaperGrid />}
    </div>`,
  `      {previewWallpaperId ? <WallpaperPreview /> : <WallpaperGrid />}
      {showUpload && <UploadModal onClose={() => setShowUpload(false)} />}
    </div>`
);

fs.writeFileSync(path, content);
