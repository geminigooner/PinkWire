import React, { useEffect } from 'react';
import { Sidebar } from './components/Sidebar/Sidebar';
import { MainPanel } from './components/MainPanel/MainPanel';
import { useJournalStore } from './store/useJournalStore';

interface JournalAppData {
  articleId?: string;
}

export function JournalApp({ appData }: { appData?: unknown }) {
  const setActiveArticle = useJournalStore(state => state.setActiveArticle);
  const data = appData as JournalAppData | undefined;

  useEffect(() => {
    if (data?.articleId) {
      setActiveArticle(data.articleId);
    }
  }, [data?.articleId, setActiveArticle]);

  return (
    <div className="flex w-full h-full bg-os-window-bg overflow-hidden text-os-text font-sans">
      <Sidebar />
      <MainPanel />
    </div>
  );
}
