import React from 'react';
import { Wallpaper } from './Wallpaper';
import { DesktopIcon } from '../icons/DesktopIcon';
import { WindowManager } from '../windows/WindowManager';
import { Taskbar } from '../taskbar/Taskbar';
import { useDesktopStore } from '../store/useDesktopStore';

export function Desktop() {
  const { desktopIcons, selectIcon } = useDesktopStore();

  return (
    <div 
      className="fixed inset-0 overflow-hidden text-os-text select-none bg-os-bg font-sans"
      onPointerDown={() => selectIcon(null)}
      onContextMenu={(e) => e.preventDefault()}
    >
      <Wallpaper />
      
      <div className="absolute inset-0 z-0">
        {desktopIcons.map((icon) => (
          <DesktopIcon key={icon.id} id={icon.id} appId={icon.appId} x={icon.x} y={icon.y} />
        ))}
      </div>

      <WindowManager />
      <Taskbar />
    </div>
  );
}
