import fs from 'fs';

let content = fs.readFileSync('src/store/useDesktopStore.ts', 'utf8');

// Add StickyNoteState interface
content = content.replace(
  'interface DesktopStore {',
  `export interface StickyNoteState {
  id: string;
  text: string;
  x: number;
  y: number;
  color: string;
}

interface DesktopStore {`
);

// Add to DesktopStore interface
content = content.replace(
  '  autoArrangeIcons: boolean;',
  `  stickyNotes: StickyNoteState[];
  autoArrangeIcons: boolean;`
);

// Add methods to interface
content = content.replace(
  '  removeSticker: (id: string) => void;',
  `  removeSticker: (id: string) => void;
  
  addStickyNote: (note: Omit<StickyNoteState, "id">) => void;
  updateStickyNote: (id: string, updates: Partial<StickyNoteState>) => void;
  removeStickyNote: (id: string) => void;`
);

// Add default state
content = content.replace(
  '      stickers: [],',
  `      stickers: [],
      stickyNotes: [
        { id: 'note-1', text: "buy iced coffee", x: window.innerWidth - 250, y: 100, color: "bg-yellow-200 text-yellow-900" },
        { id: 'note-2', text: "don't trust past me", x: window.innerWidth - 220, y: 300, color: "bg-pink-200 text-pink-900" }
      ],`
);

// Add method implementations
content = content.replace(
  '      removeSticker: (id) => set((state) => ({',
  `      addStickyNote: (note) => set((state) => ({
        stickyNotes: [...state.stickyNotes, { ...note, id: crypto.randomUUID ? crypto.randomUUID() : Math.random().toString(36).substring(2, 9) }]
      })),
      updateStickyNote: (id, updates) => set((state) => ({
        stickyNotes: state.stickyNotes.map(n => n.id === id ? { ...n, ...updates } : n)
      })),
      removeStickyNote: (id) => set((state) => ({
        stickyNotes: state.stickyNotes.filter(n => n.id !== id)
      })),
      
      removeSticker: (id) => set((state) => ({`
);

// Add partialize
content = content.replace(
  '        stickers: state.stickers,',
  `        stickers: state.stickers,
        stickyNotes: state.stickyNotes,`
);

// Fix initial sticky notes to handle SSR / no window
content = content.replace(
  'window.innerWidth - 250',
  'typeof window !== "undefined" ? window.innerWidth - 250 : 800'
);
content = content.replace(
  'window.innerWidth - 220',
  'typeof window !== "undefined" ? window.innerWidth - 220 : 830'
);


fs.writeFileSync('src/store/useDesktopStore.ts', content);
console.log('patched');
