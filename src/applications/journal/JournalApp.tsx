import React, { useEffect } from 'react';
import { Sidebar } from './components/Sidebar/Sidebar';
import { MainPanel } from './components/MainPanel/MainPanel';
import { useJournalStore } from './store/useJournalStore';
import { cn } from '../../utils/cn';

export function JournalApp({ appData }: { appData?: any }) {
  const { setActiveArticle, isSidebarOpen, setSidebarOpen, activeArticleId } = useJournalStore();

  useEffect(() => {
    if (appData?.articleId) {
      setActiveArticle(appData.articleId);
    }
  }, [appData?.articleId, setActiveArticle]);

  return (
    <div className="flex w-full h-full bg-os-window-bg text-os-text overflow-hidden font-sans relative">
      <div className={cn(
        "absolute inset-y-0 left-0 z-20 md:relative md:flex h-full w-64 transform transition-transform duration-300 ease-in-out",
        isSidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
      )}>
        <Sidebar />
      </div>
      
      {/* Mobile overlay */}
      {isSidebarOpen && (
        <div 
          className="absolute inset-0 bg-black/50 z-10 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <div className={cn(
        "flex-1 min-w-0 flex h-full transition-all duration-300",
        activeArticleId ? "flex" : (isSidebarOpen ? "hidden md:flex" : "flex")
      )}>
        <MainPanel />
      </div>
    </div>
  );
}
