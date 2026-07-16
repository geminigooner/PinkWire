import React from 'react';
import { useJournalStore } from '../../store/useJournalStore';
import { ChevronLeft, Moon, Sun, Type, Menu, FilePlus, Save, Edit, Check } from 'lucide-react';
import { cn } from '../../../../utils/cn';
import { useAuthStore } from '../../../../store/useAuthStore';

export function Toolbar() {
  const { 
    activeArticleId, setActiveArticle, readingMode, toggleReadingMode, 
    textSize, setTextSize, isSidebarOpen, setSidebarOpen,
    isEditing, startEditing, stopEditing, saveDraft, saveStatus, publishArticle
  } = useJournalStore();
  const { isAuthenticated } = useAuthStore();

  const cycleTextSize = () => {
    const sizes: ('small' | 'medium' | 'large')[] = ['small', 'medium', 'large'];
    const nextIdx = (sizes.indexOf(textSize) + 1) % sizes.length;
    setTextSize(sizes[nextIdx]);
  };

  return (
    <div className="h-14 shrink-0 border-b border-os-window-border bg-os-titlebar-bg/70 px-4 flex items-center justify-between">
      <div className="flex items-center gap-2">
        {!activeArticleId && !isEditing && isAuthenticated && (
          <button
            onClick={() => startEditing()}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium bg-os-accent/20 text-os-accent hover:bg-os-accent hover:text-white transition-colors mr-2"
          >
            <FilePlus size={16} />
            <span className="hidden sm:inline">New Entry</span>
          </button>
        )}
        {!activeArticleId && !isEditing && (
          <button
            onClick={() => setSidebarOpen(!isSidebarOpen)}
            className="md:hidden flex items-center gap-1.5 p-1.5 rounded-lg text-os-text-muted hover:text-os-text hover:bg-white/10 transition-colors"
          >
            <Menu size={20} />
          </button>
        )}
        
        {(activeArticleId || isEditing) && (
          <button
            onClick={() => isEditing ? stopEditing() : setActiveArticle(null)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium text-os-text-muted hover:text-os-text hover:bg-white/10 transition-colors"
          >
            <ChevronLeft size={16} />
            Back
          </button>
        )}
      </div>

      {activeArticleId && !isEditing && (
        <div className="flex items-center gap-3">
          {isAuthenticated && (
            <button
              onClick={() => startEditing(activeArticleId)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-os-accent border border-os-accent/30 hover:bg-os-accent hover:text-white transition-colors"
              title="Edit Post"
            >
              <Edit size={14} />
              <span className="hidden sm:inline">Edit</span>
            </button>
          )}

          <div className="w-px h-4 bg-os-window-border" />
          
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

      {isEditing && (
        <div className="flex items-center gap-2">
          <span className={cn(
            "text-xs transition-opacity mr-2",
            saveStatus === 'saved' ? "text-green-400 opacity-100" : 
            saveStatus === 'saving' ? "text-os-text-muted opacity-100" : "opacity-0"
          )}>
            {saveStatus === 'saved' ? 'Saved' : 'Saving...'}
          </span>
          <button
            onClick={() => saveDraft()}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-os-text border border-os-window-border hover:bg-white/10 transition-colors"
          >
            <Save size={14} />
            <span className="hidden sm:inline">Save Draft</span>
          </button>
          <button
            onClick={() => publishArticle()}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-os-accent text-white hover:bg-pink-600 transition-colors shadow-[0_0_10px_rgba(236,72,153,0.3)]"
          >
            <Check size={14} />
            <span className="hidden sm:inline">Publish</span>
          </button>
        </div>
      )}
    </div>
  );
}
