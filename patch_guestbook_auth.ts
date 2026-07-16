import fs from 'fs';

let content = fs.readFileSync('src/applications/guestbook/components/GuestbookEntry.tsx', 'utf8');

content = content.replace(
  '            <button\n              onClick={() => toggleFavorite(entry.id)}',
  `            {isAuthenticated && (
              <button
                onClick={() => toggleFavorite(entry.id)}`
);

// We need to close the curly brace
content = content.replace(
  '              <Star size={18} className={entry.favorite ? "fill-current" : ""} />\n            </button>',
  '              <Star size={18} className={entry.favorite ? "fill-current" : ""} />\n            </button>\n            )}'
);

// But what if it's already a favorite? Even non-admins might want to see the star if it's pinned, just not click it.
// Let's modify it more carefully.
