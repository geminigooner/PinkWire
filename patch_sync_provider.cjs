const fs = require('fs');
let content = fs.readFileSync('src/components/sync/SyncProvider.tsx', 'utf8');

content = content.replace(
  `payload: { \n            message: 'Cloud Sync connected.',\n            type: 'info'\n          }`,
  `payload: { \n            message: 'Cloud Sync connected.'\n          }`
);

fs.writeFileSync('src/components/sync/SyncProvider.tsx', content);
