import React from 'react';
import { Sidebar } from './components/Sidebar/Sidebar';
import { MainPanel } from './components/MainPanel/MainPanel';

export function PinkWireApp() {
  return (
    <div className="flex w-full h-full bg-transparent text-os-text overflow-hidden font-sans">
      <Sidebar />
      <MainPanel />
    </div>
  );
}
