import React, { useEffect } from 'react';
import { useSearchStore } from '../../store/useSearchStore';
import { AppRegistry } from '../../applications/registry';
import { useWindowStore } from '../../store/useWindowStore';
import { useGuestbookStore } from '../../applications/guestbook/store/useGuestbookStore';
import { useJournalStore } from '../../applications/journal/store/useJournalStore';
import { useBrowserStore } from '../../applications/browser/store/useBrowserStore';
import { FileText, Settings, User, Globe } from 'lucide-react';

export function SearchProviders() {
  const registerProvider = useSearchStore(state => state.registerProvider);
  const openWindow = useWindowStore(state => state.openWindow);
  const articles = useJournalStore(state => state.articles);
  const guestbookEntries = useGuestbookStore(state => state.entries);
  const visitors = useGuestbookStore(state => state.visitors);
  const bookmarks = useBrowserStore(state => state.bookmarks);

  useEffect(() => {
    // Apps Provider
    registerProvider({
      id: 'os-apps',
      name: 'Applications',
      search: (query) => {
        const q = query.toLowerCase();
        return Object.values(AppRegistry)
          .filter(app => app.name.toLowerCase().includes(q))
          .map(app => {
            const score = app.name.toLowerCase() === q ? 100 : app.name.toLowerCase().startsWith(q) ? 50 : 10;
            return {
              id: `app-${app.id}`,
              title: app.name,
              subtitle: 'Application',
              type: 'app',
              icon: app.icon,
              action: () => openWindow(app.id),
              score
            };
          });
      }
    });

    // Journal Provider
    registerProvider({
      id: 'app-journal',
      name: 'Journal Entries',
      search: (query) => {
        const q = query.toLowerCase();
        return articles
          .filter(entry => entry.title.toLowerCase().includes(q) || entry.content.toLowerCase().includes(q))
          .map(entry => {
            const score = entry.title.toLowerCase() === q ? 90 : entry.title.toLowerCase().startsWith(q) ? 40 : 5;
            return {
              id: `journal-${entry.id}`,
              title: entry.title,
              subtitle: 'Journal Entry',
              type: 'journal',
              icon: FileText,
              action: () => {
                openWindow('journal');
                // You could also dispatch an event to select the entry
              },
              score
            };
          });
      }
    });

    // Guestbook Visitors Provider
    registerProvider({
      id: 'app-guestbook-visitors',
      name: 'Guestbook Visitors',
      search: (query) => {
        const q = query.toLowerCase();
        return visitors
          .filter(v => v.displayName.toLowerCase().includes(q) || (v.location && v.location.toLowerCase().includes(q)))
          .map(v => {
            const score = v.displayName.toLowerCase() === q ? 80 : 30;
            return {
              id: `visitor-${v.id}`,
              title: v.displayName,
              subtitle: v.location ? `Visitor from ${v.location}` : 'Visitor',
              type: 'guestbook',
              icon: User,
              action: () => {
                openWindow('guestbook');
                useGuestbookStore.getState().setSelectedVisitorId(v.id);
              },
              score
            };
          });
      }
    });

    // Guestbook Entries Provider
    registerProvider({
      id: 'app-guestbook-entries',
      name: 'Guestbook Entries',
      search: (query) => {
        const q = query.toLowerCase();
        return guestbookEntries
          .filter(e => e.message.toLowerCase().includes(q))
          .map(e => {
            const visitor = visitors.find(v => v.id === e.visitorId);
            return {
              id: `gb-entry-${e.id}`,
              title: visitor ? `Entry by ${visitor.displayName}` : 'Guestbook Entry',
              subtitle: e.message.substring(0, 50) + (e.message.length > 50 ? '...' : ''),
              type: 'guestbook',
              icon: User,
              action: () => {
                openWindow('guestbook');
              },
              score: 20
            };
          });
      }
    });

    // Settings Provider
    registerProvider({
      id: 'os-settings',
      name: 'Settings',
      search: (query) => {
        const q = query.toLowerCase();
        const settingsList = [
          { id: 'theme', title: 'Theme Settings', subtitle: 'Change OS visual appearance' },
          { id: 'wallpaper', title: 'Wallpaper', subtitle: 'Change desktop background' },
          { id: 'sound', title: 'Sound Settings', subtitle: 'Manage system sounds' },
          { id: 'accessibility', title: 'Accessibility', subtitle: 'Cursor, animations, contrast' }
        ];
        return settingsList
          .filter(s => s.title.toLowerCase().includes(q) || s.subtitle.toLowerCase().includes(q))
          .map(s => {
            const score = s.title.toLowerCase() === q ? 85 : 35;
            return {
              id: `setting-${s.id}`,
              title: s.title,
              subtitle: s.subtitle,
              type: 'setting',
              icon: Settings,
              action: () => openWindow('settings', { tab: s.id }),
              score
            };
          });
      }
    });

    // Browser Bookmarks Provider
    registerProvider({
      id: 'app-browser-bookmarks',
      name: 'Bookmarks',
      search: (query) => {
        const q = query.toLowerCase();
        return bookmarks
          .filter(b => b.title.toLowerCase().includes(q) || b.url.toLowerCase().includes(q))
          .map(b => {
            const score = b.title.toLowerCase() === q ? 70 : 25;
            return {
              id: `bookmark-${b.id}`,
              title: b.title,
              subtitle: b.url,
              type: 'media', // using media as a generic link type or we could add 'bookmark'
              icon: Globe,
              action: () => {
                openWindow('browser', { url: b.url });
              },
              score
            };
          });
      }
    });

  }, [registerProvider, openWindow, articles, guestbookEntries, visitors, bookmarks]);

  return null;
}
