const fs = require('fs');
let content = fs.readFileSync('src/App.tsx', 'utf8');

if (!content.includes('SyncProvider')) {
  content = content.replace(
    `import { ThemeProvider } from './services/theme/ThemeProvider';`,
    `import { ThemeProvider } from './services/theme/ThemeProvider';\nimport { SyncProvider } from './components/sync/SyncProvider';`
  );
  
  content = content.replace(
    `<ThemeProvider>`,
    `<ThemeProvider>\n        <SyncProvider>`
  );
  
  content = content.replace(
    `</ThemeProvider>`,
    `</SyncProvider>\n      </ThemeProvider>`
  );
  
  fs.writeFileSync('src/App.tsx', content);
}
