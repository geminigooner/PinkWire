const fs = require('fs');

// Patch SettingsSidebar.tsx
let sidebarContent = fs.readFileSync('src/applications/settings/components/SettingsSidebar.tsx', 'utf8');
if (!sidebarContent.includes('User Circle')) {
  sidebarContent = sidebarContent.replace(
    `import { Palette, Monitor, Volume2, Accessibility, Info, Trophy } from 'lucide-react';`,
    `import { Palette, Monitor, Volume2, Accessibility, Info, Trophy, UserCircle } from 'lucide-react';`
  );
  
  sidebarContent = sidebarContent.replace(
    `const tabs = [\n    { id: 'appearance',`,
    `const tabs = [\n    { id: 'profile', label: 'Account', icon: UserCircle },\n    { id: 'appearance',`
  );
  
  fs.writeFileSync('src/applications/settings/components/SettingsSidebar.tsx', sidebarContent);
}

// Patch SettingsApp.tsx
let appContent = fs.readFileSync('src/applications/settings/SettingsApp.tsx', 'utf8');
if (!appContent.includes('ProfileSettings')) {
  appContent = appContent.replace(
    `import { SettingsSidebar } from './components/SettingsSidebar';`,
    `import { SettingsSidebar } from './components/SettingsSidebar';\nimport { ProfileSettings } from './components/ProfileSettings';`
  );
  
  appContent = appContent.replace(
    `export type SettingsTab = 'appearance'`,
    `export type SettingsTab = 'profile' | 'appearance'`
  );
  
  appContent = appContent.replace(
    `const [activeTab, setActiveTab] = useState<SettingsTab>('appearance');`,
    `const [activeTab, setActiveTab] = useState<SettingsTab>('profile');`
  );
  
  appContent = appContent.replace(
    `{activeTab === 'appearance' && <AppearanceSettings />}`,
    `{activeTab === 'profile' && <ProfileSettings />}\n        {activeTab === 'appearance' && <AppearanceSettings />}`
  );
  
  fs.writeFileSync('src/applications/settings/SettingsApp.tsx', appContent);
}
