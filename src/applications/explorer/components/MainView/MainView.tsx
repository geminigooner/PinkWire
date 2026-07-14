import React, { useState, useRef } from 'react';
import { useExplorerStore } from '../../store/useExplorerStore';
import { useWindowStore } from '../../../../store/useWindowStore';
import { cn } from '../../../../utils/cn';
import { 
  Folder, FileText, FileImage, FileAudio, File, 
  ExternalLink, FileCode, FileJson
} from 'lucide-react';
import { FileItem } from '../../types';

export function MainView() {
  const { 
    files, currentPath, navigateToFolder, 
    selectedIds, toggleSelection, clearSelection, setSelectedIds,
    searchQuery, viewMode
  } = useExplorerStore();
  
  const openWindow = useWindowStore(state => state.openWindow);
  const currentFolderId = currentPath[currentPath.length - 1];

  let displayFiles = files.filter(f => f.parentId === currentFolderId);
  
  if (searchQuery) {
    displayFiles = files.filter(f => 
      f.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
      (f.tags && f.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase())))
    );
  }

  const getFileIcon = (file: FileItem) => {
    switch (file.type) {
      case 'folder': return Folder;
      case 'image': return FileImage;
      case 'audio': return FileAudio;
      case 'markdown': return FileText;
      case 'pdf': return FileText;
      case 'text': return FileText;
      case 'json': return FileJson;
      case 'shortcut': return ExternalLink;
      default: return File;
    }
  };

  const handleDoubleClick = (file: FileItem) => {
    if (file.type === 'folder') {
      navigateToFolder(file.id);
    } else if (file.type === 'markdown' && file.content?.articleId) {
      openWindow('journal', { articleId: file.content.articleId });
    } else if (file.type === 'image' && file.content?.imageUrl) {
      openWindow('disposable', { imageUrl: file.content.imageUrl });
    } else if (file.type === 'shortcut' && file.content?.appId) {
      openWindow(file.content.appId);
    }
  };

  const handlePointerDown = (e: React.PointerEvent, fileId: string) => {
    e.stopPropagation();
    if (e.ctrlKey || e.metaKey) {
      toggleSelection(fileId);
    } else {
      setSelectedIds([fileId]);
    }
  };

  const [contextMenu, setContextMenu] = useState<{ x: number, y: number, file: FileItem | null } | null>(null);
  const [propertiesModal, setPropertiesModal] = useState<FileItem | null>(null);

  const handleContextMenu = (e: React.MouseEvent, file: FileItem) => {
    e.preventDefault();
    e.stopPropagation();
    if (!selectedIds.includes(file.id)) {
      setSelectedIds([file.id]);
    }
    setContextMenu({ x: e.clientX, y: e.clientY, file });
  };

  const renderGrid = (size: 'large' | 'medium' | 'small') => {
    const sizeClasses = {
      large: 'w-24 h-24',
      medium: 'w-20 h-20',
      small: 'w-16 h-16'
    };
    
    const iconSizes = {
      large: 48,
      medium: 32,
      small: 24
    };

    return (
      <div className="grid grid-cols-[repeat(auto-fill,minmax(100px,1fr))] gap-4 p-4">
        {displayFiles.map(file => {
          const Icon = getFileIcon(file);
          const isSelected = selectedIds.includes(file.id);
          
          return (
            <div
              key={file.id}
              onPointerDown={(e) => handlePointerDown(e, file.id)}
              onDoubleClick={() => handleDoubleClick(file)}
              onContextMenu={(e) => handleContextMenu(e, file)}
              className={cn(
                "flex flex-col items-center gap-2 p-2 rounded-lg cursor-default select-none border transition-colors",
                isSelected 
                  ? "bg-os-accent/20 border-os-accent/40" 
                  : "border-transparent hover:bg-white/5"
              )}
            >
              <div className={cn(
                "flex items-center justify-center shrink-0",
                sizeClasses[size],
                file.type === 'folder' ? 'text-os-accent' : 'text-os-text-muted'
              )}>
                <Icon size={iconSizes[size]} className={file.type === 'folder' ? "fill-os-accent/20" : ""} />
              </div>
              <div className="text-xs text-center w-full truncate leading-tight px-1">
                {file.name}
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  const renderList = (isDetails: boolean) => {
    return (
      <div className="flex flex-col p-2">
        {isDetails && (
          <div className="grid grid-cols-[2fr_1fr_1fr_1fr] gap-4 px-3 py-1.5 border-b border-os-window-border text-xs font-medium text-os-text-muted mb-1">
            <div>Name</div>
            <div>Date Modified</div>
            <div>Type</div>
            <div>Size</div>
          </div>
        )}
        
        {displayFiles.map(file => {
          const Icon = getFileIcon(file);
          const isSelected = selectedIds.includes(file.id);
          
          return (
            <div
              key={file.id}
              onPointerDown={(e) => handlePointerDown(e, file.id)}
              onDoubleClick={() => handleDoubleClick(file)}
              onContextMenu={(e) => handleContextMenu(e, file)}
              className={cn(
                "flex items-center gap-3 px-3 py-1.5 rounded-lg cursor-default select-none transition-colors",
                isDetails ? "grid grid-cols-[2fr_1fr_1fr_1fr] gap-4" : "",
                isSelected 
                  ? "bg-os-accent/20 text-os-accent" 
                  : "hover:bg-white/5 text-os-text"
              )}
            >
              <div className="flex items-center gap-3 truncate">
                <Icon size={16} className={file.type === 'folder' ? "text-os-accent fill-os-accent/20 shrink-0" : "text-os-text-muted shrink-0"} />
                <span className="text-sm truncate">{file.name}</span>
              </div>
              
              {isDetails && (
                <>
                  <div className="text-xs text-os-text-muted truncate">
                    {new Date(file.modifiedAt).toLocaleDateString()}
                  </div>
                  <div className="text-xs text-os-text-muted truncate capitalize">
                    {file.type}
                  </div>
                  <div className="text-xs text-os-text-muted truncate">
                    {file.size ? `${Math.round(file.size / 1024)} KB` : '--'}
                  </div>
                </>
              )}
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div 
      className="flex-1 overflow-y-auto bg-black/20"
      onPointerDown={() => clearSelection()}
      onContextMenu={(e) => {
        e.preventDefault();
        setContextMenu(null);
      }}
    >
      {displayFiles.length === 0 ? (
        <div className="h-full flex flex-col items-center justify-center text-os-text-muted">
          <Folder size={48} className="opacity-20 mb-4" />
          <p>This folder is empty.</p>
        </div>
      ) : (
        <>
          {viewMode === 'large' && renderGrid('large')}
          {viewMode === 'medium' && renderGrid('medium')}
          {viewMode === 'small' && renderGrid('small')}
          {viewMode === 'list' && renderList(false)}
          {viewMode === 'details' && renderList(true)}
        </>
      )}

      {/* Context Menu (Placeholder) */}
      {contextMenu && (
        <>
          <div 
            className="fixed inset-0 z-40"
            onClick={() => setContextMenu(null)}
            onContextMenu={(e) => { e.preventDefault(); setContextMenu(null); }}
          />
          <div 
            className="fixed z-50 w-48 bg-os-window-bg/95 backdrop-blur-xl border border-os-window-border rounded-lg shadow-xl py-1"
            style={{ 
              left: Math.min(contextMenu.x, window.innerWidth - 192), 
              top: Math.min(contextMenu.y, window.innerHeight - 200) 
            }}
          >
            <button 
              className="w-full text-left px-4 py-1.5 text-sm hover:bg-os-accent hover:text-white transition-colors"
              onClick={() => {
                if (contextMenu.file) handleDoubleClick(contextMenu.file);
                setContextMenu(null);
              }}
            >
              Open
            </button>
            <button className="w-full text-left px-4 py-1.5 text-sm hover:bg-os-accent hover:text-white transition-colors">
              Open With...
            </button>
            <div className="my-1 border-t border-os-window-border" />
            <button className="w-full text-left px-4 py-1.5 text-sm hover:bg-os-accent hover:text-white transition-colors text-os-text-muted">
              Rename
            </button>
            <button className="w-full text-left px-4 py-1.5 text-sm hover:bg-os-accent hover:text-white transition-colors text-os-text-muted">
              Delete
            </button>
            <div className="my-1 border-t border-os-window-border" />
            <button 
              className="w-full text-left px-4 py-1.5 text-sm hover:bg-os-accent hover:text-white transition-colors"
              onClick={() => {
                if (contextMenu.file) setPropertiesModal(contextMenu.file);
                setContextMenu(null);
              }}
            >
              Properties
            </button>
          </div>
        </>
      )}

      {/* Properties Modal */}
      {propertiesModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
          <div className="bg-os-window-bg border border-os-window-border rounded-xl shadow-2xl w-full max-w-sm overflow-hidden flex flex-col">
            <div className="px-4 py-3 border-b border-os-window-border bg-os-titlebar-bg/50 flex items-center gap-3">
              <div className="p-2 bg-os-accent/20 rounded-lg">
                {(() => {
                  const Icon = getFileIcon(propertiesModal);
                  return <Icon size={20} className="text-os-accent" />;
                })()}
              </div>
              <h3 className="font-semibold text-os-text truncate pr-4">{propertiesModal.name} Properties</h3>
            </div>
            
            <div className="p-4 space-y-4 text-sm">
              <div className="grid grid-cols-[100px_1fr] gap-2">
                <span className="text-os-text-muted">Type:</span>
                <span className="text-os-text capitalize">{propertiesModal.type} File</span>
                
                <span className="text-os-text-muted">Size:</span>
                <span className="text-os-text">{propertiesModal.size ? `${(propertiesModal.size / 1024).toFixed(2)} KB` : '--'}</span>
                
                <span className="text-os-text-muted">Location:</span>
                <span className="text-os-text">{propertiesModal.parentId || 'root'}</span>
              </div>

              <div className="border-t border-os-window-border/50 pt-4 grid grid-cols-[100px_1fr] gap-2">
                <span className="text-os-text-muted">Created:</span>
                <span className="text-os-text">{propertiesModal.properties?.created || new Date(propertiesModal.createdAt).toLocaleDateString()}</span>
                
                <span className="text-os-text-muted">Modified:</span>
                <span className="text-os-text">
                  {propertiesModal.properties?.modifiedCount 
                    ? `${propertiesModal.properties.modifiedCount} times` 
                    : new Date(propertiesModal.modifiedAt).toLocaleDateString()}
                </span>
              </div>

              {propertiesModal.properties?.previousNames && propertiesModal.properties.previousNames.length > 0 && (
                <div className="border-t border-os-window-border/50 pt-4">
                  <span className="text-os-text-muted block mb-2">Previous Names:</span>
                  <div className="bg-black/30 border border-os-window-border/50 rounded-md p-2 space-y-1">
                    {propertiesModal.properties.previousNames.map((name, idx) => (
                      <div key={idx} className="text-os-text text-xs opacity-80 pl-2 border-l-2 border-os-window-border/50">
                        {name}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="px-4 py-3 border-t border-os-window-border bg-os-titlebar-bg/30 flex justify-end">
              <button 
                onClick={() => setPropertiesModal(null)}
                className="px-4 py-1.5 bg-white/10 hover:bg-white/20 text-os-text rounded-lg transition-colors text-sm font-medium"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
