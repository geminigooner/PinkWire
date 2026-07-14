import React from 'react';
import { useExplorerStore } from '../../store/useExplorerStore';

export function StatusBar() {
  const { files, currentPath, selectedIds } = useExplorerStore();
  
  const currentFolderId = currentPath[currentPath.length - 1];
  const folderItems = files.filter(f => f.parentId === currentFolderId);
  
  return (
    <div className="h-8 shrink-0 bg-os-titlebar-bg/90 border-t border-os-window-border px-4 flex items-center justify-between text-[11px] text-os-text-muted select-none">
      <div className="flex items-center gap-4">
        <span>{folderItems.length} items</span>
        {selectedIds.length > 0 && (
          <>
            <div className="w-px h-3 bg-os-window-border" />
            <span>{selectedIds.length} item{selectedIds.length !== 1 ? 's' : ''} selected</span>
          </>
        )}
      </div>
      <div className="flex items-center gap-4">
        <span>PinkWire OS</span>
      </div>
    </div>
  );
}
