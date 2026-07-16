import fs from 'fs';
let content = fs.readFileSync('server.ts', 'utf8');

content = content.replace(
  "const filePath = path.join(uploadDir, filename);",
  "const filePath = path.join(uploadDir, filename as string);"
);

content = content.replace(
  "if (filename.includes('..') || filename.includes('/')) {",
  "if ((filename as string).includes('..') || (filename as string).includes('/')) {"
);

fs.writeFileSync('server.ts', content);
