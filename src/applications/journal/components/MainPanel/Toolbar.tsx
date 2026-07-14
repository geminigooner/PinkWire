import React from 'react';
import { useJournalStore } from '../../store/useJournalStore';
import { ChevronLeft, Moon, Sun, Type, Menu } from 'lucide-react';
import { cn } from '../../../../utils/cn';

export function Toolbar() {
  const { activeArticleId, setActiveArticle, readingMode, toggleReadingMode, textSize, setTextSize, isSidebarOpen, setSidebarOpen } = useJournalStore();

  const cycleTextSize = () => {
    const sizes: ('small' | 'medium' | 'large')[] = ['small', 'medium', 'large'];
    const nextIdx = (sizes.indexOf(textSize) + 1) % sizes.length;
    setTextSize(sizes[nextIdx]);
  };

  return (
    <div className="h-14 shrink-0 border-b border-os-window-border bg-os-titlebar-bg/70 px-4 flex items-center justify-between">
      <div className="flex items-center gap-2">
        {!activeArticleId && (
          <button
            onClick={() => setSidebarOpen(!isSidebarOpen)}
            className="md:hidden flex items-center gap-1.5 p-1.5 rounded-lg text-os-text-muted hover:text-os-text hover:bg-white/10 transition-colors"
          >
            <Menu size={20} />
          </button>
        )}
        
        {activeArticleId && (
          <button
            onClick={() => setActiveArticle(null)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium text-os-text-muted hover:text-os-text hover:bg-white/10 transition-colors"
          >
            <ChevronLeft size={16} />
            Back
          </button>
        )}
      </div>

      {activeArticleId && (
        <div className="flex items-center gap-3">
          <button
            onClick={cycleTextSize}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium text-os-text-muted hover:text-os-text hover:bg-white/10 transition-colors border border-transparent"
            title="Toggle Text Size"
          >
            <Type size={14} />
            <span className="hidden sm:inline uppercase">{textSize}</span>
          </button>
          
          <div className="w-px h-4 bg-os-window-border" />
          
          <button
            onClick={toggleReadingMode}
            className={cn(
              "flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors border",
              readingMode 
                ? "bg-os-accent border-os-accent text-white" 
                : "bg-black/40 border-os-window-border text-os-text hover:bg-white/10"
            )}
          >
            {readingMode ? <Sun size={14} /> : <Moon size={14} />}
            <span className="hidden sm:inline">Reading Mode</span>
          </button>
        </div>
      )}
    </div>
  );
}
