import fs from 'fs';

let tb = fs.readFileSync('src/taskbar/Taskbar.tsx', 'utf8');
tb = tb.replace(
  "import { useWindowStore } from '../store/useWindowStore';",
  "import { useWindowStore } from '../store/useWindowStore';\nimport { useAuthStore } from '../store/useAuthStore';"
);

tb = tb.replace(
  'onDoubleClick={() => {',
  'onClick={() => useWindowStore.getState().openWindow(\'admin\')} onDoubleClick={() => {'
);
fs.writeFileSync('src/taskbar/Taskbar.tsx', tb);

