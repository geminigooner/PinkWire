import fs from 'fs';

let content = fs.readFileSync('src/applications/guestbook/components/GuestbookEntry.tsx', 'utf8');

content = content.replace(
  '{isAuthenticated && (',
  '<div className="flex items-center gap-1">\n              {isAuthenticated && ('
);

content = content.replace(
  '            <button\n              onClick={() => toggleFavorite(entry.id)}\n              className={cn(',
  `            {isAuthenticated ? (
              <button
                onClick={() => toggleFavorite(entry.id)}
                className={cn(`
);

content = content.replace(
  '            </button>\n          </div>',
  `            </button>
            ) : (
              entry.favorite && (
                <div className="p-2 text-[#f59e0b]">
                  <Star size={18} className="fill-current" />
                </div>
              )
            )}
            </div>
          </div>`
);
fs.writeFileSync('src/applications/guestbook/components/GuestbookEntry.tsx', content);

