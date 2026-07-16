import React from 'react';
import ReactMarkdown from 'react-markdown';
import { Message } from '../../../types';

export function CodeMessage({ message }: { message: Message }) {
  return (
    <div className="text-[13px] bg-black/50 border border-os-window-border rounded-os p-3 overflow-x-auto font-mono">
      <ReactMarkdown
        components={{
          pre: ({node, ...props}) => <pre className="m-0 bg-transparent p-0 text-os-accent-hover" {...props} />,
          code: ({node, ...props}) => <code className="text-[12px] bg-transparent" {...props} />
        }}
      >
        {message.content}
      </ReactMarkdown>
    </div>
  );
}
