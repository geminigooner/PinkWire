import React from 'react';
import { Message } from '../../../types';
import { useWindowStore } from '../../../../../store/useWindowStore';

export function ImageMessage({ message }: { message: Message }) {
  const openWindow = useWindowStore(state => state.openWindow);

  if (!message.attachments || message.attachments.length === 0) return null;
  
  return (
    <div className="flex flex-col gap-2 mt-1">
      {message.content && (
        <span className="text-[13px] text-os-text mb-1">{message.content}</span>
      )}
      {message.attachments.map(att => (
        <div 
          key={att.id} 
          onDoubleClick={() => openWindow('disposable', { imageUrl: att.url })}
          className="relative group cursor-pointer overflow-hidden rounded-os border border-os-window-border max-w-md"
        >
          <img 
            src={att.url} 
            alt={att.name} 
            className="w-full object-cover transition-transform group-hover:scale-[1.02]"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
        </div>
      ))}
    </div>
  );
}
