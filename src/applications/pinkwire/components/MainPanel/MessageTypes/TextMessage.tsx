import React from 'react';
import ReactMarkdown from 'react-markdown';
import { Message } from '../../../types';
import { useWindowStore } from '../../../../../store/useWindowStore';

export function TextMessage({ message }: { message: Message }) {
  const openWindow = useWindowStore(state => state.openWindow);

  return (
    <div className="text-[13px] text-os-text leading-relaxed">
      <ReactMarkdown
        components={{
          a: ({node, href, ...props}) => {
            if (href?.startsWith('os://')) {
              const url = new URL(href);
              const appId = url.host;
              const path = url.pathname.slice(1);
              
              return (
                <a 
                  className="text-os-accent hover:underline cursor-pointer font-medium"
                  onClick={(e) => {
                    e.preventDefault();
                    if (appId === 'journal') {
                      openWindow(appId, { articleId: path });
                    }
                  }}
                  {...props} 
                />
              );
            }
            return <a href={href} className="text-os-accent hover:underline cursor-pointer" target="_blank" rel="noopener noreferrer" {...props} />;
          }
        }}
      >
        {message.content}
      </ReactMarkdown>
    </div>
  );
}
