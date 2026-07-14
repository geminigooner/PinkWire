import React from 'react';
import { SearchBar } from './SearchBar';
import { ConversationList } from './ConversationList';

export function Sidebar() {
  return (
    <div className="w-72 shrink-0 border-r border-os-window-border bg-os-window-bg/80 flex flex-col h-full">
      <SearchBar />
      <ConversationList />
    </div>
  );
}
