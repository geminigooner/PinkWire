const fs = require('fs');
const path = 'src/applications/spun/data/mockData.ts';
let content = fs.readFileSync(path, 'utf8');

content = content.replace(/The Echoes/g, "ResidualBro");
content = content.replace(/Synthwave Society/g, "GPU Obsession");
content = content.replace(/Miami Dreams/g, "Cold Plunge Capital");
content = content.replace(/Coffee & Code/g, "Caffeine Addiction");

fs.writeFileSync(path, content);
