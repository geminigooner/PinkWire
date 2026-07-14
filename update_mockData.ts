import fs from 'fs';
import path from 'path';

const mockDataPath = path.join(process.cwd(), 'src/applications/explorer/data/mockData.ts');
let content = fs.readFileSync(mockDataPath, 'utf8');

const newFiles = `
  // Hidden folders and Joke Files (Phase 15)
  { id: 'recovered_memories', name: 'Recovered Memories', type: 'folder', parentId: 'pictures', isHidden: true, createdAt: new Date().toISOString(), modifiedAt: new Date().toISOString() },
  { id: 'old_downloads', name: 'Old Downloads', type: 'folder', parentId: 'downloads', isHidden: true, createdAt: new Date().toISOString(), modifiedAt: new Date().toISOString() },
  { id: 'desktop_backup', name: 'Desktop Backup', type: 'folder', parentId: 'desktop', isHidden: true, createdAt: new Date().toISOString(), modifiedAt: new Date().toISOString() },
  { id: 'do_not_open', name: 'Do Not Open', type: 'folder', parentId: 'documents', isHidden: true, createdAt: new Date().toISOString(), modifiedAt: new Date().toISOString() },
  { id: 'not_taxes', name: 'Definitely Not Taxes', type: 'folder', parentId: 'documents', isHidden: true, createdAt: new Date().toISOString(), modifiedAt: new Date().toISOString() },
  { id: 'archive_temp', name: 'Archive Temp', type: 'folder', parentId: 'archive', isHidden: true, createdAt: new Date().toISOString(), modifiedAt: new Date().toISOString() },
  { id: 'screenshots_hidden', name: 'Screenshots', type: 'folder', parentId: 'pictures', isHidden: true, createdAt: new Date().toISOString(), modifiedAt: new Date().toISOString() },
  { id: 'old_wallpapers', name: 'Old Wallpapers', type: 'folder', parentId: 'pictures', isHidden: true, createdAt: new Date().toISOString(), modifiedAt: new Date().toISOString() },
  { id: 'drafts_hidden', name: 'Drafts', type: 'folder', parentId: 'documents', isHidden: true, createdAt: new Date().toISOString(), modifiedAt: new Date().toISOString() },
  { id: 'momo_photos', name: 'momo_photos', type: 'folder', parentId: 'pictures', isHidden: true, createdAt: new Date().toISOString(), modifiedAt: new Date().toISOString() },
  { id: 'internet_drama_archive', name: 'internet_drama_archive', type: 'folder', parentId: 'documents', isHidden: true, createdAt: new Date().toISOString(), modifiedAt: new Date().toISOString() },

  { id: 'horse_puh', name: 'horse_puh_final_FINAL_v12.psd', type: 'unknown', parentId: 'archive_temp', size: 10485760, createdAt: new Date().toISOString(), modifiedAt: new Date().toISOString() },
  { id: 'totally_not_cringe', name: 'totally_not_cringe.zip', type: 'unknown', parentId: 'recovered_memories', size: 4096, createdAt: new Date().toISOString(), modifiedAt: new Date().toISOString() },
  { id: 'meeting_notes_2am', name: 'meeting_notes_2am.txt', type: 'text', parentId: 'drafts_hidden', size: 128, content: { text: "idea: what if we just didn't? \\nwait no that's bad. \\n\\nmust buy iced coffee." }, createdAt: new Date().toISOString(), modifiedAt: new Date().toISOString() },
  { id: 'braincells_backup', name: 'braincells_backup.iso', type: 'unknown', parentId: 'old_downloads', size: 0, createdAt: new Date().toISOString(), modifiedAt: new Date().toISOString() },
  { id: 'gpu_apology', name: 'gpu_apology_letter.txt', type: 'text', parentId: 'desktop_backup', size: 256, content: { text: "Dear RTX 4090,\\nI am so sorry for rendering that 8K video of a spinning rat.\\nI will do better.\\nLove, Amanda" }, createdAt: new Date().toISOString(), modifiedAt: new Date().toISOString() },
  { id: 'do_not_delete', name: 'do_not_delete.js', type: 'unknown', parentId: 'do_not_open', size: 12, content: { text: "// if you delete this the entire app breaks. I don't know why.\\nwhile(true) { console.log('help'); }" }, createdAt: new Date().toISOString(), modifiedAt: new Date().toISOString() },
];
`;

content = content.replace('];', newFiles);

fs.writeFileSync(mockDataPath, content);
console.log('Done');
