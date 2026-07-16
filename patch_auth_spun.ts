import fs from 'fs';

let content = fs.readFileSync('src/applications/spun/components/MainView.tsx', 'utf8');

content = content.replace(
  "import { Play, Menu } from 'lucide-react';",
  "import { Play, Menu, Upload } from 'lucide-react';\nimport { useAuthStore } from '../../../store/useAuthStore';"
);

content = content.replace(
  "export function MainView() {",
  "export function MainView() {\n  const { isAuthenticated } = useAuthStore();"
);

content = content.replace(
  '<h2 className="text-xl md:text-2xl font-bold mb-4 md:mb-6">Library</h2>',
  `<div className="flex items-center justify-between mb-4 md:mb-6">
              <h2 className="text-xl md:text-2xl font-bold">Library</h2>
              {isAuthenticated && (
                <button
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium bg-os-accent text-white hover:bg-os-accent/80 transition-colors"
                >
                  <Upload size={16} />
                  <span className="hidden sm:inline">Upload</span>
                </button>
              )}
            </div>`
);
fs.writeFileSync('src/applications/spun/components/MainView.tsx', content);
