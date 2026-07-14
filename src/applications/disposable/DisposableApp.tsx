import React, { useEffect } from 'react';
import { Sidebar } from './components/Sidebar/Sidebar';
import { Toolbar } from './components/Toolbar/Toolbar';
import { MainView } from './components/MainView/MainView';
import { StatusBar } from './components/StatusBar/StatusBar';
import { Viewer } from './components/Viewer/Viewer';
import { useDisposableStore } from './store/useDisposableStore';

export function DisposableApp({ appData }: { appData?: any }) {
  const openViewer = useDisposableStore(state => state.openViewer);

  // Handle external images sent via appData
  useEffect(() => {
    if (appData?.imageUrl) {
      openViewer(appData.imageUrl);
    }
  }, [appData?.imageUrl, openViewer]);

  return (
    <div className="flex w-full h-full bg-os-window-bg text-os-text overflow-hidden font-sans relative">
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0 relative">
        <Toolbar />
        <MainView />
        <StatusBar />
      </div>
      <Viewer />
    </div>
  );
}
