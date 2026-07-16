import fs from 'fs';

let content = fs.readFileSync('src/applications/journal/components/Reader/Reader.tsx', 'utf8');

content = content.replace(
  "import { useAudioStore } from '../../../store/useAudioStore';",
  "import { useAudioStore } from '../../../store/useAudioStore';\nimport { useAuthStore } from '../../../store/useAuthStore';\nimport { Edit3, Trash2 } from 'lucide-react';"
);

content = content.replace(
  "const openWindow = useWindowStore(state => state.openWindow);",
  "const openWindow = useWindowStore(state => state.openWindow);\n  const { isAuthenticated } = useAuthStore();"
);

content = content.replace(
  '<header className="mb-12 text-center">',
  `<header className="mb-12 text-center relative">
          {isAuthenticated && (
            <div className="absolute top-0 right-0 flex gap-2">
              <button title="Edit Post" className="p-2 bg-os-window-bg/80 hover:bg-os-accent/20 text-os-text-muted hover:text-os-accent rounded-lg transition-colors border border-os-window-border hover:border-os-accent/50 backdrop-blur-sm shadow-sm">
                <Edit3 size={16} />
              </button>
              <button title="Delete Post" className="p-2 bg-os-window-bg/80 hover:bg-red-500/20 text-os-text-muted hover:text-red-400 rounded-lg transition-colors border border-os-window-border hover:border-red-500/50 backdrop-blur-sm shadow-sm">
                <Trash2 size={16} />
              </button>
            </div>
          )}`
);
fs.writeFileSync('src/applications/journal/components/Reader/Reader.tsx', content);

