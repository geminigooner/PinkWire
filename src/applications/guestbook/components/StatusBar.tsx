import React, { useMemo } from 'react';
import { useGuestbookStore } from '../store/useGuestbookStore';
import { isToday, parseISO } from 'date-fns';
import { Users, PenTool, Calendar } from 'lucide-react';

export function StatusBar() {
  const { entries, visitors } = useGuestbookStore();
  
  const publishedEntries = entries.filter(e => e.moderationStatus === 'Publish');
  
  const todayCount = useMemo(() => {
    return publishedEntries.filter(e => isToday(parseISO(e.timestamp))).length;
  }, [publishedEntries]);

  const returningVisitorsCount = useMemo(() => {
    return visitors.filter(v => v.visitCount > 1).length;
  }, [visitors]);

  return (
    <div className="h-8 bg-[#f8f4f0] border-t border-[#eaddd7] flex items-center justify-between px-4 text-[11px] text-[#7a6f6a] font-sans shrink-0 z-10 overflow-x-auto scrollbar-hide">
      <div className="flex items-center gap-4 sm:gap-6 whitespace-nowrap min-w-max">
        <span className="flex items-center gap-1.5">
          <Users size={12} className="opacity-70" />
          Visitors: <strong>{visitors.length}</strong>
        </span>
        <span className="flex items-center gap-1.5">
          <PenTool size={12} className="opacity-70" />
          Signatures: <strong>{publishedEntries.length}</strong>
        </span>
        <span className="flex items-center gap-1.5 hidden sm:flex">
          <Calendar size={12} className="opacity-70" />
          Today's Signatures: <strong>{todayCount}</strong>
        </span>
        <span className="flex items-center gap-1.5 hidden md:flex">
          <Users size={12} className="opacity-70" />
          Returning: <strong>{returningVisitorsCount}</strong>
        </span>
      </div>
      <div className="hidden sm:block ml-4">
        <span>Guestbook v1.0</span>
      </div>
    </div>
  );
}
