import React from 'react';
import { usePinkWireStore } from '../../store/usePinkWireStore';
import { Search } from 'lucide-react';
import { cn } from '../../../../utils/cn';

export function SearchBar() {
  const { searchQuery, setSearchQuery } = usePinkWireStore();

  return (
    <div className="p-4 border-b border-os-window-border bg-os-titlebar-bg/50">
      <div className="relative">
        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-os-text-muted" />
        <input
          type="text"
          placeholder="Search conversations, tags..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full bg-black/40 border border-os-window-border rounded-os pl-9 pr-4 py-2 text-sm text-os-text placeholder:text-os-text-muted focus:outline-none focus:border-os-accent/50 focus:ring-1 focus:ring-os-accent/50 transition-all"
        />
      </div>
    </div>
  );
}
