import React from 'react';
import { useJournalStore } from '../../store/useJournalStore';
import { Toolbar } from './Toolbar';
import { ArticleList } from './ArticleList';
import { Reader } from '../Reader/Reader';
import { Editor } from '../Editor/Editor';
import { StatusBar } from './StatusBar';

export function MainPanel() {
  const { activeArticleId, isEditing } = useJournalStore();
  
  return (
    <div className="flex-1 flex flex-col min-w-0 relative">
      <Toolbar />
      {isEditing ? <Editor /> : (activeArticleId ? <Reader /> : <ArticleList />)}
      {activeArticleId && !isEditing && <StatusBar />}
    </div>
  );
}
