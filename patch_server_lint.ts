import fs from 'fs';
let content = fs.readFileSync('server.ts', 'utf8');

content = content.replace(
  "const token = req.headers.authorization?.split(' ')[1];",
  "const authHeader = req.headers.authorization;\n    const token = typeof authHeader === 'string' ? authHeader.split(' ')[1] : undefined;"
);
// Replace the other occurrence too
content = content.replace(
  "const token = req.headers.authorization?.split(' ')[1];",
  "const authHeader = req.headers.authorization;\n    const token = typeof authHeader === 'string' ? authHeader.split(' ')[1] : undefined;"
);
fs.writeFileSync('server.ts', content);
