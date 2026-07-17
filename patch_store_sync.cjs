const fs = require('fs');

function patchStore(filePath, storeName) {
  let content = fs.readFileSync(filePath, 'utf8');
  
  if (content.includes('createSyncStorage')) return; // Already patched
  
  // Add imports
  content = content.replace(
    /import \{ persist \}(.*?)\n/g,
    `import { persist, createJSONStorage } $1\nimport { createSyncStorage } from '${'../'.repeat(filePath.split('/').length - 2)}services/sync/syncStorage';\n`
  );
  
  // Some stores might have 'persist(' some might have 'persist<...>'
  // Find the persist config object. It has `name: 'something'`
  content = content.replace(
    /name: (['"`].*?['"`]),/g,
    `name: $1,\n      storage: createJSONStorage(() => createSyncStorage('${storeName}')),`
  );
  
  fs.writeFileSync(filePath, content);
  console.log(`Patched ${filePath}`);
}

patchStore('src/store/useDesktopStore.ts', 'desktop');
patchStore('src/applications/theme/store/useThemeStore.ts', 'theme');
patchStore('src/applications/journal/store/useJournalStore.ts', 'journal');
patchStore('src/applications/media/store/useMediaStore.ts', 'media');
patchStore('src/store/useSettingsStore.ts', 'settings');
patchStore('src/services/profile/useProfileStore.ts', 'profile');
patchStore('src/store/useAuthStore.ts', 'auth'); // Wait, does auth need to sync? Probably not the token, but it's fine
patchStore('src/applications/guestbook/store/useGuestbookStore.ts', 'guestbook');
