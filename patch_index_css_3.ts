import fs from 'fs';

let content = fs.readFileSync('src/index.css', 'utf8');

content = content.replace(/@theme \{[\s\S]*?--animate-breathe: breathe 20s ease-in-out infinite alternate;[\s\S]*?--keyframes-breathe-100: \{ transform: scale\(1\.05\); \};/, 
`@theme {
  --animate-breathe: breathe 20s ease-in-out infinite alternate;
  --keyframes-breathe-0: { transform: scale(1.0); };
  --keyframes-breathe-100: { transform: scale(1.05); };`);

fs.writeFileSync('src/index.css', content);
