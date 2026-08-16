import React, { useEffect } from 'react';
import { Sidebar } from './components/Sidebar';
import { MainView } from './components/MainView';
import { Toolbar } from './components/Toolbar';
import { StatusBar } from './components/StatusBar';
import { VisitorProfile } from './components/VisitorProfile';
import { useGuestbookStore } from './store/useGuestbookStore';

export function GuestbookApp() {
  const seedMockData = useGuestbookStore(state => state.seedMockData);

  useEffect(() => {
    seedMockData();
  }, [seedMockData]);

  return (
    <div className="flex flex-col w-full h-full bg-black/20 text-os-text overflow-hidden font-serif">
      <Toolbar />
      <div className="flex flex-1 overflow-hidden relative">
        <Sidebar />
        <MainView />
      </div>
      <StatusBar />
      <VisitorProfile />
    </div>
  );
}
