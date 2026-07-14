import React from 'react';
import { usePinkWireStore } from '../../store/usePinkWireStore';
import { MessageList } from './MessageList';
import { Hash, Phone, Video, Info } from 'lucide-react';
import { cn } from '../../../../utils/cn';

const statusColors = {
  online: 'bg-green-500',
  away: 'bg-yellow-500',
  busy: 'bg-red-500',
  offline: 'bg-gray-500',
  invisible: 'bg-gray-500',
};

export function MainPanel() {
  const { conversations, activeConversationId } = usePinkWireStore();
  const conversation = conversations.find(c => c.id === activeConversationId);

  if (!conversation) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center bg-black/20 text-os-text-muted">
        <div className="w-16 h-16 rounded-2xl bg-os-window-bg border border-os-window-border flex items-center justify-center mb-4 shadow-lg">
          <Hash size={32} className="text-os-accent/50" />
        </div>
        <p>Select a conversation to start reading.</p>
      </div>
    );
  }

  const participant = conversation.participants[0];

  return (
    <div className="flex-1 flex flex-col min-w-0 bg-black/20">
      {/* Header */}
      <div className="h-16 shrink-0 border-b border-os-window-border bg-os-titlebar-bg/50 px-6 flex items-center justify-between">
        <div className="flex items-center gap-3 min-w-0">
          <div className="relative shrink-0">
            {participant?.avatar ? (
              <img src={participant.avatar} alt="" className="w-10 h-10 rounded-full object-cover" />
            ) : (
              <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-pink-600 to-purple-600 flex items-center justify-center text-white font-medium">
                {conversation.title.charAt(0)}
              </div>
            )}
            {participant && (
              <div className={cn(
                "absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-os-titlebar-bg",
                statusColors[participant.status]
              )} />
            )}
          </div>
          <div className="min-w-0">
            <h2 className="font-semibold text-os-text truncate">{conversation.title}</h2>
            {participant?.customStatus && (
              <p className="text-xs text-os-text-muted truncate">{participant.customStatus}</p>
            )}
          </div>
        </div>
        
        <div className="flex items-center gap-4 text-os-text-muted shrink-0 ml-4">
          <button className="hover:text-os-text transition-colors"><Phone size={18} /></button>
          <button className="hover:text-os-text transition-colors"><Video size={18} /></button>
          <button className="hover:text-os-text transition-colors"><Info size={18} /></button>
        </div>
      </div>

      {/* Messages */}
      <MessageList conversation={conversation} />

      {/* Input area (disabled for phase 4) */}
      <div className="p-4 border-t border-os-window-border bg-os-titlebar-bg/30">
        <div className="bg-black/40 border border-os-window-border rounded-lg p-3 text-sm text-os-text-muted/50 cursor-not-allowed">
          Viewing conversation history...
        </div>
      </div>
    </div>
  );
}
