import React from 'react';
import { usePinkWireStore } from '../../store/usePinkWireStore';
import { ConversationItem } from './ConversationItem';

export function ConversationList() {
  const { conversations, searchQuery } = usePinkWireStore();

  const filtered = conversations.filter(conv => {
    if (!searchQuery) return true;
    const lowerQuery = searchQuery.toLowerCase();
    
    // Title match
    if (conv.title.toLowerCase().includes(lowerQuery)) return true;
    
    // Tag match
    if (conv.tags?.some(tag => tag.toLowerCase().includes(lowerQuery))) return true;
    
    // Message match
    if (conv.messages.some(m => m.content.toLowerCase().includes(lowerQuery))) return true;
    
    // Participant match
    if (conv.participants.some(p => p.name.toLowerCase().includes(lowerQuery))) return true;
    
    return false;
  });

  return (
    <div className="flex-1 overflow-y-auto scrollbar-hide">
      {filtered.length === 0 ? (
        <div className="p-6 text-center text-sm text-os-text-muted">
          No conversations found.
        </div>
      ) : (
        <div className="divide-y divide-os-window-border/50">
          {filtered.map(conv => (
            <ConversationItem key={conv.id} conversation={conv} />
          ))}
        </div>
      )}
    </div>
  );
}
