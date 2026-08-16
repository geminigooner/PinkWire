import React, { useState } from 'react';
import { GuestbookEntryData, useGuestbookStore } from '../store/useGuestbookStore';
import { formatDistanceToNow, parseISO } from 'date-fns';
import { MapPin, Globe, Star, Trash2, Pin } from 'lucide-react';
import { useAuthStore } from '../../../store/useAuthStore';
import { cn } from '../../../utils/cn';
import { ConfirmDialog } from '../../../components/ConfirmDialog';

export function GuestbookEntry({ entry }: { entry: GuestbookEntryData }) {
  const toggleFavorite = useGuestbookStore(state => state.toggleFavorite);
  const togglePin = useGuestbookStore(state => state.togglePin);
  const visitors = useGuestbookStore(state => state.visitors);
  const setSelectedVisitorId = useGuestbookStore(state => state.setSelectedVisitorId);
  const deleteEntry = useGuestbookStore(state => state.deleteEntry);
  const isAuthenticated = useAuthStore(state => state.isAuthenticated);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  
  const visitor = visitors.find(v => v.id === entry.visitorId);
  if (!visitor) return null;

  return (
    <div className={cn("group relative bg-os-window-bg border border-os-window-border rounded-os p-5 md:p-6 shadow-os hover:shadow-os transition-shadow", entry.pinned && "ring-2 ring-os-accent bg-black/20")}>
      <div 
        className="absolute top-0 left-0 w-full h-1 rounded-t-2xl opacity-100"
        style={{ backgroundColor: visitor.favoriteColor || 'var(--os-accent)' }}
      />
      
      <div className="flex items-start gap-4">
        <button 
          onClick={() => setSelectedVisitorId(visitor.id)}
          className="relative shrink-0 hover:opacity-80 transition-opacity focus:outline-none focus:ring-2 focus:ring-os-accent focus:ring-offset-2 rounded-full"
        >
          <div className="w-12 h-12 rounded-full bg-os-accent/20 flex items-center justify-center text-os-accent font-medium text-lg ring-2 ring-os-window-border">
            {visitor.displayName.charAt(0).toUpperCase()}
          </div>
        </button>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-4">
            <div>
              <button 
                onClick={() => setSelectedVisitorId(visitor.id)}
                className="font-semibold text-os-text text-lg leading-tight truncate hover:underline text-left"
              >
                {visitor.displayName}
              </button>
              <div className="flex flex-wrap items-center gap-3 mt-1 text-xs text-os-text-muted">
                <span className="shrink-0">{formatDistanceToNow(parseISO(entry.timestamp), { addSuffix: true })}</span>
                {visitor.location && (
                  <span className="flex items-center gap-1 shrink-0 truncate max-w-[120px]">
                    <MapPin size={10} /> {visitor.location}
                  </span>
                )}
                {visitor.website && (
                  <a href={visitor.website} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 shrink-0 hover:text-os-accent transition-colors truncate max-w-[120px]">
                    <Globe size={10} /> {new URL(visitor.website).hostname.replace('www.', '')}
                  </a>
                )}
              </div>
            </div>
            
            <div className="flex items-center gap-1">
              {isAuthenticated && (
                <>
                  <button
                    onClick={() => togglePin(entry.id)}
                    className={cn(
                      "p-2 rounded-full transition-colors opacity-100 md:opacity-0 md:group-hover:opacity-100",
                      entry.pinned ? "text-os-accent hover:bg-white/10" : "text-os-text-muted/50 hover:text-os-accent hover:bg-white/10"
                    )}
                    title={entry.pinned ? "Unpin Entry" : "Pin Entry"}
                  >
                    <Pin size={18} className={entry.pinned ? "fill-current" : ""} />
                  </button>
                  <button
                    onClick={() => setShowDeleteConfirm(true)}
                    className="p-2 rounded-full transition-colors opacity-100 md:opacity-0 md:group-hover:opacity-100 text-red-400 hover:text-red-500 hover:bg-red-500/20"
                    title="Delete Entry"
                  >
                    <Trash2 size={16} />
                  </button>
                </>
              )}
            {isAuthenticated ? (
              <button
                onClick={() => toggleFavorite(entry.id)}
                className={cn(
                "p-2 rounded-full transition-colors opacity-100 md:opacity-0 md:group-hover:opacity-100",
                entry.favorite ? "text-[#f59e0b] hover:bg-yellow-500/20" : "text-os-text-muted/50 hover:text-[#f59e0b] hover:bg-yellow-500/20"
              )}
            >
              <Star size={18} className={entry.favorite ? "fill-current" : ""} />
            </button>
            ) : (
              <>
                {entry.pinned && (
                  <div className="p-2 text-os-accent" title="Pinned">
                    <Pin size={18} className="fill-current" />
                  </div>
                )}
                {entry.favorite && (
                  <div className="p-2 text-[#f59e0b]">
                    <Star size={18} className="fill-current" />
                  </div>
                )}
              </>
            )}
            </div>
          </div>
          
          <div className="mt-4 text-os-text text-sm md:text-base leading-relaxed whitespace-pre-wrap font-serif">
            {entry.message}
          </div>
        </div>
      </div>
      
      <ConfirmDialog
        isOpen={showDeleteConfirm}
        title="Delete Entry"
        message="Are you sure you want to delete this guestbook entry? This action cannot be undone."
        confirmText="Delete"
        onConfirm={() => deleteEntry(entry.id)}
        onCancel={() => setShowDeleteConfirm(false)}
      />
    </div>
  );
}
