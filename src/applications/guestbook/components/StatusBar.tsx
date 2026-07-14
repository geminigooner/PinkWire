import React, { useMemo } from 'react';
import { useGuestbookStore } from '../store/useGuestbookStore';
import { isToday, parseISO } from 'date-fns';
import { Users, PenTool, Calendar } from 'lucide-react';

export function StatusBar() {
  const { entries } = useGuestbookStore();
  
  const publishedEntries = entries.filter(e => e.status === 'Publish');
  
  const todayCount = useMemo(() => {
    return publishedEntries.filter(e => isToday(parseISO(e.timestamp))).length;
  }, [publishedEntries]);

  return (
    <div className="h-8 bg-[#f8f4f0] border-t border-[#eaddd7] flex items-center justify-between px-4 text-[11px] text-[#7a6f6a] font-sans shrink-0 z-10">
      <div className="flex items-center gap-6">
        <span className="flex items-center gap-1.5">
          <Users size={12} className="opacity-70" />
          Total Visitors: <strong>{publishedEntries.length + 1042}</strong>
        </span>
        <span className="flex items-center gap-1.5 hidden sm:flex">
          <PenTool size={12} className="opacity-70" />
          Signatures: <strong>{publishedEntries.length}</strong>
        </span>
        <span className="flex items-center gap-1.5 hidden sm:flex">
          <Calendar size={12} className="opacity-70" />
          Today's Visitors: <strong>{todayCount + 12}</strong>
        </span>
      </div>
      <div>
        <span>Guestbook v1.0</span>
      </div>
    </div>
  );
}
