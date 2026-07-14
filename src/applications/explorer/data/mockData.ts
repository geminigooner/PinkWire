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
];
