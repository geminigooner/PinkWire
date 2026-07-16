import fs from 'fs';
let content = fs.readFileSync('src/taskbar/Taskbar.tsx', 'utf8');

// replace duplicate imports
content = content.replace(
  "import { useAuthStore } from '../store/useAuthStore';\nimport { useAuthStore } from '../store/useAuthStore';",
  "import { useAuthStore } from '../store/useAuthStore';"
);

fs.writeFileSync('src/taskbar/Taskbar.tsx', content);
