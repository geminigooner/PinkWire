import fs from 'fs';
let content = fs.readFileSync('src/applications/settings/components/DesktopSettings.tsx', 'utf8');

content = content.replace(
  '                      <button \n                        onClick={() => removeSticker(sticker.id)}',
  '                      {isAuthenticated && (\n                        <button \n                          onClick={() => removeSticker(sticker.id)}'
);

content = content.replace(
  '                        <Trash2 size={12} />\n                      </button>',
  '                        <Trash2 size={12} />\n                        </button>\n                      )}'
);

fs.writeFileSync('src/applications/settings/components/DesktopSettings.tsx', content);
