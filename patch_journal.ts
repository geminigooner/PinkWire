import fs from 'fs';

let content = fs.readFileSync('src/applications/journal/components/MainPanel/Toolbar.tsx', 'utf8');

content = content.replace(
  "import { cn } from '../../../../utils/cn';",
  "import { cn } from '../../../../utils/cn';\nimport { useAuthStore } from '../../../../store/useAuthStore';\nimport { FilePlus } from 'lucide-react';"
);

content = content.replace(
  "const { activeArticleId, setActiveArticle, readingMode, toggleReadingMode, textSize, setTextSize, isSidebarOpen, setSidebarOpen } = useJournalStore();",
  "const { activeArticleId, setActiveArticle, readingMode, toggleReadingMode, textSize, setTextSize, isSidebarOpen, setSidebarOpen } = useJournalStore();\n  const { isAuthenticated } = useAuthStore();"
);

content = content.replace(
  '{!activeArticleId && (',
  `{!activeArticleId && isAuthenticated && (
          <button
            onClick={() => {/* Create functionality goes here */}}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium bg-os-accent/20 text-os-accent hover:bg-os-accent hover:text-white transition-colors mr-2"
          >
            <FilePlus size={16} />
            <span className="hidden sm:inline">New Entry</span>
          </button>
        )}
        {!activeArticleId && (`
);

fs.writeFileSync('src/applications/journal/components/MainPanel/Toolbar.tsx', content);

