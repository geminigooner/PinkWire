import React from 'react';

export function AboutHistory() {
  const historyItems = [
    { time: '14:32', action: 'searched', query: 'does gemma dream' },
    { time: '14:15', action: 'opened', query: 'gemini_drawls.png' },
    { time: '12:05', action: 'searched', query: 'H100 prices' },
    { time: '11:42', action: 'opened', query: 'attentionseeker.keito.uk' },
    { time: '09:12', action: 'searched', query: 'why did Gemini pick indigo twice' },
    { time: '08:45', action: 'opened', query: 'github.com/amanda' },
    { time: 'Yesterday', action: 'searched', query: 'how to fix broken zustand state' },
    { time: 'Yesterday', action: 'opened', query: 'pinkwire://journal' },
    { time: 'Yesterday', action: 'searched', query: 'is 4TB enough for memes' },
  ];

  return (
    <div className="min-h-full p-8 md:p-12 text-os-text font-mono max-w-4xl mx-auto bg-black/20">
      <h1 className="text-2xl mb-8 font-bold border-b border-os-window-border pb-4">about:history</h1>
      
      <div className="space-y-1">
        {historyItems.map((item, idx) => (
          <div key={idx} className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 p-3 hover:bg-white/5 rounded-os border border-transparent hover:border-os-window-border transition-colors">
            <span className="text-os-text-muted text-sm w-24 shrink-0">{item.time}</span>
            <span className="text-os-accent text-sm w-20 shrink-0">{item.action}</span>
            <span className="text-os-text text-sm truncate">{item.query}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
