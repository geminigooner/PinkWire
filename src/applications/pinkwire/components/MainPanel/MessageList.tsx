import React, { useEffect, useRef } from 'react';
import { Conversation } from '../../types';
import { MessageItem } from './MessageItem';
import { usePinkWireStore } from '../../store/usePinkWireStore';

export function MessageList({ conversation }: { conversation: Conversation }) {
  const bottomRef = useRef<HTMLDivElement>(null);
  const { searchQuery } = usePinkWireStore();

  useEffect(() => {
    if (!searchQuery) {
      bottomRef.current?.scrollIntoView();
    }
  }, [conversation.id, conversation.messages, searchQuery]);

  const filteredMessages = React.useMemo(() => {
    if (!searchQuery) return conversation.messages;
    const lowerQuery = searchQuery.toLowerCase();
    
    // We only filter out messages if we want search to only show matching messages.
    // However, usually search in a messaging app either filters the conversation list,
    // or when searching within a conversation, it highlights/scrolls to it.
    // For this simple version, if there's a search query, we'll only show matching messages.
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
      <div ref={bottomRef} className="h-4" />
    </div>
  );
}
