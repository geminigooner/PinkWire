import React from 'react';
import ReactMarkdown from 'react-markdown';
import { Message } from '../../../types';

export function QuoteMessage({ message }: { message: Message }) {
  return (
    <div className="text-[13px] text-os-text leading-relaxed">
      <ReactMarkdown
        components={{
          blockquote: ({node, ...props}) => (
            <blockquote className="border-l-2 border-os-accent pl-3 text-os-text-muted my-1" {...props} />
          )
        }}
      >
        {message.content}
      </ReactMarkdown>
    </div>
  );
}
