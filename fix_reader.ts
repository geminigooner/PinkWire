import fs from 'fs';

let content = fs.readFileSync('src/applications/journal/components/Reader/Reader.tsx', 'utf8');

content = content.replace(
  "import { useAuthStore } from '../../../store/useAuthStore';\nimport { Edit3, Trash2 } from 'lucide-react';",
  "import { useAuthStore } from '../../../../store/useAuthStore';\nimport { Edit3, Trash2, Music2, Play } from 'lucide-react';"
);

fs.writeFileSync('src/applications/journal/components/Reader/Reader.tsx', content);

