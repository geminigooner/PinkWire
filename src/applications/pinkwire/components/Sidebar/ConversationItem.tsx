import React from 'react';
import { Conversation, UserStatus } from '../../types';
import { usePinkWireStore } from '../../store/usePinkWireStore';
import { cn } from '../../../../utils/cn';
import { formatDistanceToNow } from 'date-fns';
import { Hash } from 'lucide-react';

const statusColors: Record<UserStatus, string> = {
  online: 'bg-green-500',
  away: 'bg-yellow-500',
  busy: 'bg-red-500',
  offline: 'bg-gray-500',
  invisible: 'bg-gray-500',
};

export function ConversationItem({ conversation }: { conversation: Conversation }) {
  const { activeConversationId, setActiveConversation } = usePinkWireStore();
  const isActive = activeConversationId === conversation.id;
  
  const lastMessage = conversation.messages[conversation.messages.length - 1];
  const participant = conversation.participants[0]; // assuming 1on1 for now

  return (
    <button
      onClick={() => setActiveConversation(conversation.id)}
      className={cn(
        "w-full text-left p-3 flex items-start gap-3 transition-colors border-l-2",
        isActive 
          ? "bg-os-accent/10 border-os-accent" 
          : "border-transparent hover:bg-white/5"
      )}
    >
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
            "absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-os-window-bg",
            statusColors[participant.status]
          )} />
        )}
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex justify-between items-baseline mb-0.5">
          <h3 className={cn(
            "font-medium truncate text-sm",
            isActive ? "text-os-accent text-shadow-sm" : "text-os-text"
          )}>
            {conversation.title}
          </h3>
          <span className="text-[10px] text-os-text-muted shrink-0 ml-2">
            {formatDistanceToNow(new Date(conversation.lastUpdated), { addSuffix: true })}
          </span>
        </div>
        
        <p className="text-xs text-os-text-muted truncate">
          {lastMessage?.type === 'text' ? lastMessage.content : 
           lastMessage?.type === 'image' ? '📸 Image' : 
           lastMessage?.type === 'code' ? '💻 Code snippet' : 
           'New message'}
        </p>

        {conversation.tags && conversation.tags.length > 0 && (
          <div className="flex gap-1 mt-1.5 overflow-hidden">
            {conversation.tags.map(tag => (
              <span key={tag} className="inline-flex items-center text-[9px] px-1.5 py-0.5 rounded-sm bg-black/30 text-os-text-muted whitespace-nowrap">
                <Hash size={8} className="mr-0.5 opacity-70" />
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </button>
  );
}
