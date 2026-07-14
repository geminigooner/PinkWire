import React from 'react';
import ReactMarkdown from 'react-markdown';
import { Message } from '../../../types';

export function TextMessage({ message }: { message: Message }) {
  return (
    <div className="text-[13px] text-os-text leading-relaxed">
      <ReactMarkdown
        components={{
          a: ({node, ...props}) => <a className="text-os-accent hover:underline cursor-pointer" target="_blank" rel="noopener noreferrer" {...props} />
        }}
      >
        {message.content}
      </ReactMarkdown>
    </div>
  );
}
