import fs from 'fs';
let content = fs.readFileSync('src/applications/explorer/components/MainView/MainView.tsx', 'utf8');

if (!content.includes('useAuthStore')) {
  content = content.replace(
    "import { cn } from '../../../../utils/cn';",
    "import { cn } from '../../../../utils/cn';\nimport { useAuthStore } from '../../../../store/useAuthStore';"
  );
}

if (!content.includes('const { isAuthenticated }')) {
  content = content.replace(
    "export function MainView() {",
    "export function MainView() {\n  const { isAuthenticated } = useAuthStore();"
  );
}

content = content.replace(
  '            <button className="w-full text-left px-4 py-1.5 text-sm hover:bg-os-accent hover:text-white transition-colors text-os-text-muted">\n              Rename\n            </button>\n            <button className="w-full text-left px-4 py-1.5 text-sm hover:bg-os-accent hover:text-white transition-colors text-os-text-muted">\n              Delete\n            </button>',
  `            {isAuthenticated && (
              <>
                <button className="w-full text-left px-4 py-1.5 text-sm hover:bg-os-accent hover:text-white transition-colors text-os-text-muted">
                  Rename
                </button>
                <button className="w-full text-left px-4 py-1.5 text-sm hover:bg-red-500/80 hover:text-white transition-colors text-red-400">
                  Delete
                </button>
              </>
            )}`
);

fs.writeFileSync('src/applications/explorer/components/MainView/MainView.tsx', content);
