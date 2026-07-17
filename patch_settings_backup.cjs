const fs = require('fs');

// Patch SettingsSidebar.tsx
let sidebarContent = fs.readFileSync('src/applications/settings/components/SettingsSidebar.tsx', 'utf8');
if (!sidebarContent.includes('Database')) {
  sidebarContent = sidebarContent.replace(
    `import { Palette, Monitor, Volume2, Accessibility, Info, Trophy, UserCircle } from 'lucide-react';`,
    `import { Palette, Monitor, Volume2, Accessibility, Info, Trophy, UserCircle, Database } from 'lucide-react';`
  );
  
  sidebarContent = sidebarContent.replace(
    `{ id: 'about', label: 'About', icon: Info },`,
    `{ id: 'backup', label: 'Backup & Restore', icon: Database },\n    { id: 'about', label: 'About', icon: Info },`
  );
  
  fs.writeFileSync('src/applications/settings/components/SettingsSidebar.tsx', sidebarContent);
}

// Patch SettingsApp.tsx
let appContent = fs.readFileSync('src/applications/settings/SettingsApp.tsx', 'utf8');
if (!appContent.includes('BackupSettings')) {
  appContent = appContent.replace(
    `import { AboutSettings } from './components/AboutSettings';`,
    `import { AboutSettings } from './components/AboutSettings';\nimport { BackupSettings } from './components/BackupSettings';`
  );
  
  appContent = appContent.replace(
    `export type SettingsTab = 'profile' | 'appearance' | 'desktop' | 'sound' | 'accessibility' | 'about' | 'achievements';`,
    `export type SettingsTab = 'profile' | 'appearance' | 'desktop' | 'sound' | 'accessibility' | 'backup' | 'about' | 'achievements';`
  );
  
  appContent = appContent.replace(
    `{activeTab === 'accessibility' && <AccessibilitySettings />}`,
    `{activeTab === 'accessibility' && <AccessibilitySettings />}\n        {activeTab === 'backup' && <BackupSettings />}`
  );
  
  fs.writeFileSync('src/applications/settings/SettingsApp.tsx', appContent);
}
