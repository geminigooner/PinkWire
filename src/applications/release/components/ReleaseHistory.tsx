import React from 'react';
import { useReleaseStore } from '../store/useReleaseStore';
import { format } from 'date-fns';
import { Rocket, FileText, Calendar, Tag } from 'lucide-react';

export function ReleaseHistory() {
  const { releases } = useReleaseStore();

  return (
    <div className="p-4 sm:p-8 max-w-3xl mx-auto space-y-6 sm:space-y-8 animate-in fade-in duration-300 pb-20">
      <div>
        <h2 className="text-xl sm:text-2xl font-light mb-1 text-os-text tracking-tight">Release History</h2>
        <p className="text-sm text-os-text-muted">A timeline of all published PinkWire OS versions.</p>
      </div>

      <div className="space-y-6 relative before:absolute before:inset-0 before:ml-[15px] sm:before:ml-[23px] before:w-px before:bg-white/10">
        {releases.map((release, index) => (
          <div key={release.id} className="relative flex gap-4 sm:gap-6 items-start">
            <div className={`w-8 h-8 sm:w-12 sm:h-12 rounded-full flex items-center justify-center shrink-0 z-10 border-4 border-[#1e1e2e] ${
              index === 0 ? 'bg-os-accent text-white' : 'bg-black/40 text-os-text-muted border-white/5'
            }`}>
              <Rocket size={index === 0 ? 16 : 14} className={index === 0 ? '' : 'opacity-50'} />
            </div>
            
            <div className="flex-1 bg-black/20 p-4 sm:p-5 rounded-os border border-white/5 space-y-3 hover:bg-black/30 transition-colors">
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2 border-b border-white/5 pb-3">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="text-lg font-medium text-os-text">v{release.version}</h3>
                    <span className="text-[10px] uppercase tracking-wider bg-white/10 text-os-text-muted px-1.5 py-0.5 rounded">
                      {release.type}
                    </span>
                  </div>
                  <h4 className="text-sm font-medium text-os-accent">{release.summary || 'Release'}</h4>
                </div>
                <div className="flex items-center gap-1.5 text-xs text-os-text-muted bg-black/30 px-2 py-1 rounded-os border border-white/5 shrink-0 w-fit">
                  <Calendar size={12} />
                  {format(new Date(release.date), 'MMM d, yyyy')}
                </div>
              </div>
              
              <div className="text-sm text-os-text-muted whitespace-pre-wrap font-sans leading-relaxed">
                {release.notes || 'No release notes provided.'}
              </div>
              
              <div className="pt-2 flex flex-wrap gap-2">
                <span className="inline-flex items-center gap-1.5 text-xs text-os-text-muted/70 bg-white/5 px-2 py-1 rounded border border-white/5">
                  <Tag size={10} />
                  {release.id.substring(0, 8)}
                </span>
              </div>
            </div>
          </div>
        ))}
        
        {releases.length === 0 && (
          <div className="text-center py-12 text-os-text-muted">
            No releases found.
          </div>
        )}
      </div>
    </div>
  );
}
