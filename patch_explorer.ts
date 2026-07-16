import fs from 'fs';
let content = fs.readFileSync('src/applications/explorer/components/Toolbar/Toolbar.tsx', 'utf8');

content = content.replace(
  "import { ViewMode } from '../../types';",
  "import { ViewMode } from '../../types';\nimport { useAuthStore } from '../../../../store/useAuthStore';\nimport { Upload } from 'lucide-react';"
);

content = content.replace(
  'export function Toolbar() {',
  'export function Toolbar() {\n  const { isAuthenticated } = useAuthStore();'
);

content = content.replace(
  '<div className="bg-black/40 border border-os-window-border rounded-md px-3 py-1.5 text-xs text-os-text flex items-center min-w-[200px] max-w-[400px]">',
  `<div className="bg-black/40 border border-os-window-border rounded-md px-3 py-1.5 text-xs text-os-text flex items-center min-w-[200px] max-w-[400px]">`
);

content = content.replace(
  '            {currentFolder?.name || currentFolderId}\n          </div>\n        </div>',
  `            {currentFolder?.name || currentFolderId}
          </div>
          {isAuthenticated && (
            <button className="ml-2 flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-os-accent text-white hover:bg-os-accent/80 transition-colors">
              <Upload size={14} /> Upload
            </button>
          )}
        </div>`
);

fs.writeFileSync('src/applications/explorer/components/Toolbar/Toolbar.tsx', content);
