import React from 'react';
import { GuestbookEntryData, useGuestbookStore } from '../store/useGuestbookStore';
import { formatDistanceToNow, parseISO } from 'date-fns';
import { MapPin, Globe, Star, Trash2 } from 'lucide-react';
import { useAuthStore } from '../../../store/useAuthStore';
import { cn } from '../../../utils/cn';

export function GuestbookEntry({ entry }: { entry: GuestbookEntryData }) {
  const toggleFavorite = useGuestbookStore(state => state.toggleFavorite);
  const visitors = useGuestbookStore(state => state.visitors);
  const setSelectedVisitorId = useGuestbookStore(state => state.setSelectedVisitorId);
  const deleteEntry = useGuestbookStore(state => state.deleteEntry);
  const isAuthenticated = useAuthStore(state => state.isAuthenticated);
  
  const visitor = visitors.find(v => v.id === entry.visitorId);
  if (!visitor) return null;

  return (
    <div className="group relative bg-white border border-[#eaddd7] rounded-2xl p-5 md:p-6 shadow-sm hover:shadow-md transition-shadow">
      <div 
        className="absolute top-0 left-0 w-full h-1 rounded-t-2xl opacity-50"
        style={{ backgroundColor: visitor.favoriteColor || '#cf8c8c' }}
      />
      
      <div className="flex items-start gap-4">
        <button 
          onClick={() => setSelectedVisitorId(visitor.id)}
          className="relative shrink-0 hover:opacity-80 transition-opacity focus:outline-none focus:ring-2 focus:ring-[#cf8c8c] focus:ring-offset-2 rounded-full"
        >
          {visitor.avatar ? (
            <img src={visitor.avatar} alt={visitor.displayName} className="w-12 h-12 rounded-full object-cover ring-2 ring-[#f0e6e2]" />
          ) : (
            <div className="w-12 h-12 rounded-full bg-[#f0e6e2] flex items-center justify-center text-[#cf8c8c] font-medium text-lg ring-2 ring-[#eaddd7]">
              {visitor.displayName.charAt(0).toUpperCase()}
            </div>
          )}
        </button>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-4">
            <div>
              <button 
                onClick={() => setSelectedVisitorId(visitor.id)}
                className="font-semibold text-[#4a3f3a] text-lg leading-tight truncate hover:underline text-left"
              >
                {visitor.displayName}
              </button>
              <div className="flex flex-wrap items-center gap-3 mt-1 text-xs text-[#a3948e]">
                <span className="shrink-0">{formatDistanceToNow(parseISO(entry.timestamp), { addSuffix: true })}</span>
                {visitor.location && (
                  <span className="flex items-center gap-1 shrink-0 truncate max-w-[120px]">
                    <MapPin size={10} /> {visitor.location}
                  </span>
                )}
                {visitor.website && (
                  <a href={visitor.website} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 shrink-0 hover:text-[#cf8c8c] transition-colors truncate max-w-[120px]">
                    <Globe size={10} /> {new URL(visitor.website).hostname.replace('www.', '')}
                  </a>
                )}
              </div>
            </div>
            
            <div className="flex items-center gap-1">
              {isAuthenticated && (
              <button
                onClick={() => deleteEntry(entry.id)}
                className="p-2 rounded-full transition-colors opacity-0 group-hover:opacity-100 text-red-400 hover:text-red-500 hover:bg-red-50"
                title="Delete Entry"
              >
                <Trash2 size={16} />
              </button>
            )}
            {isAuthenticated ? (
              <button
                onClick={() => toggleFavorite(entry.id)}
                className={cn(
                "p-2 rounded-full transition-colors opacity-0 group-hover:opacity-100 sm:opacity-100",
                entry.favorite ? "text-[#f59e0b] hover:bg-[#fef3c7]" : "text-[#d6c7c1] hover:text-[#f59e0b] hover:bg-[#fef3c7]"
              )}
            >
              <Star size={18} className={entry.favorite ? "fill-current" : ""} />
            </button>
            ) : (
              entry.favorite && (
                <div className="p-2 text-[#f59e0b]">
                  <Star size={18} className="fill-current" />
                </div>
              )
            )}
            </div>
          </div>
          
          <div className="mt-4 text-[#4a3f3a] text-sm md:text-base leading-relaxed whitespace-pre-wrap font-serif">
            {entry.message}
          </div>
        </div>
      </div>
    </div>
  );
}
