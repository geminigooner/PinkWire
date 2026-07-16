import React from 'react';
import { Sidebar } from './components/Sidebar';
import { MainPanel } from './components/MainPanel';

export function WallpaperApp() {
  return (
    <div className="flex w-full h-full bg-os-window-bg overflow-hidden text-os-text font-sans">
      <Sidebar />
      <MainPanel />
    </div>
  );
}
