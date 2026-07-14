import React from 'react';

export function AboutCredits() {
  return (
    <div className="min-h-full p-8 md:p-12 text-os-text font-sans max-w-2xl mx-auto flex flex-col items-center justify-center text-center bg-black/20">
      <h1 className="text-3xl mb-2 font-light">PinkWire OS</h1>
      <p className="text-os-text-muted mb-12 tracking-widest text-sm uppercase">Internet ExplAmanda</p>
      
      <div className="space-y-8 max-w-lg">
        <div>
          <h2 className="text-os-accent text-sm font-bold uppercase tracking-widest mb-4">Philosophy</h2>
          <p className="text-os-text/80 leading-relaxed text-sm">
            The browser is not a wrapper. It is a portal.
            Designed to bridge the gap between the isolated grid and the broader digital universe.
            Built for Amanda.
          </p>
        </div>

        <div className="w-12 h-px bg-os-window-border mx-auto" />

        <div>
          <h2 className="text-os-accent text-sm font-bold uppercase tracking-widest mb-4">Credits</h2>
          <p className="text-os-text/80 leading-relaxed text-sm">
            Core Architecture: Keito<br />
            UX Design: Amanda<br />
            Graphics Engine: Gemini<br />
            State Management: Zustand
          </p>
        </div>
      </div>
    </div>
  );
}
