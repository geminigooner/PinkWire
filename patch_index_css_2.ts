import fs from 'fs';

let content = fs.readFileSync('src/index.css', 'utf8');

content = content.replace(
  `  @keyframes breathe {
    0% { transform: scale(1.0); }
    100% { transform: scale(1.05); }
  }`,
  `  --keyframes-breathe-0: { transform: scale(1.0); };
  --keyframes-breathe-100: { transform: scale(1.05); };`
);

// Actually, in Tailwind CSS v4:
// --animate-breathe: breathe 20s ease-in-out infinite alternate;
// @keyframes breathe { ... } should be placed outside @theme.

fs.writeFileSync('src/index.css', content);
