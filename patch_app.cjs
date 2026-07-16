const fs = require('fs');
let content = fs.readFileSync('src/App.tsx', 'utf8');

if (!content.includes('ThemeProvider')) {
  content = content.replace(
    `import { OSProvider } from './components/OSProvider';`,
    `import { OSProvider } from './components/OSProvider';\nimport { ThemeProvider } from './services/theme/ThemeProvider';`
  );
  
  content = content.replace(
    `<OSProvider>`,
    `<OSProvider>\n      <ThemeProvider>`
  );
  
  content = content.replace(
    `</OSProvider>`,
    `</ThemeProvider>\n    </OSProvider>`
  );
  
  fs.writeFileSync('src/App.tsx', content);
}
