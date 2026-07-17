const fs = require('fs');
let content = fs.readFileSync('src/taskbar/SystemTray.tsx', 'utf8');

if (!content.includes('SyncIndicator')) {
  content = content.replace(
    `import { Wifi, Volume2, BatteryMedium, Moon, Sun } from 'lucide-react';`,
    `import { Wifi, Volume2, BatteryMedium, Moon, Sun } from 'lucide-react';\nimport { SyncIndicator } from '../components/sync/SyncIndicator';`
  );
  
  content = content.replace(
    `<div className="flex items-center gap-1.5 opacity-70 group-hover:opacity-100 transition-opacity hidden sm:flex">\n        <Wifi size={14} />`,
    `<SyncIndicator />\n      <div className="flex items-center gap-1.5 opacity-70 group-hover:opacity-100 transition-opacity hidden sm:flex">\n        <Wifi size={14} />`
  );
  
  fs.writeFileSync('src/taskbar/SystemTray.tsx', content);
}
