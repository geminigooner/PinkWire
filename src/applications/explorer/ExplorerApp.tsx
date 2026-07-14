import React, { useEffect } from 'react';
import { Toolbar } from './components/Toolbar/Toolbar';
import { Sidebar } from './components/Sidebar/Sidebar';
import { MainView } from './components/MainView/MainView';
import { StatusBar } from './components/StatusBar/StatusBar';
import { useExplorerStore } from './store/useExplorerStore';

interface ExplorerAppData {
  path?: string[];
}

export function ExplorerApp({ appData }: { appData?: unknown }) {
  const setCurrentPath = useExplorerStore(state => state.setCurrentPath);
  const data = appData as ExplorerAppData | undefined;

  useEffect(() => {
    if (data?.path) {
      setCurrentPath(data.path);
    }
  }, [data?.path, setCurrentPath]);

  return (
    <div className="flex flex-col w-full h-full bg-os-window-bg overflow-hidden text-os-text font-sans">
      <Toolbar />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <MainView />
      </div>
      <StatusBar />
    </div>
  );
}
