const fs = require('fs');
const path = 'src/applications/wallpaper/components/WallpaperPreview.tsx';
let content = fs.readFileSync(path, 'utf8');

content = content.replace(
  `import { ChevronLeft, Check, Heart, Edit2, Trash2, Maximize2, Tag, ChevronRight } from 'lucide-react';
import { useState } from 'react';`,
  `import { ChevronLeft, Check, Heart, Edit2, Trash2, Maximize2, Tag, ChevronRight } from 'lucide-react';
import { useState } from 'react';
import { UploadModal } from './UploadModal';`
);

content = content.replace(
  `const [touchStart, setTouchStart] = useState<number | null>(null);`,
  `const [touchStart, setTouchStart] = useState<number | null>(null);
  const [showEdit, setShowEdit] = useState(false);`
);

content = content.replace(
  `<button className="p-2 bg-black/30 backdrop-blur-md text-white hover:text-os-accent rounded-lg transition-colors">
                <Edit2 size={16} />
              </button>`,
  `<button onClick={() => setShowEdit(true)} className="p-2 bg-black/30 backdrop-blur-md text-white hover:text-os-accent rounded-lg transition-colors">
                <Edit2 size={16} />
              </button>`
);

content = content.replace(
  `</div>
  );
}`,
  `{showEdit && <UploadModal onClose={() => setShowEdit(false)} initialWallpaper={wallpaper} />}
    </div>
  );
}`
);

fs.writeFileSync(path, content);

const uploadModalPath = 'src/applications/wallpaper/components/UploadModal.tsx';
let uploadModalContent = fs.readFileSync(uploadModalPath, 'utf8');

uploadModalContent = uploadModalContent.replace(
  `import { useWallpaperStore, INITIAL_CATEGORIES } from '../store/useWallpaperStore';`,
  `import { useWallpaperStore, INITIAL_CATEGORIES, Wallpaper } from '../store/useWallpaperStore';`
);

uploadModalContent = uploadModalContent.replace(
  `export function UploadModal({ onClose }: { onClose: () => void }) {`,
  `export function UploadModal({ onClose, initialWallpaper }: { onClose: () => void, initialWallpaper?: Wallpaper }) {`
);

uploadModalContent = uploadModalContent.replace(
  `  const { addWallpaper } = useWallpaperStore();`,
  `  const { addWallpaper, updateWallpaper } = useWallpaperStore();`
);

uploadModalContent = uploadModalContent.replace(
  `  const [title, setTitle] = useState('');
  const [artist, setArtist] = useState('PinkWire Design');
  const [description, setDescription] = useState('');
  const [url, setUrl] = useState('');
  const [category, setCategory] = useState(INITIAL_CATEGORIES[0]);
  const [tags, setTags] = useState('');`,
  `  const [title, setTitle] = useState(initialWallpaper?.title || '');
  const [artist, setArtist] = useState(initialWallpaper?.artist || 'PinkWire Design');
  const [description, setDescription] = useState(initialWallpaper?.description || '');
  const [url, setUrl] = useState(initialWallpaper?.url || '');
  const [category, setCategory] = useState(initialWallpaper?.category || INITIAL_CATEGORIES[0]);
  const [tags, setTags] = useState(initialWallpaper?.tags.join(', ') || '');`
);

uploadModalContent = uploadModalContent.replace(
  `    addWallpaper({`,
  `    if (initialWallpaper) {
      updateWallpaper(initialWallpaper.id, {
        title,
        artist,
        description,
        url,
        category,
        tags: tags.split(',').map(t => t.trim()).filter(Boolean)
      });
    } else {
      addWallpaper({`
);

uploadModalContent = uploadModalContent.replace(
  `      favorite: false
    });
    
    onClose();`,
  `      favorite: false
      });
    }
    
    onClose();`
);

fs.writeFileSync(uploadModalPath, uploadModalContent);
