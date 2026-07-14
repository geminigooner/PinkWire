import React, { useEffect, useRef } from 'react';
import { useBrowserStore } from '../../store/useBrowserStore';
import { useWindowStore } from '../../../../store/useWindowStore';
import { HOMEPAGE_URL } from '../../data/mockData';
import { Homepage } from '../Pages/Homepage';
import { AboutSystem } from '../Pages/AboutSystem';
import { AboutHistory } from '../Pages/AboutHistory';
import { AboutCredits } from '../Pages/AboutCredits';

export function Content() {
  const { tabs, activeTabId, setLoading, setTitle } = useBrowserStore();
  const activeTab = tabs.find(t => t.id === activeTabId);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const openWindow = useWindowStore(state => state.openWindow);

  useEffect(() => {
    if (!activeTab) return;

    if (activeTab.url.startsWith('about:') || activeTab.url.startsWith('pinkwire://')) {
      setLoading(activeTab.id, false);
      let newTitle = activeTab.title;
      
      if (activeTab.url === HOMEPAGE_URL) newTitle = 'Internet ExplAmanda';
      else if (activeTab.url === 'about:system') newTitle = 'System Information';
      else if (activeTab.url === 'about:history') newTitle = 'History';
      else if (activeTab.url === 'about:credits') newTitle = 'Credits';
      
      if (newTitle !== activeTab.title) {
        setTitle(activeTab.id, newTitle);
      }
      
      // Auto-launch apps for pinkwire:// URLs
      if (activeTab.url.startsWith('pinkwire://')) {
        const urlPart = activeTab.url.replace('pinkwire://', '');
        const parts = urlPart.split('/');
        const appId = parts[0];
        const data = parts.length > 1 ? { path: parts.slice(1) } : undefined;
        
        // Map legacy/custom urls to real apps
        if (appId === 'archive' || appId === 'ledger' || appId === 'echo' || appId === 'dark-velvet' || appId === 'konset' || appId === 'vestige') {
          openWindow('explorer', { path: ['projects', `${appId}_proj`] });
        } else if (appId === 'desktop') {
          // do nothing or focus desktop
        } else if (appId === 'photos') {
          openWindow('disposable');
        } else if (appId === 'downloads') {
          openWindow('explorer', { path: ['downloads'] });
        } else if (appId === 'projects') {
          openWindow('explorer', { path: ['projects'] });
        } else if (appId) {
          openWindow(appId, data);
        }
      }
    } else {
      setLoading(activeTab.id, true);
    }
  }, [activeTab?.url, activeTab?.id, setLoading, setTitle, openWindow]);

  const handleIframeLoad = () => {
    if (activeTab && iframeRef.current) {
      setLoading(activeTab.id, false);
      try {
        const title = iframeRef.current.contentDocument?.title;
        if (title) setTitle(activeTab.id, title);
      } catch (e) {
        // Cross-origin
        const domain = new URL(activeTab.url).hostname;
        setTitle(activeTab.id, domain);
      }
    }
  };

  if (!activeTab) return <div className="flex-1 bg-black/20" />;

  const renderContent = () => {
    if (activeTab.url === HOMEPAGE_URL) return <Homepage tabId={activeTab.id} />;
    if (activeTab.url === 'about:system') return <AboutSystem />;
    if (activeTab.url === 'about:history') return <AboutHistory />;
    if (activeTab.url === 'about:credits') return <AboutCredits />;
    
    if (activeTab.url.startsWith('pinkwire://')) {
       return (
         <div className="flex-1 flex items-center justify-center bg-black/20 text-os-text-muted p-8 text-center">
            <div>
              <h2 className="text-xl text-os-text mb-2 font-medium">Opening Application...</h2>
              <p>PinkWire OS is handling the internal protocol: {activeTab.url}</p>
            </div>
         </div>
       )
    }

    // External website
    return (
      <iframe
        ref={iframeRef}
        src={activeTab.url}
        className="w-full h-full border-none bg-white"
        onLoad={handleIframeLoad}
        sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
        title="Browser Content"
      />
    );
  };

  return (
    <div className="flex-1 relative overflow-y-auto bg-[#e5e7eb] dark:bg-black/20">
      {renderContent()}
    </div>
  );
}
