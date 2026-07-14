import React, { useEffect } from 'react';
import { Sidebar } from './components/Sidebar/Sidebar';
import { Toolbar } from './components/Toolbar/Toolbar';
import { MainView } from './components/MainView/MainView';
import { StatusBar } from './components/StatusBar/StatusBar';
import { Viewer } from './components/Viewer/Viewer';
import { useDisposableStore } from './store/useDisposableStore';
import { cn } from '../../utils/cn';

export function DisposableApp({ appData }: { appData?: any }) {
  const { openViewer, isSidebarOpen, setSidebarOpen } = useDisposableStore();

  // Handle external images sent via appData
  useEffect(() => {
    if (appData?.imageUrl) {
      openViewer(appData.imageUrl);
    }
  }, [appData?.imageUrl, openViewer]);

  return (
    <div className="flex w-full h-full bg-os-window-bg text-os-text overflow-hidden font-sans relative">
      <div className={cn(
        "absolute inset-y-0 left-0 z-20 md:relative md:flex h-full w-56 transform transition-transform duration-300 ease-in-out",
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

      <div className="flex-1 flex flex-col min-w-0 relative">
        <Toolbar />
        <MainView />
        <StatusBar />
      </div>
      <Viewer />
    </div>
  );
}
