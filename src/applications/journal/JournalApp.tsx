import React, { useEffect } from 'react';
import { Sidebar } from './components/Sidebar/Sidebar';
import { MainPanel } from './components/MainPanel/MainPanel';
import { useJournalStore } from './store/useJournalStore';

export function JournalApp({ appData }: { appData?: any }) {
  const setActiveArticle = useJournalStore(state => state.setActiveArticle);

  useEffect(() => {
    if (appData?.articleId) {
      setActiveArticle(appData.articleId);
    }
  }, [appData?.articleId, setActiveArticle]);

  return (
    <div className="flex w-full h-full bg-os-window-bg text-os-text overflow-hidden font-sans relative">
      <Sidebar />
      <MainPanel />
    </div>
  );
}
