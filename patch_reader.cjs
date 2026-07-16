const fs = require('fs');
const path = 'src/applications/journal/components/Reader/Reader.tsx';
let content = fs.readFileSync(path, 'utf8');

content = content.replace(
  `const { articles, activeArticleId, textSize, readingMode } = useJournalStore();`,
  `const { articles, activeArticleId, textSize, readingMode, startEditing, deleteArticle } = useJournalStore();`
);

fs.writeFileSync(path, content);
