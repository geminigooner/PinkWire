import React, { useEffect } from 'react';
import { Toolbar } from './components/Toolbar/Toolbar';
import { TabBar } from './components/TabBar/TabBar';
import { Content } from './components/Content/Content';
import { StatusBar } from './components/StatusBar/StatusBar';
import { useBrowserStore } from './store/useBrowserStore';

interface BrowserAppData {
  url?: string;
}

export function BrowserApp({ appData }: { appData?: unknown }) {
  const { tabs, createTab, navigate, activeTabId } = useBrowserStore();
  const data = appData as BrowserAppData | undefined;

  useEffect(() => {
    if (tabs.length === 0) {
      createTab(data?.url);
    } else if (data?.url) {
      if (activeTabId) {
        navigate(activeTabId, data.url);
      } else {
        createTab(data.url);
      }
    }
  }, [data?.url]); // eslint-disable-line

  return (
    <div className="flex flex-col w-full h-full bg-os-window-bg overflow-hidden font-sans">
      <TabBar />
      <Toolbar />
      <Content />
      <StatusBar />
    </div>
  );
}
