import React from 'react';
import { useJournalStore } from '../../store/useJournalStore';
import ReactMarkdown from 'react-markdown';
import { format } from 'date-fns';
import { cn } from '../../../../utils/cn';
import { useWindowStore } from '../../../../store/useWindowStore';
import { useAudioStore } from '../../../../store/useAudioStore';
import { useAchievementStore } from '../../../../store/useAchievementStore';
import { Music2, Play } from 'lucide-react';

export function Reader() {
  const { articles, activeArticleId, textSize, readingMode } = useJournalStore();
  const openWindow = useWindowStore(state => state.openWindow);
  const { tracks, playTrack } = useAudioStore();
  
  const article = articles.find(a => a.id === activeArticleId);

  React.useEffect(() => {
    if (activeArticleId) {
      useAchievementStore.getState().trackPostRead(activeArticleId);
    }
  }, [activeArticleId]);

  if (!article) return null;

  const sizeClasses = {
    small: 'prose-sm',
    medium: 'prose-base',
    large: 'prose-lg',
  };

  const handlePlayReference = (type: string, id: string) => {
    openWindow('spun');
    if (type === 'track') {
      const track = tracks.find(t => t.id === id);
      if (track) {
        playTrack(track, tracks);
      }
    }
  };

  return (
    <div className={cn(
      "flex-1 overflow-y-auto custom-scrollbar transition-colors duration-500",
      readingMode ? "bg-[#FAF9F6] text-gray-900" : "bg-black/20 text-os-text"
    )}>
      <div className="max-w-3xl mx-auto px-4 md:px-8 py-8 md:py-16">
        <header className="mb-12 text-center">
          <div className={cn(
            "flex items-center justify-center gap-3 mb-6 text-sm font-medium tracking-wider uppercase",
            readingMode ? "text-gray-500" : "text-os-text-muted"
          )}>
            <span>{format(new Date(article.date), 'MMMM d, yyyy')}</span>
            <span>•</span>
            <span>{article.readingTime} min read</span>
            <span>•</span>
            <span className={readingMode ? "text-rose-600" : "text-os-accent"}>{article.category}</span>
          </div>

          <h1 className={cn(
            "text-4xl md:text-5xl font-bold mb-6 tracking-tight leading-tight",
            readingMode ? "text-gray-900" : "text-os-text text-shadow-sm"
          )}>
            {article.title}
          </h1>

          {article.tags.length > 0 && (
            <div className="flex justify-center flex-wrap gap-2">
              {article.tags.map(tag => (
                <span key={tag} className={cn(
                  "text-xs px-3 py-1 rounded-full",
                  readingMode ? "bg-gray-200/50 text-gray-600" : "bg-black/30 text-os-text-muted"
                )}>
                  #{tag}
                </span>
              ))}
            </div>
          )}
        </header>

        {article.coverImage && (
          <div className="mb-12 rounded-2xl overflow-hidden shadow-xl ring-1 ring-white/10">
            <img src={article.coverImage} alt="Cover" className="w-full h-auto object-cover" />
          </div>
        )}
        
        {article.references && article.references.length > 0 && (
          <div className={cn(
            "mb-10 p-4 rounded-xl border flex flex-col gap-3 max-w-2xl mx-auto",
            readingMode ? "bg-gray-100 border-gray-200" : "bg-black/20 border-os-window-border"
          )}>
            <div className={cn("text-xs font-semibold uppercase tracking-wider", readingMode ? "text-gray-500" : "text-os-text-muted")}>
              Attached Media
            </div>
            <div className="flex flex-col gap-2">
              {article.references.map(ref => (
                <button
                  key={`${ref.type}-${ref.id}`}
                  onClick={() => handlePlayReference(ref.type, ref.id)}
                  className={cn(
                    "flex items-center gap-3 p-3 rounded-lg transition-colors text-left group",
                    readingMode ? "bg-white border border-gray-200 hover:bg-gray-50" : "bg-black/40 border border-os-window-border hover:bg-white/5"
                  )}
                >
                  <div className={cn("p-2 rounded-md shadow-sm", readingMode ? "bg-rose-100 text-rose-600" : "bg-os-accent/20 text-os-accent")}>
                    {ref.type === 'track' && <Music2 size={16} />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className={cn("text-sm font-medium truncate", readingMode ? "text-gray-900 group-hover:text-rose-600" : "text-os-text group-hover:text-os-accent")}>{ref.name}</p>
                    <p className={cn("text-xs truncate", readingMode ? "text-gray-500" : "text-os-text-muted")}>Play {ref.type} in Spun.exe</p>
                  </div>
                  <Play size={16} className={readingMode ? "text-gray-400 group-hover:text-rose-600" : "text-os-text-muted group-hover:text-os-accent"} />
                </button>
              ))}
            </div>
          </div>
        )}

        {/* We use standard tailwind typography equivalent styles manually, or custom elements */}
        <div className={cn(
          "max-w-2xl mx-auto font-serif leading-relaxed",
          sizeClasses[textSize],
          readingMode 
            ? "prose prose-gray prose-headings:font-sans prose-headings:font-semibold prose-a:text-rose-600 prose-blockquote:border-rose-600 prose-blockquote:text-gray-700" 
            : "prose-invert prose-headings:font-sans prose-headings:font-medium prose-a:text-os-accent prose-blockquote:border-os-accent prose-blockquote:text-os-text-muted prose-hr:border-os-window-border"
        )}>
          <ReactMarkdown
            components={{
              h1: ({node, ...props}) => <h1 className="text-3xl mt-10 mb-4" {...props} />,
              h2: ({node, ...props}) => <h2 className="text-2xl mt-8 mb-4 border-b border-os-window-border/30 pb-2" {...props} />,
              h3: ({node, ...props}) => <h3 className="text-xl mt-6 mb-3" {...props} />,
              p: ({node, ...props}) => <p className="mb-6 opacity-90" {...props} />,
              a: ({node, ...props}) => <a className="underline decoration-current/30 hover:decoration-current transition-colors cursor-pointer" target="_blank" rel="noopener noreferrer" {...props} />,
              blockquote: ({node, ...props}) => <blockquote className="border-l-4 pl-4 italic my-6 opacity-80" {...props} />,
              ul: ({node, ...props}) => <ul className="list-disc pl-6 mb-6 space-y-2 opacity-90" {...props} />,
              ol: ({node, ...props}) => <ol className="list-decimal pl-6 mb-6 space-y-2 opacity-90" {...props} />,
              img: ({node, src, alt, ...props}) => (
                <span className="block my-8 group relative overflow-hidden rounded-xl border border-os-window-border shadow-lg cursor-pointer" onClick={() => src && openWindow('disposable', { imageUrl: src })}>
                  <img src={src} alt={alt} className="w-full h-auto transition-transform hover:scale-[1.02]" {...props} />
                  {alt && <span className="block text-center text-sm mt-3 opacity-60 font-sans px-4 pb-3">{alt}</span>}
                </span>
              ),
              code: ({node, className, children, ...props}) => {
                const match = /language-(\w+)/.exec(className || '');
                const isInline = !match && !node?.position?.start.line;
                if (!isInline && match) {
                  return (
                    <div className="my-6 rounded-lg overflow-hidden border border-os-window-border font-mono text-[13px] bg-black/60">
                      <div className="bg-black/40 px-4 py-2 border-b border-os-window-border flex items-center gap-2 text-os-text-muted text-xs">
                        <span className="w-2.5 h-2.5 rounded-full bg-red-500/50" />
                        <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/50" />
                        <span className="w-2.5 h-2.5 rounded-full bg-green-500/50" />
                        <span className="ml-2 uppercase">{match[1]}</span>
                      </div>
                      <pre className="p-4 overflow-x-auto text-os-accent-hover">
                        <code className={className} {...props}>{children}</code>
                      </pre>
                    </div>
                  );
                }
                return <code className="font-mono text-[0.9em] bg-black/30 px-1.5 py-0.5 rounded text-os-accent-hover" {...props}>{children}</code>;
              }
            }}
          >
            {article.content}
          </ReactMarkdown>
        </div>
        
        <footer className="mt-16 pt-8 border-t border-os-window-border/30 text-center">
           <p className={cn("font-serif italic", readingMode ? "text-gray-500" : "text-os-text-muted")}>End of entry.</p>
        </footer>
      </div>
    </div>
  );
}
