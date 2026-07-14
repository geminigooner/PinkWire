import fs from 'fs';
let content = fs.readFileSync('src/index.css', 'utf8');
content = content.replace(/--animate-breathe[\s\S]*?scale\(1\.05\); \};/, '');
content += `\n@keyframes breathe { 0% { transform: scale(1.0); } 100% { transform: scale(1.05); } }`;
fs.writeFileSync('src/index.css', content);
