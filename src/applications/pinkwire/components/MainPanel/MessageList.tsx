import React, { useEffect, useRef } from 'react';
import { Conversation } from '../../types';
import { MessageItem } from './MessageItem';
import { usePinkWireStore } from '../../store/usePinkWireStore';

export function MessageList({ conversation }: { conversation: Conversation }) {
  const bottomRef = useRef<HTMLDivElement>(null);
  const { searchQuery, isTyping } = usePinkWireStore();
  const typing = isTyping[conversation.id];

  useEffect(() => {
    if (!searchQuery) {
      bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [conversation.id, conversation.messages, searchQuery, typing]);

  const filteredMessages = React.useMemo(() => {
    if (!searchQuery) return conversation.messages;
    const lowerQuery = searchQuery.toLowerCase();
    
    return conversation.messages.filter(m => 
      m.type === 'divider' || m.content.toLowerCase().includes(lowerQuery)
    );
  }, [conversation.messages, searchQuery]);

  return (
    <div className="flex-1 overflow-y-auto scrollbar-hide py-4 relative">
      {filteredMessages.map((msg, idx) => (
        <MessageItem 
          key={msg.id} 
          message={msg} 
          prevMessage={idx > 0 ? filteredMessages[idx - 1] : undefined}
          participants={conversation.participants}
        />
      ))}
      {typing && (
        <div className="flex items-center gap-2 px-6 py-2 text-os-text-muted text-sm italic">
          <div className="flex gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-os-text-muted animate-bounce" style={{ animationDelay: '0ms' }} />
            <span className="w-1.5 h-1.5 rounded-full bg-os-text-muted animate-bounce" style={{ animationDelay: '150ms' }} />
            <span className="w-1.5 h-1.5 rounded-full bg-os-text-muted animate-bounce" style={{ animationDelay: '300ms' }} />
          </div>
          {conversation.title} is typing...
        </div>
      )}
      <div ref={bottomRef} className="h-4" />
    </div>
  );
}
