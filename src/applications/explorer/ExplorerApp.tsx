import React, { useEffect } from 'react';
import { Sidebar } from './components/Sidebar/Sidebar';
import { Toolbar } from './components/Toolbar/Toolbar';
import { MainView } from './components/MainView/MainView';
import { StatusBar } from './components/StatusBar/StatusBar';
import { useExplorerStore } from './store/useExplorerStore';
import { cn } from '../../utils/cn';

export function ExplorerApp({ appData }: { appData?: any }) {
  const { setCurrentPath, isSidebarOpen, setSidebarOpen } = useExplorerStore();

  useEffect(() => {
    if (appData?.path) {
      setCurrentPath(appData.path);
    }
  }, [appData?.path, setCurrentPath]);

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

      <div className="flex-1 flex flex-col min-w-0 relative h-full">
        <Toolbar />
        <MainView />
        <StatusBar />
      </div>
    </div>
  );
}
