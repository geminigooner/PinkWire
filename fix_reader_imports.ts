import fs from 'fs';
let content = fs.readFileSync('src/applications/journal/components/Reader/Reader.tsx', 'utf8');

content = content.replace(
  "import { Music2, Play } from 'lucide-react';",
  "import { Music2, Play, Edit3, Trash2 } from 'lucide-react';\nimport { useAuthStore } from '../../../../store/useAuthStore';"
);

fs.writeFileSync('src/applications/journal/components/Reader/Reader.tsx', content);
