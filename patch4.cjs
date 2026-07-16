const fs = require('fs');
const path = 'src/store/useDesktopStore.ts';
let content = fs.readFileSync(path, 'utf8');

content = content.replace(
  `{ id: 'note-2', text: "don't trust past me", x: typeof window !== "undefined" ? window.innerWidth - 220 : 830, y: 300, color: "bg-pink-200 text-pink-900" }`,
  `{ id: 'note-2', text: "remember to hydrate the embeddings", x: typeof window !== "undefined" ? window.innerWidth - 220 : 830, y: 300, color: "bg-pink-200 text-pink-900" }`
);

fs.writeFileSync(path, content);
