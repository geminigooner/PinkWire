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
        className="absolute inset-0 bg-black/40 backdrop-blur-os-os-os"
        onClick={() => setSelectedVisitorId(null)}
      />
      
      <div className="bg-black/30 border border-os-window-border rounded-3xl shadow-os w-full max-w-sm relative z-10 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        <div 
          className="h-24 w-full opacity-50"
          style={{ backgroundColor: visitor.favoriteColor || 'var(--os-accent)' }}
        />
        
        <button 
          onClick={() => setSelectedVisitorId(null)}
          className="absolute top-4 right-4 p-2 bg-os-window-bg/10 hover:bg-os-window-bg rounded-full transition-colors text-os-text"
        >
          <X size={16} />
        </button>
        
        <div className="px-6 pb-6 relative">
          <div className="-mt-12 mb-4">
            <div className="w-24 h-24 rounded-full bg-os-window-bg flex items-center justify-center text-os-accent font-medium text-3xl ring-4 ring-os-window-border shadow-os">
              {visitor.displayName.charAt(0).toUpperCase()}
            </div>
          </div>
          
          <h2 className="text-2xl font-serif font-medium text-os-text mb-1">{visitor.displayName}</h2>
          
          <div className="space-y-3 mt-6">
            <div className="flex items-center gap-3 text-sm text-os-text-muted">
              <Calendar size={16} className="text-os-text-muted" />
              <span>Joined {format(parseISO(visitor.joinedDate), 'MMM d, yyyy')}</span>
            </div>
            
            <div className="flex items-center gap-3 text-sm text-os-text-muted">
              <Hash size={16} className="text-os-text-muted" />
              <span>{visitor.visitCount} {visitor.visitCount === 1 ? 'Visit' : 'Visits'}</span>
            </div>
            
            {visitor.location && (
              <div className="flex items-center gap-3 text-sm text-os-text-muted">
                <MapPin size={16} className="text-os-text-muted" />
                <span>{visitor.location}</span>
              </div>
            )}
            
            {visitor.website && (
              <div className="flex items-center gap-3 text-sm text-os-text-muted">
                <Globe size={16} className="text-os-text-muted" />
                <a href={visitor.website} target="_blank" rel="noopener noreferrer" className="hover:text-os-accent hover:underline">
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
