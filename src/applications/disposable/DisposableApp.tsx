import React, { useEffect } from 'react';
import { Toolbar } from './components/Toolbar/Toolbar';
import { MainView } from './components/MainView/MainView';
import { StatusBar } from './components/StatusBar/StatusBar';
import { useDisposableStore } from './store/useDisposableStore';
import { Viewer } from './components/Viewer/Viewer';

interface DisposableAppData {
  imageUrl?: string;
}

export function DisposableApp({ appData }: { appData?: unknown }) {
  const openViewer = useDisposableStore(state => state.openViewer);
  const data = appData as DisposableAppData | undefined;

  useEffect(() => {
    if (data?.imageUrl) {
      openViewer(data.imageUrl);
    }
  }, [data?.imageUrl, openViewer]);

  return (
    <div className="flex flex-col w-full h-full bg-[#fcfcfc] overflow-hidden text-os-text font-sans">
      <Toolbar />
      <div className="flex flex-1 overflow-hidden relative">
        <MainView />
      </div>
      <StatusBar />
      <Viewer />
    </div>
  );
}
