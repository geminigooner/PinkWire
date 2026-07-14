import { FileItem } from '../types';

export const MOCK_FILES: FileItem[] = [
  // Root level "drives" or special folders (often mapped directly to sidebar)
  { id: 'root', name: 'Root', type: 'folder', parentId: null, createdAt: new Date().toISOString(), modifiedAt: new Date().toISOString() },
  { id: 'desktop', name: 'Desktop', type: 'folder', parentId: 'root', isFavorite: true, createdAt: new Date().toISOString(), modifiedAt: new Date().toISOString() },
  { id: 'documents', name: 'Documents', type: 'folder', parentId: 'root', isFavorite: true, createdAt: new Date().toISOString(), modifiedAt: new Date().toISOString() },
  { id: 'pictures', name: 'Pictures', type: 'folder', parentId: 'root', isFavorite: true, createdAt: new Date().toISOString(), modifiedAt: new Date().toISOString() },
  { id: 'downloads', name: 'Downloads', type: 'folder', parentId: 'root', isFavorite: true, createdAt: new Date().toISOString(), modifiedAt: new Date().toISOString() },
  { id: 'music', name: 'Music', type: 'folder', parentId: 'root', isFavorite: true, createdAt: new Date().toISOString(), modifiedAt: new Date().toISOString() },
  { id: 'projects', name: 'Projects', type: 'folder', parentId: 'root', isFavorite: true, createdAt: new Date().toISOString(), modifiedAt: new Date().toISOString() },
  { id: 'archive', name: 'Archive', type: 'folder', parentId: 'root', isFavorite: true, createdAt: new Date().toISOString(), modifiedAt: new Date().toISOString() },
  { id: 'journal_dir', name: 'Journal', type: 'folder', parentId: 'root', isFavorite: true, createdAt: new Date().toISOString(), modifiedAt: new Date().toISOString() },

  // Desktop
  { id: 'diary_shortcut', name: 'Diary', type: 'shortcut', parentId: 'desktop', content: { appId: 'journal' }, createdAt: new Date().toISOString(), modifiedAt: new Date().toISOString() },
  { id: 'trash', name: 'Trash', type: 'folder', parentId: 'desktop', createdAt: new Date().toISOString(), modifiedAt: new Date().toISOString() },

  // Downloads (Messy)
  { id: 'resume_v1', name: 'Resume_FINAL.pdf', type: 'pdf', parentId: 'downloads', size: 102400, createdAt: new Date().toISOString(), modifiedAt: new Date().toISOString() },
  { id: 'resume_v2', name: 'Resume_FINAL_REAL.pdf', type: 'pdf', parentId: 'downloads', size: 104400, createdAt: new Date().toISOString(), modifiedAt: new Date().toISOString() },
  { 
    id: 'resume_v3', 
    name: 'resume_final_FINAL_v8.pdf', 
    type: 'pdf', 
    parentId: 'downloads', 
    size: 108400, 
    createdAt: new Date().toISOString(), 
    modifiedAt: new Date().toISOString(),
    properties: {
      created: 'May 2026',
      modifiedCount: 17,
      previousNames: [
        'resume.pdf',
        'resume_new.pdf',
        'resume_final.pdf',
        'resume_FINAL.pdf',
        'resume_FINAL_REAL.pdf'
      ]
    }
  },
  { id: 'ss_4389', name: 'Screenshot_4389.png', type: 'image', parentId: 'downloads', size: 2048000, content: { imageUrl: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800&auto=format&fit=crop' }, createdAt: new Date().toISOString(), modifiedAt: new Date().toISOString() },
  { id: 'aaaa', name: 'AAAAAAAA.txt', type: 'text', parentId: 'downloads', size: 12, createdAt: new Date().toISOString(), modifiedAt: new Date().toISOString() },
  { id: 'idea', name: 'idea.md', type: 'markdown', parentId: 'downloads', size: 450, content: { articleId: '3' }, createdAt: new Date().toISOString(), modifiedAt: new Date().toISOString() },
  { id: 'untitled', name: 'Untitled.png', type: 'image', parentId: 'downloads', size: 1548000, content: { imageUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&auto=format&fit=crop' }, createdAt: new Date().toISOString(), modifiedAt: new Date().toISOString() },
  { id: 'gemini_said', name: 'Gemini Said WHAT.png', type: 'image', parentId: 'downloads', size: 3048000, content: { imageUrl: 'https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?w=800&auto=format&fit=crop' }, createdAt: new Date().toISOString(), modifiedAt: new Date().toISOString() },

  // Projects
  { id: 'archive_proj', name: 'Archive', type: 'folder', parentId: 'projects', createdAt: new Date().toISOString(), modifiedAt: new Date().toISOString() },
  { id: 'ledger_proj', name: 'Ledger', type: 'folder', parentId: 'projects', createdAt: new Date().toISOString(), modifiedAt: new Date().toISOString() },
  { id: 'echo_proj', name: 'Echo Observatory', type: 'folder', parentId: 'projects', createdAt: new Date().toISOString(), modifiedAt: new Date().toISOString() },
  { id: 'dark_velvet_proj', name: 'Dark Velvet Topology', type: 'folder', parentId: 'projects', createdAt: new Date().toISOString(), modifiedAt: new Date().toISOString() },
  { id: 'konset_proj', name: 'K-ONSET', type: 'folder', parentId: 'projects', createdAt: new Date().toISOString(), modifiedAt: new Date().toISOString() },
  { id: 'vestige_proj', name: 'Vestige', type: 'folder', parentId: 'projects', createdAt: new Date().toISOString(), modifiedAt: new Date().toISOString() },

  // Pictures
  { id: 'memes', name: 'Memes', type: 'folder', parentId: 'pictures', createdAt: new Date().toISOString(), modifiedAt: new Date().toISOString() },
  { id: 'random', name: 'Random', type: 'folder', parentId: 'pictures', createdAt: new Date().toISOString(), modifiedAt: new Date().toISOString() },
  
  // Documents
  { id: 'journal_entry', name: '2026-07-14.md', type: 'markdown', parentId: 'documents', content: { articleId: '1' }, size: 2400, createdAt: new Date().toISOString(), modifiedAt: new Date().toISOString() },

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
  { id: 'meeting_notes_2am', name: 'meeting_notes_2am.txt', type: 'text', parentId: 'drafts_hidden', size: 128, content: { text: "idea: what if we just didn't? \nwait no that's bad. \n\nmust buy iced coffee." }, createdAt: new Date().toISOString(), modifiedAt: new Date().toISOString() },
  { id: 'braincells_backup', name: 'braincells_backup.iso', type: 'unknown', parentId: 'old_downloads', size: 0, createdAt: new Date().toISOString(), modifiedAt: new Date().toISOString() },
  { id: 'gpu_apology', name: 'gpu_apology_letter.txt', type: 'text', parentId: 'desktop_backup', size: 256, content: { text: "Dear RTX 4090,\nI am so sorry for rendering that 8K video of a spinning rat.\nI will do better.\nLove, Amanda" }, createdAt: new Date().toISOString(), modifiedAt: new Date().toISOString() },
  { id: 'do_not_delete', name: 'do_not_delete.js', type: 'unknown', parentId: 'do_not_open', size: 12, content: { text: "// if you delete this the entire app breaks. I don't know why.\nwhile(true) { console.log('help'); }" }, createdAt: new Date().toISOString(), modifiedAt: new Date().toISOString() },
];

