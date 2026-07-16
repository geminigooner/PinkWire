const fs = require('fs');
let content = fs.readFileSync('src/index.css', 'utf8');

if (!content.includes('font-family: var(--os-font)')) {
  content = content + '\n\nbody { font-family: var(--os-font); }\n';
}

fs.writeFileSync('src/index.css', content);
