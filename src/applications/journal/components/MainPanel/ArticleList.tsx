import React from 'react';
import { useJournalStore } from '../../store/useJournalStore';
import { formatDistanceToNow } from 'date-fns';
import { cn } from '../../../../utils/cn';

export function ArticleList() {
  const { articles, activeCategoryId, searchQuery, setActiveArticle, activeArticleId } = useJournalStore();

  const filteredArticles = articles.filter(article => {
    // Category filter
    if (activeCategoryId === 'favorites' && !article.favorite) return false;
    if (activeCategoryId !== 'all' && activeCategoryId !== 'favorites' && article.category !== activeCategoryId) return false;
    
    // Search filter
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      if (!article.title.toLowerCase().includes(q) &&
          !article.summary.toLowerCase().includes(q) &&
          !article.content.toLowerCase().includes(q) &&
          !article.tags.some(t => t.toLowerCase().includes(q))) {
        return false;
      }
    }
    return true;
  });

  return (
    <div className="flex-1 overflow-y-auto bg-black/20 p-6 space-y-4">
      {filteredArticles.length === 0 ? (
        <div className="h-full flex flex-col items-center justify-center text-os-text-muted">
          <p className="text-sm">No entries found.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredArticles.map(article => (
            <div
              key={article.id}
              onClick={() => setActiveArticle(article.id)}
              className={cn(
                "group cursor-pointer rounded-xl border border-os-window-border bg-os-titlebar-bg/30 overflow-hidden transition-all hover:bg-os-titlebar-bg/80 hover:border-os-accent/50 flex flex-col h-full",
                activeArticleId === article.id && "border-os-accent shadow-[0_0_15px_rgba(var(--os-accent),0.2)]"
              )}
            >
              {article.coverImage && (
                <div className="h-32 w-full overflow-hidden border-b border-os-window-border">
                  <img 
                    src={article.coverImage} 
                    alt={article.title} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
              )}
              <div className="p-5 flex-1 flex flex-col">
                <div className="flex items-center gap-2 mb-3 text-[10px] text-os-text-muted uppercase tracking-wider font-medium">
                  <span>{formatDistanceToNow(new Date(article.date), { addSuffix: true })}</span>
                  <span>•</span>
                  <span>{article.readingTime} min read</span>
                </div>
                <h3 className="font-semibold text-os-text text-lg mb-2 leading-tight group-hover:text-os-accent transition-colors">
                  {article.title}
                </h3>
                <p className="text-sm text-os-text-muted line-clamp-3 leading-relaxed flex-1">
                  {article.summary}
                </p>
                {article.tags.length > 0 && (
                  <div className="mt-4 flex flex-wrap gap-2">
                    {article.tags.slice(0, 3).map(tag => (
                      <span key={tag} className="text-[10px] px-2 py-0.5 rounded-full bg-black/40 text-os-text-muted">
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
