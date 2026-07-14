import React, { useState } from 'react';
import { motion } from 'motion/react';
import { useWindowStore } from '../store/useWindowStore';
import { useDesktopStore } from '../store/useDesktopStore';
import { AppRegistry } from '../applications/registry';
import { cn } from '../utils/cn';
import { useMediaQuery } from '../hooks/useMediaQuery';

export function DesktopIcon({ id, appId, x, y }: { id: string, appId: string, x: number, y: number }) {
  const openWindow = useWindowStore(state => state.openWindow);
  const { updateIconPosition, selectedIconId, selectIcon, snapToGrid, autoArrangeIcons, showLabels } = useDesktopStore();
  const [isDragging, setIsDragging] = useState(false);
  const isMobile = useMediaQuery('(max-width: 768px)');
  
  const app = AppRegistry[appId];
  if (!app) return null;

  const Icon = app.icon;
  const isSelected = selectedIconId === id;

  const handleDragEnd = (e: MouseEvent | TouchEvent | PointerEvent, info: any) => {
    setIsDragging(false);
    let newX = x + info.offset.x;
    let newY = y + info.offset.y;
    
    if (snapToGrid) {
      newX = Math.round(newX / 100) * 100 + 20;
      newY = Math.round(newY / 100) * 100 + 20;
    }
    
    updateIconPosition(id, newX, newY);
  };

  return (
    <motion.div 
      drag={!isMobile && !autoArrangeIcons}
      dragMomentum={false}
      onDragStart={() => setIsDragging(true)}
      onDragEnd={handleDragEnd}
      initial={{ x, y }}
      animate={{ x, y }}
      className={cn(
        "absolute flex flex-col items-center gap-1.5 w-24 p-2 rounded-lg cursor-pointer transition-colors group",
        isSelected ? "bg-white/20" : "hover:bg-white/10"
      )}
      onPointerDown={(e) => {
        e.stopPropagation();
        selectIcon(id);
      }}
      onClick={(e) => {
        e.stopPropagation();
        if (isMobile) {
          openWindow(appId);
        }
      }}
      onDoubleClick={(e) => {
        e.stopPropagation();
        if (!isMobile) {
          openWindow(appId);
        }
      }}
    >
      <div className={cn(
        "w-12 h-12 rounded-xl flex items-center justify-center shadow-lg border transition-colors",
        isSelected ? "bg-os-accent/20 border-os-accent" : "bg-os-window-bg border-os-window-border group-hover:border-os-accent/50"
      )}>
        <Icon size={24} className={isSelected ? "text-white" : "text-os-accent"} />
      </div>
      {showLabels && (
        <span className="text-xs font-medium text-center text-os-text drop-shadow-md select-none line-clamp-2">{app.name}</span>
      )}
    </motion.div>
  );
}
