import fs from 'fs';

let content = fs.readFileSync('src/applications/guestbook/components/GuestbookEntry.tsx', 'utf8');

content = content.replace(
  "import { MapPin, Globe, Star } from 'lucide-react';",
  "import { MapPin, Globe, Star, Trash2 } from 'lucide-react';\nimport { useAuthStore } from '../../../store/useAuthStore';"
);

content = content.replace(
  "const setSelectedVisitorId = useGuestbookStore(state => state.setSelectedVisitorId);",
  "const setSelectedVisitorId = useGuestbookStore(state => state.setSelectedVisitorId);\n  const removeEntry = useGuestbookStore(state => state.removeEntry);\n  const isAuthenticated = useAuthStore(state => state.isAuthenticated);"
);

content = content.replace(
  '            <button\n              onClick={() => toggleFavorite(entry.id)}',
  `            {isAuthenticated && (
              <button
                onClick={() => removeEntry(entry.id)}
                className="p-2 rounded-full transition-colors opacity-0 group-hover:opacity-100 text-red-400 hover:text-red-500 hover:bg-red-50"
                title="Delete Entry"
              >
                <Trash2 size={16} />
              </button>
            )}
            <button
              onClick={() => toggleFavorite(entry.id)}`
);

fs.writeFileSync('src/applications/guestbook/components/GuestbookEntry.tsx', content);

let store = fs.readFileSync('src/applications/guestbook/store/useGuestbookStore.ts', 'utf8');
store = store.replace(
  'toggleFavorite: (entryId: string) => void;',
  'toggleFavorite: (entryId: string) => void;\n  removeEntry: (entryId: string) => void;'
);
store = store.replace(
  'toggleFavorite: (entryId) =>',
  'removeEntry: (entryId) => set((state) => ({ entries: state.entries.filter(e => e.id !== entryId) })),\n      toggleFavorite: (entryId) =>'
);
fs.writeFileSync('src/applications/guestbook/store/useGuestbookStore.ts', store);

