const fs = require('fs');
let content = fs.readFileSync('src/taskbar/StartMenuProfile.tsx', 'utf8');

// Add imports
if (!content.includes('useProfileStore')) {
  content = content.replace(
    `import { useWindowStore } from '../store/useWindowStore';`,
    `import { useWindowStore } from '../store/useWindowStore';\nimport { useProfileStore } from '../services/profile/useProfileStore';\nimport { useAuthStore } from '../store/useAuthStore';\nimport { useSyncStore } from '../services/sync/useSyncStore';`
  );
  
  // Replace the component body
  content = content.replace(
    /const wallpaper = useDesktopStore\(state => state\.wallpaper\);[\s\S]*?(?=const openWindow =)/,
    `const wallpaper = useDesktopStore(state => state.wallpaper);
  const theme = useSettingsStore(state => state.theme);
  const { profile } = useProfileStore();
  const { isAuthenticated } = useAuthStore();
  const { status: syncStatus } = useSyncStore();
  `
  );
  
  content = content.replace(
    `{getGreeting()}, Amanda`,
    `{getGreeting()}, {isAuthenticated ? profile.displayName : 'Visitor'}`
  );
  
  content = content.replace(
    `<User size={24} className="text-os-accent" />`,
    `{isAuthenticated && profile.profilePicture ? <img src={profile.profilePicture} alt="Profile" className="w-full h-full object-cover rounded-full" /> : <User size={24} className="text-os-accent" />}`
  );
  
  content = content.replace(
    `<span className="flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-green-400"></span>
            Online
          </span>`,
    `<span className="flex items-center gap-1">
            <span className={\`w-1.5 h-1.5 rounded-full \${isAuthenticated ? 'bg-pink-400' : 'bg-gray-400'}\`}></span>
            {isAuthenticated ? (syncStatus === 'synced' ? 'Synced' : syncStatus === 'syncing' ? 'Syncing...' : 'Online') : 'Local Mode'}
          </span>`
  );
  
  fs.writeFileSync('src/taskbar/StartMenuProfile.tsx', content);
}
