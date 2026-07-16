import fs from 'fs';

let content = fs.readFileSync('src/applications/guestbook/components/GuestbookEntry.tsx', 'utf8');

content = content.replace(
  'const removeEntry = useGuestbookStore(state => state.removeEntry);',
  'const deleteEntry = useGuestbookStore(state => state.deleteEntry);'
);

content = content.replace(
  'onClick={() => removeEntry(entry.id)}',
  'onClick={() => deleteEntry(entry.id)}'
);

fs.writeFileSync('src/applications/guestbook/components/GuestbookEntry.tsx', content);

