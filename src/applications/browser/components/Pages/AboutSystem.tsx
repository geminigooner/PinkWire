import React from 'react';

export function AboutSystem() {
  return (
    <div className="min-h-full p-8 md:p-12 text-os-text font-mono max-w-4xl mx-auto bg-black/20">
      <h1 className="text-2xl mb-8 font-bold border-b border-os-window-border pb-4">about:system</h1>
      
      <div className="space-y-6">
        <section>
          <h2 className="text-os-accent mb-2">OS Information</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-sm bg-black/40 p-4 border border-os-window-border rounded-os shadow-os">
            <div className="text-os-text-muted">OS Name</div>
            <div className="col-span-1 sm:col-span-2">PinkWire OS</div>
            
            <div className="text-os-text-muted">Version</div>
            <div className="col-span-1 sm:col-span-2">2.4.1 (Stable)</div>
            
            <div className="text-os-text-muted">Build Date</div>
            <div className="col-span-1 sm:col-span-2">July 2026</div>

            <div className="text-os-text-muted">Current User</div>
            <div className="col-span-1 sm:col-span-2">Amanda</div>

            <div className="text-os-text-muted">Uptime</div>
            <div className="col-span-1 sm:col-span-2">942 days, 14 hours</div>
          </div>
        </section>

        <section>
          <h2 className="text-os-accent mb-2">Browser Engine</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-sm bg-black/40 p-4 border border-os-window-border rounded-os shadow-os">
            <div className="text-os-text-muted">Name</div>
            <div className="col-span-1 sm:col-span-2">Internet ExplAmanda</div>
            
            <div className="text-os-text-muted">Renderer</div>
            <div className="col-span-1 sm:col-span-2">Webkit/PinkWire Native</div>
            
            <div className="text-os-text-muted">V8</div>
            <div className="col-span-1 sm:col-span-2">Enabled</div>
          </div>
        </section>
        
        <section>
          <h2 className="text-os-accent mb-2">Storage</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-sm bg-black/40 p-4 border border-os-window-border rounded-os shadow-os">
            <div className="text-os-text-muted">Total Space</div>
            <div className="col-span-1 sm:col-span-2">4.0 TB</div>
            
            <div className="text-os-text-muted">Used Space</div>
            <div className="col-span-1 sm:col-span-2">2.1 TB (Mostly Memes)</div>
            
            <div className="text-os-text-muted">Local Storage</div>
            <div className="col-span-1 sm:col-span-2">512 MB allocated for browser</div>
          </div>
        </section>
      </div>
    </div>
  );
}
