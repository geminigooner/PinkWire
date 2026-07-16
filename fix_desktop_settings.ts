import fs from 'fs';
let content = fs.readFileSync('src/applications/settings/components/DesktopSettings.tsx', 'utf8');

if (!content.includes('useAuthStore')) {
  content = content.replace(
    "import { cn } from '../../../utils/cn';",
    "import { cn } from '../../../utils/cn';\nimport { useAuthStore } from '../../../store/useAuthStore';"
  );
}

if (!content.includes('const { isAuthenticated }')) {
  content = content.replace(
    "export function DesktopSettings() {",
    "export function DesktopSettings() {\n  const { isAuthenticated } = useAuthStore();"
  );
}

fs.writeFileSync('src/applications/settings/components/DesktopSettings.tsx', content);
