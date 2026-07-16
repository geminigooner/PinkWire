import fs from 'fs';

// Add Admin App to AppRegistry
let registry = fs.readFileSync('src/applications/registry.ts', 'utf8');

if (!registry.includes('admin: {')) {
  registry = registry.replace(
    "import { SettingsApp } from './settings/SettingsApp';",
    "import { SettingsApp } from './settings/SettingsApp';\nimport { AdminLoginApp } from './auth/AdminLoginApp';\nimport { Lock } from 'lucide-react';"
  );

  registry = registry.replace(
    'export const appRegistry: Record<string, AppConfig> = {',
    'export const appRegistry: Record<string, AppConfig> = {\n  admin: {\n    id: \'admin\',\n    title: \'Authentication\',\n    icon: Lock,\n    component: AdminLoginApp,\n    defaultSize: { width: 400, height: 500 },\n    resizable: false\n  },'
  );
  fs.writeFileSync('src/applications/registry.ts', registry);
}
