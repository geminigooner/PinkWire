import React from 'react';
import { useGuestbookStore } from '../store/useGuestbookStore';
import { Search, Filter, SortDesc, SortAsc, Menu } from 'lucide-react';
import { cn } from '../../../utils/cn';

export function Toolbar() {
  const { searchQuery, setSearchQuery, sortOrder, setSortOrder, toggleSidebar } = useGuestbookStore();

  return (
    <div className="h-14 px-4 border-b border-[#eaddd7] bg-[#f8f4f0]/80 backdrop-blur-md flex items-center justify-between shrink-0 z-10">
      <div className="flex items-center gap-2">
        <button 
          onClick={toggleSidebar}
          className="md:hidden p-1.5 -ml-2 text-[#a3948e] hover:bg-[#f0e6e2] hover:text-[#4a3f3a] rounded-lg transition-colors"
        >
          <Menu size={20} />
        </button>
        <h1 className="font-serif italic font-medium text-xl text-[#4a3f3a] tracking-tight">Guestbook</h1>
      </div>
      
      <div className="flex items-center gap-2 sm:gap-4 flex-1 justify-end">
        <div className="relative hidden sm:block w-full sm:w-64 max-w-[200px] sm:max-w-none">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#a3948e]" />
          <input
            type="text"
            placeholder="Search entries..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-white/50 border border-[#eaddd7] rounded-full pl-9 pr-4 py-1.5 text-sm text-[#4a3f3a] placeholder:text-[#a3948e] focus:outline-none focus:border-[#cf8c8c] focus:ring-1 focus:ring-[#cf8c8c] transition-all font-sans"
          />
        </div>

        <div className="flex items-center gap-1 sm:border-l sm:border-[#eaddd7] sm:pl-4">
          <button 
            onClick={() => setSortOrder('newest')}
            className={cn("p-1.5 rounded-lg transition-colors", sortOrder === 'newest' ? "bg-[#f0e6e2] text-[#4a3f3a]" : "text-[#a3948e] hover:text-[#4a3f3a] hover:bg-[#f0e6e2]/50")}
            title="Sort Newest First"
          >
            <SortDesc size={18} />
          </button>
          <button 
            onClick={() => setSortOrder('oldest')}
            className={cn("p-1.5 rounded-lg transition-colors", sortOrder === 'oldest' ? "bg-[#f0e6e2] text-[#4a3f3a]" : "text-[#a3948e] hover:text-[#4a3f3a] hover:bg-[#f0e6e2]/50")}
            title="Sort Oldest First"
          >
            <SortAsc size={18} />
          </button>
          <button 
            onClick={() => setSortOrder('alphabetical')}
            className={cn("p-1.5 rounded-lg transition-colors", sortOrder === 'alphabetical' ? "bg-[#f0e6e2] text-[#4a3f3a]" : "text-[#a3948e] hover:text-[#4a3f3a] hover:bg-[#f0e6e2]/50")}
            title="Sort Alphabetical"
          >
            <Filter size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}
