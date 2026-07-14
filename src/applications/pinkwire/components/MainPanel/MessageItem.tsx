import React from 'react';
import { Conversation, Message, Participant } from '../../types';
import { format } from 'date-fns';
import { TextMessage } from './MessageTypes/TextMessage';
import { ImageMessage } from './MessageTypes/ImageMessage';
import { CodeMessage } from './MessageTypes/CodeMessage';
import { QuoteMessage } from './MessageTypes/QuoteMessage';

export function MessageItem({ message, prevMessage, participants }: { message: Message, prevMessage?: Message, participants: Participant[] }) {
  if (message.type === 'divider') {
    return (
      <div className="flex justify-center my-6">
        <span className="text-[10px] font-medium text-os-text-muted bg-black/30 px-3 py-1 rounded-full uppercase tracking-wider">
          {message.content}
        </span>
      </div>
    );
  }

  // Determine if we should group this message with the previous one
  let isGrouped = false;
  if (prevMessage && prevMessage.senderId === message.senderId && prevMessage.type !== 'divider') {
    const timeDiff = new Date(message.timestamp).getTime() - new Date(prevMessage.timestamp).getTime();
    if (timeDiff < 5 * 60 * 1000) { // 5 minutes
      isGrouped = true;
    }
  }

  const isMe = message.senderId === 'me';
  const sender = isMe ? { name: 'Amanda', avatar: '' } : participants.find(p => p.id === message.senderId);

  const renderContent = () => {
    switch (message.type) {
      case 'text': return <TextMessage message={message} />;
      case 'image': return <ImageMessage message={message} />;
      case 'code': return <CodeMessage message={message} />;
      case 'quote': return <QuoteMessage message={message} />;
      default: return <TextMessage message={message} />;
    }
  };

  return (
    <div className={`flex gap-3 px-6 ${isGrouped ? 'mt-1' : 'mt-4'} group`}>
      {/* Avatar column */}
      <div className="w-8 shrink-0 flex flex-col items-end">
        {!isGrouped && sender && (
          sender.avatar ? (
            <img src={sender.avatar} alt="" className="w-8 h-8 rounded-lg object-cover" />
          ) : (
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-pink-600 to-purple-600 flex items-center justify-center text-white font-medium text-xs">
              {sender.name.charAt(0)}
            </div>
          )
        )}
        {isGrouped && (
          <span className="text-[10px] text-os-text-muted opacity-0 group-hover:opacity-100 transition-opacity mt-1">
            {format(new Date(message.timestamp), 'HH:mm')}
          </span>
        )}
      </div>

      {/* Message content */}
      <div className="flex-1 min-w-0">
        {!isGrouped && sender && (
          <div className="flex items-baseline gap-2 mb-1">
            <span className="font-medium text-[13px] text-os-text">{sender.name}</span>
            <span className="text-[10px] text-os-text-muted">{format(new Date(message.timestamp), 'h:mm a')}</span>
          </div>
        )}
        {renderContent()}
      </div>
    </div>
  );
}
