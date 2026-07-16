import React, { useRef, useState, useEffect } from 'react';
import { useJournalStore } from '../../store/useJournalStore';
import { 
  Bold, Italic, Heading1, Heading2, List, ListOrdered, 
  Quote, Code, Link, Image as ImageIcon, Minus, Undo2, Redo2 
} from 'lucide-react';
import { cn } from '../../../../utils/cn';
import { MediaPickerModal } from './MediaPickerModal';

export function Editor() {
  const { draftArticle, updateDraft, saveDraft, saveStatus } = useJournalStore();
  const [content, setContent] = useState(draftArticle?.content || '');
  const [title, setTitle] = useState(draftArticle?.title || '');
  const [summary, setSummary] = useState(draftArticle?.summary || '');
  const [coverImage, setCoverImage] = useState(draftArticle?.coverImage || '');
  const [tagsInput, setTagsInput] = useState(draftArticle?.tags?.join(', ') || '');
  const [category, setCategory] = useState(draftArticle?.category || 'research');
  const { categories } = useJournalStore();
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  
  const [showMediaPicker, setShowMediaPicker] = useState(false);
  const [mediaPickerMode, setMediaPickerMode] = useState<'content' | 'cover'>('content');

  const [history, setHistory] = useState<string[]>([draftArticle?.content || '']);
  const [historyIndex, setHistoryIndex] = useState(0);

  // Autosave
  useEffect(() => {
    const timer = setTimeout(() => {
      if (
        draftArticle && 
        (content !== draftArticle.content || 
         title !== draftArticle.title || 
         summary !== draftArticle.summary ||
         coverImage !== draftArticle.coverImage)
      ) {
        updateDraft({ 
          content, title, summary, coverImage, 
          category, 
          tags: tagsInput.split(',').map(t => t.trim()).filter(Boolean)
        });
        saveDraft();
      }
    }, 2000);
    return () => clearTimeout(timer);
  }, [content, title, summary, coverImage, draftArticle, updateDraft, saveDraft]);

  const insertFormatting = (prefix: string, suffix: string = '') => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const text = textarea.value;
    const selected = text.substring(start, end);
    
    let replacement = '';
    let newSelectionStart = start;
    let newSelectionEnd = end;

    if (suffix) {
      replacement = `${prefix}${selected}${suffix}`;
      newSelectionStart = start + prefix.length;
      newSelectionEnd = end + prefix.length;
    } else {
      replacement = `${prefix}${selected}`;
      newSelectionStart = start + prefix.length;
      newSelectionEnd = start + prefix.length + selected.length;
    }

    const newContent = text.substring(0, start) + replacement + text.substring(end);
    
    setContent(newContent);
    updateHistory(newContent);
    
    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(newSelectionStart, newSelectionEnd);
    }, 0);
  };

  const updateHistory = (newVal: string) => {
    const newHistory = history.slice(0, historyIndex + 1);
    newHistory.push(newVal);
    setHistory(newHistory);
    setHistoryIndex(newHistory.length - 1);
  };

  const handleUndo = () => {
    if (historyIndex > 0) {
      const newIdx = historyIndex - 1;
      setHistoryIndex(newIdx);
      setContent(history[newIdx]);
    }
  };

  const handleRedo = () => {
    if (historyIndex < history.length - 1) {
      const newIdx = historyIndex + 1;
      setHistoryIndex(newIdx);
      setContent(history[newIdx]);
    }
  };

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      if (content !== history[historyIndex]) {
        updateHistory(content);
      }
    }, 1000);
    return () => clearTimeout(timer);
  }, [content, history, historyIndex]);

  const words = content.trim() ? content.trim().split(/\s+/).length : 0;
  const chars = content.length;
  const readingTime = Math.max(1, Math.ceil(words / 200));

  const ToolbarButton = ({ icon: Icon, onClick, title }: { icon: any, onClick: () => void, title: string }) => (
    <button
      onClick={onClick}
      title={title}
      className="p-1.5 rounded text-os-text-muted hover:text-os-text hover:bg-white/10 transition-colors"
    >
      <Icon size={16} />
    </button>
  );

  return (
    <div className="flex-1 flex flex-col min-w-0 bg-os-window-bg overflow-hidden relative">
      <div className="h-10 shrink-0 border-b border-os-window-border bg-os-titlebar-bg/40 px-4 flex items-center justify-between overflow-x-auto">
        <div className="flex items-center gap-1 shrink-0">
          <ToolbarButton icon={Bold} title="Bold" onClick={() => insertFormatting('**', '**')} />
          <ToolbarButton icon={Italic} title="Italic" onClick={() => insertFormatting('*', '*')} />
          <div className="w-px h-4 bg-os-window-border mx-1" />
          <ToolbarButton icon={Heading1} title="Heading 1" onClick={() => insertFormatting('# ')} />
          <ToolbarButton icon={Heading2} title="Heading 2" onClick={() => insertFormatting('## ')} />
          <div className="w-px h-4 bg-os-window-border mx-1" />
          <ToolbarButton icon={List} title="Bullet List" onClick={() => insertFormatting('- ')} />
          <ToolbarButton icon={ListOrdered} title="Numbered List" onClick={() => insertFormatting('1. ')} />
          <div className="w-px h-4 bg-os-window-border mx-1" />
          <ToolbarButton icon={Quote} title="Quote" onClick={() => insertFormatting('> ')} />
          <ToolbarButton icon={Code} title="Code" onClick={() => insertFormatting('`', '`')} />
          <div className="w-px h-4 bg-os-window-border mx-1" />
          <ToolbarButton icon={Link} title="Link" onClick={() => insertFormatting('[', '](url)')} />
          <ToolbarButton icon={ImageIcon} title="Image" onClick={() => {
            setMediaPickerMode('content');
            setShowMediaPicker(true);
          }} />
          <ToolbarButton icon={Minus} title="Horizontal Rule" onClick={() => insertFormatting('\n---\n')} />
        </div>
        <div className="flex items-center gap-1 shrink-0 ml-4">
          <button 
            onClick={handleUndo} 
            disabled={historyIndex <= 0}
            className="p-1.5 rounded text-os-text-muted hover:text-os-text hover:bg-white/10 disabled:opacity-30 disabled:hover:bg-transparent transition-colors"
          >
            <Undo2 size={16} />
          </button>
          <button 
            onClick={handleRedo} 
            disabled={historyIndex >= history.length - 1}
            className="p-1.5 rounded text-os-text-muted hover:text-os-text hover:bg-white/10 disabled:opacity-30 disabled:hover:bg-transparent transition-colors"
          >
            <Redo2 size={16} />
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-10 flex justify-center">
        <div className="w-full max-w-3xl flex flex-col gap-6 pb-20">
          
          <div className="group relative w-full h-48 bg-black/20 border border-dashed border-os-window-border rounded-os flex items-center justify-center overflow-hidden hover:border-os-accent/50 transition-colors">
            {coverImage ? (
              <>
                <img src={coverImage} alt="Cover" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
                  <button onClick={() => { setMediaPickerMode('cover'); setShowMediaPicker(true); }} className="px-4 py-2 rounded-os bg-os-accent text-white text-sm font-medium">Change Cover</button>
                  <button onClick={() => setCoverImage('')} className="px-4 py-2 rounded-os bg-black/60 text-white text-sm font-medium hover:bg-red-500 transition-colors">Remove</button>
                </div>
              </>
            ) : (
              <button 
                onClick={() => { setMediaPickerMode('cover'); setShowMediaPicker(true); }}
                className="flex flex-col items-center gap-2 text-os-text-muted hover:text-os-accent transition-colors"
              >
                <ImageIcon size={32} />
                <span className="text-sm font-medium">Add Cover Image</span>
              </button>
            )}
          </div>

          <input
            type="text"
            placeholder="Article Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full bg-transparent border-none outline-none text-4xl sm:text-5xl font-semibold text-os-text placeholder-os-text-muted/30"
          />
          <textarea
            placeholder="A short excerpt or summary..."
            value={summary}
            onChange={(e) => setSummary(e.target.value)}
            rows={2}
            className="w-full bg-transparent border-none outline-none text-lg text-os-text-muted placeholder-os-text-muted/30 resize-none font-serif"
          />
          
          <div className="flex flex-col sm:flex-row gap-4 border-y border-os-window-border py-4 my-2">
            <div className="flex-1 flex flex-col gap-1">
              <label className="text-xs uppercase tracking-wider text-os-text-muted font-medium">Category</label>
              <select 
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="bg-black/30 border border-os-window-border rounded-os px-3 py-2 text-sm text-os-text outline-none focus:border-os-accent/50"
              >
                {categories.filter(c => c.id !== 'all' && c.id !== 'favorites').map(c => (
                  <option key={c.id} value={c.id}>{c.name}</option>
                ))}
              </select>
            </div>
            <div className="flex-[2] flex flex-col gap-1">
              <label className="text-xs uppercase tracking-wider text-os-text-muted font-medium">Tags (comma separated)</label>
              <input 
                type="text"
                placeholder="e.g. design, react, os"
                value={tagsInput}
                onChange={(e) => setTagsInput(e.target.value)}
                className="w-full bg-black/30 border border-os-window-border rounded-os px-3 py-2 text-sm text-os-text outline-none focus:border-os-accent/50"
              />
            </div>
          </div>
          
          <div className="w-16 h-1 bg-os-accent/30 rounded-full my-2" />
          <textarea
            ref={textareaRef}
            placeholder="Write your thoughts here..."
            value={content}
            onChange={handleContentChange}
            className="w-full flex-1 min-h-[500px] bg-transparent border-none outline-none text-os-text text-lg leading-relaxed placeholder-os-text-muted/20 resize-none font-serif"
          />
        </div>
      </div>

      {/* Editor Footer / Stats */}
      <div className="h-8 shrink-0 border-t border-os-window-border bg-os-titlebar-bg/80 px-4 flex items-center justify-between text-xs text-os-text-muted">
        <div className="flex items-center gap-4">
          <span>{words} words</span>
          <span>{chars} characters</span>
          <span>{readingTime} min read</span>
        </div>
      </div>

      {showMediaPicker && (
        <MediaPickerModal 
          onClose={() => setShowMediaPicker(false)}
          onSelect={(url) => {
            if (mediaPickerMode === 'cover') {
              setCoverImage(url);
            } else {
              insertFormatting(`![alt](${url})`, '');
            }
            setShowMediaPicker(false);
          }}
        />
      )}
    </div>
  );
}
