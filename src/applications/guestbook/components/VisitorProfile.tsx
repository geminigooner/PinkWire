import React from 'react';
import { useGuestbookStore } from '../store/useGuestbookStore';
import { format, parseISO } from 'date-fns';
import { X, MapPin, Globe, Calendar, Hash } from 'lucide-react';
import { cn } from '../../../utils/cn';

export function VisitorProfile() {
  const selectedVisitorId = useGuestbookStore(state => state.selectedVisitorId);
  const setSelectedVisitorId = useGuestbookStore(state => state.setSelectedVisitorId);
  const visitors = useGuestbookStore(state => state.visitors);
  
  const visitor = visitors.find(v => v.id === selectedVisitorId);
  
  if (!visitor) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 sm:p-6">
      <div 
        className="absolute inset-0 bg-[#4a3f3a]/20 backdrop-blur-sm"
        onClick={() => setSelectedVisitorId(null)}
      />
      
      <div className="bg-[#f8f4f0] border border-[#eaddd7] rounded-3xl shadow-xl w-full max-w-sm relative z-10 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        <div 
          className="h-24 w-full opacity-50"
          style={{ backgroundColor: visitor.favoriteColor || '#cf8c8c' }}
        />
        
        <button 
          onClick={() => setSelectedVisitorId(null)}
          className="absolute top-4 right-4 p-2 bg-white/50 hover:bg-white rounded-full transition-colors text-[#4a3f3a]"
        >
          <X size={16} />
        </button>
        
        <div className="px-6 pb-6 relative">
          <div className="-mt-12 mb-4">
            {visitor.avatar ? (
              <img src={visitor.avatar} alt={visitor.displayName} className="w-24 h-24 rounded-full object-cover ring-4 ring-[#f8f4f0] bg-white shadow-sm" />
            ) : (
              <div className="w-24 h-24 rounded-full bg-white flex items-center justify-center text-[#cf8c8c] font-medium text-3xl ring-4 ring-[#f8f4f0] shadow-sm">
                {visitor.displayName.charAt(0).toUpperCase()}
              </div>
            )}
          </div>
          
          <h2 className="text-2xl font-serif font-medium text-[#4a3f3a] mb-1">{visitor.displayName}</h2>
          
          <div className="space-y-3 mt-6">
            <div className="flex items-center gap-3 text-sm text-[#7a6f6a]">
              <Calendar size={16} className="text-[#a3948e]" />
              <span>Joined {format(parseISO(visitor.joinedDate), 'MMM d, yyyy')}</span>
            </div>
            
            <div className="flex items-center gap-3 text-sm text-[#7a6f6a]">
              <Hash size={16} className="text-[#a3948e]" />
              <span>{visitor.visitCount} {visitor.visitCount === 1 ? 'Visit' : 'Visits'}</span>
            </div>
            
            {visitor.location && (
              <div className="flex items-center gap-3 text-sm text-[#7a6f6a]">
                <MapPin size={16} className="text-[#a3948e]" />
                <span>{visitor.location}</span>
              </div>
            )}
            
            {visitor.website && (
              <div className="flex items-center gap-3 text-sm text-[#7a6f6a]">
                <Globe size={16} className="text-[#a3948e]" />
                <a href={visitor.website} target="_blank" rel="noopener noreferrer" className="hover:text-[#cf8c8c] hover:underline">
                  {new URL(visitor.website).hostname.replace('www.', '')}
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
