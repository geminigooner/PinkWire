import React from 'react';
import { useJournalStore } from '../../store/useJournalStore';
import { format } from 'date-fns';

export function StatusBar() {
  const { articles, activeArticleId } = useJournalStore();
  const article = articles.find(a => a.id === activeArticleId);

  if (!article) return null;

  // Simple word count approximation
  const wordCount = article.content.trim().split(/\\s+/).length;

  return (
    <div className="h-8 shrink-0 border-t border-os-window-border bg-os-titlebar-bg flex items-center justify-between px-4 text-[10px] text-os-text-muted">
      <div className="flex items-center gap-4">
        <span>{wordCount} words</span>
        <span>{article.readingTime} min read</span>
      </div>
      <div>
        {format(new Date(article.date), 'MMM d, yyyy')}
      </div>
    </div>
  );
}
