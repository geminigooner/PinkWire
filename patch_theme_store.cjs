const fs = require('fs');
let content = fs.readFileSync('src/applications/theme/store/useThemeStore.ts', 'utf8');

content = content.replace(
  `name: \`\${source.name} (Copy)\`,\n      storage: createJSONStorage(() => createSyncStorage('theme')),`,
  `name: \`\${source.name} (Copy)\`,`
);

fs.writeFileSync('src/applications/theme/store/useThemeStore.ts', content);
