import React from 'react';
import { Sidebar } from './components/Sidebar/Sidebar';
import { MainPanel } from './components/MainPanel/MainPanel';
import { usePinkWireStore } from './store/usePinkWireStore';
import { cn } from '../../utils/cn';

export function PinkWireApp() {
  const activeConversationId = usePinkWireStore(state => state.activeConversationId);
  
  return (
    <div className="flex w-full h-full bg-transparent text-os-text overflow-hidden font-sans">
      <div className={cn("w-full md:w-auto shrink-0 md:flex h-full", activeConversationId ? "hidden" : "flex")}>
        <Sidebar />
      </div>
      <div className={cn("flex-1 min-w-0 md:flex h-full", activeConversationId ? "flex" : "hidden")}>
        <MainPanel />
      </div>
    </div>
  );
}
