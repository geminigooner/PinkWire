import React, { useRef, useState } from 'react';
import { motion, useDragControls } from 'motion/react';
import { useWindowStore } from '../store/useWindowStore';
import { AppRegistry } from '../applications/registry';
import { Minus, Square, X } from 'lucide-react';
import { cn } from '../utils/cn';
import { useMediaQuery } from '../hooks/useMediaQuery';
import { ErrorBoundary } from '../components/ErrorBoundary';

export function WindowNode({ id }: { id: string }) {
  const windowState = useWindowStore(state => state.windows.find(w => w.id === id));
  const { focusWindow, closeWindow, minimizeWindow, toggleMaximizeWindow, updateWindowPosition, updateWindowSize, focusedWindowId } = useWindowStore();
  
  const windowRef = useRef<HTMLDivElement>(null);
  const dragControls = useDragControls();
  const [isResizing, setIsResizing] = useState(false);
  const isMobile = useMediaQuery('(max-width: 768px)');

  if (!windowState) return null;

  const appDef = AppRegistry[windowState.appId];
  if (!appDef) return null;

  const isFocused = focusedWindowId === id;
  const { zIndex, x, y, width, height } = windowState;
  const isMaximized = windowState.isMaximized || isMobile;

  const AppComponent = appDef.component;
  
  if (windowState.isMinimized) return null;

  const isResizable = appDef.resizable !== false && !isMobile;
  const isDraggable = appDef.draggable !== false && !isMobile;

  // Add a bound check when drag ends
  const handleDragEnd = () => {
    if (windowRef.current && !isMobile) {
       const rect = windowRef.current.getBoundingClientRect();
       
       let newX = rect.left;
       let newY = rect.top;
       
       // Keep window titlebar somewhat visible (prevent losing it off screen)
       if (newY < 0) newY = 0;
       if (newX > window.innerWidth - 40) newX = window.innerWidth - 40;
       if (newX < -rect.width + 40) newX = -rect.width + 40;
       
       updateWindowPosition(id, newX, newY);
    }
  };

  return (
    <motion.div
      ref={windowRef}
      id={`window-${id}`}
      drag={!isMaximized && isDraggable}
      dragControls={dragControls}
      dragListener={false}
      dragMomentum={false}
      onDragEnd={handleDragEnd}
      initial={false}
      animate={
        isMaximized 
          ? { x: 0, y: 0, width: '100%', height: '100%', paddingBottom: 0 } 
          : { x, y, width, height, paddingBottom: 0 }
      }
      transition={isResizing ? { duration: 0 } : { duration: 0.2, type: 'spring', bounce: 0 }}
      onPointerDown={() => focusWindow(id)}
      style={{ zIndex, position: 'absolute', top: 0, left: 0 }}
      className={cn(
        "flex flex-col bg-os-window-bg backdrop-blur-os-os-os overflow-hidden pointer-events-auto",
        !isMaximized && "rounded-os border shadow-os",
        !isMaximized && isFocused ? "border-os-accent/50 shadow-os-accent/20" : (!isMaximized && "border-os-window-border shadow-black/50")
      )}
    >
      {/* Title Bar */}
      <div 
        className="flex items-center justify-between h-10 px-3 select-none bg-os-titlebar-bg border-b border-os-window-border shrink-0"
        onPointerDown={(e) => {
          focusWindow(id);
          if (isDraggable) {
            dragControls.start(e);
          }
        }}
        onDoubleClick={() => isResizable && toggleMaximizeWindow(id)}
      >
        <div className="flex items-center gap-2">
           {(() => {
             const Icon = appDef.icon;
             return Icon ? <Icon size={16} className="text-os-accent" /> : null;
           })()}
           <span className="text-sm font-medium text-os-text">{windowState.title}</span>
        </div>
        <div className="flex items-center gap-2">
          <button onPointerDown={(e) => e.stopPropagation()} onClick={() => minimizeWindow(id)} className="p-1.5 text-os-text-muted hover:text-os-text hover:bg-white/10 rounded-os transition-colors" aria-label="Minimize">
            <Minus size={14} />
          </button>
          {isResizable && (
            <button onPointerDown={(e) => e.stopPropagation()} onClick={() => toggleMaximizeWindow(id)} className="p-1.5 text-os-text-muted hover:text-os-text hover:bg-white/10 rounded-os transition-colors" aria-label="Maximize">
              <Square size={12} />
            </button>
          )}
          <button onPointerDown={(e) => e.stopPropagation()} onClick={() => closeWindow(id)} className="p-1.5 text-os-text-muted hover:text-white hover:bg-red-500 rounded-os transition-colors" aria-label="Close">
            <X size={14} />
          </button>
        </div>
      </div>
      
      {/* Content */}
      <div className="flex-1 overflow-hidden relative">
        <ErrorBoundary>
          <AppComponent appData={windowState.appData} windowId={id} />
        </ErrorBoundary>
      </div>

      {/* Resize Handle */}
      {!isMaximized && isResizable && (
        <div 
          className="absolute bottom-0 right-0 w-4 h-4 cursor-se-resize z-50"
          onPointerDown={(e) => {
            e.preventDefault();
            e.stopPropagation();
            focusWindow(id);
            setIsResizing(true);
            const startX = e.clientX;
            const startY = e.clientY;
            const startWidth = windowRef.current?.offsetWidth || width;
            const startHeight = windowRef.current?.offsetHeight || height;
            const minW = appDef.minWidth || 300;
            const minH = appDef.minHeight || 200;

            const onPointerMove = (moveEvent: PointerEvent) => {
              const newWidth = Math.max(minW, startWidth + (moveEvent.clientX - startX));
              const newHeight = Math.max(minH, startHeight + (moveEvent.clientY - startY));
              updateWindowSize(id, newWidth, newHeight);
            };

            const onPointerUp = () => {
              setIsResizing(false);
              document.removeEventListener('pointermove', onPointerMove);
              document.removeEventListener('pointerup', onPointerUp);
            };

            document.addEventListener('pointermove', onPointerMove);
            document.addEventListener('pointerup', onPointerUp);
          }}
        />
      )}
    </motion.div>
  );
}
