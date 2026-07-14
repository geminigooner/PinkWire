import React, { useEffect } from 'react';
import { Toolbar } from './components/Toolbar/Toolbar';
import { TabBar } from './components/TabBar/TabBar';
import { Content } from './components/Content/Content';
import { StatusBar } from './components/StatusBar/StatusBar';
import { useBrowserStore } from './store/useBrowserStore';

export function BrowserApp({ appData }: { appData?: any }) {
  const { tabs, createTab, navigate, activeTabId } = useBrowserStore();

  useEffect(() => {
    if (tabs.length === 0) {
      createTab(appData?.url);
    } else if (appData?.url) {
      if (activeTabId) {
        navigate(activeTabId, appData.url);
      } else {
        createTab(appData.url);
      }
    }
  }, [appData?.url]); // eslint-disable-line

  return (
    <div className="flex flex-col w-full h-full bg-os-window-bg overflow-hidden font-sans">
      <TabBar />
      <Toolbar />
      <Content />
      <StatusBar />
    </div>
  );
}
