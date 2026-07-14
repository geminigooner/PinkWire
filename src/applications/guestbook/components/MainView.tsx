import React, { useMemo } from 'react';
import { useGuestbookStore } from '../store/useGuestbookStore';
import { GuestbookEntry } from './GuestbookEntry';
import { Composer } from './Composer';
import { format, parseISO } from 'date-fns';

export function MainView() {
  const { entries, filter, sortOrder, searchQuery, archiveMonthYear } = useGuestbookStore();

  const filteredEntries = useMemo(() => {
    let result = entries.filter(e => e.status === 'Publish');
    
    // Apply filters
    if (filter === 'favorites') {
      result = result.filter(e => e.favorite);
    } else if (filter === 'archive' && archiveMonthYear) {
      result = result.filter(e => {
        const key = format(parseISO(e.timestamp), 'yyyy-MM');
        return key === archiveMonthYear;
      });
    }
    
    // Apply search
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter(e => 
        e.displayName.toLowerCase().includes(q) || 
        e.message.toLowerCase().includes(q) ||
        (e.location && e.location.toLowerCase().includes(q)) ||
        (e.website && e.website.toLowerCase().includes(q))
      );
    }
    
    // Apply sort
    result.sort((a, b) => {
      if (sortOrder === 'newest') {
        return new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime();
      } else if (sortOrder === 'oldest') {
        return new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime();
      } else if (sortOrder === 'alphabetical') {
        return a.displayName.localeCompare(b.displayName);
      }
      return 0;
    });
    
    return result;
  }, [entries, filter, sortOrder, searchQuery, archiveMonthYear]);

  return (
    <div className="flex-1 flex flex-col min-w-0 bg-[#fdfbf7] relative">
      <div className="flex-1 overflow-y-auto custom-scrollbar">
        <div className="max-w-3xl mx-auto px-4 py-8 md:px-8 md:py-12 space-y-12">
          
          {filter === 'all' && !searchQuery && (
            <div className="text-center mb-12">
              <h2 className="text-3xl font-serif italic text-[#4a3f3a] mb-3">Welcome to my Guestbook</h2>
              <p className="text-[#7a6f6a] text-sm">Please leave a little note before you go. It's nice to know who stops by.</p>
            </div>
          )}
          
          <Composer />

          <div className="pt-8">
            <h3 className="text-sm font-semibold text-[#a3948e] uppercase tracking-widest mb-6 border-b border-[#eaddd7] pb-2">
              {filter === 'favorites' ? 'Favorite Signatures' : filter === 'archive' ? `Archived from ${archiveMonthYear && format(parseISO(`${archiveMonthYear}-01`), 'MMMM yyyy')}` : 'Recent Signatures'}
            </h3>
            
            <div className="space-y-6">
              {filteredEntries.length === 0 ? (
                <div className="text-center py-12 text-[#a3948e] italic">
                  No entries found matching your criteria.
                </div>
              ) : (
                filteredEntries.map(entry => (
                  <GuestbookEntry key={entry.id} entry={entry} />
                ))
              )}
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
}
