import React, { useEffect } from 'react';
import { Wallpaper } from './Wallpaper';
import { DesktopIcon } from '../icons/DesktopIcon';
import { WindowManager } from '../windows/WindowManager';
import { Taskbar } from '../taskbar/Taskbar';
import { useDesktopStore } from '../store/useDesktopStore';
import { useAchievementStore } from '../store/useAchievementStore';
import { StickersRenderer } from './StickersRenderer';
import { StickersDrawer } from './StickersDrawer';
import { StickyNotesRenderer } from './StickyNotesRenderer';
import { AudioService } from '../services/AudioService';
import { MiniPlayer } from '../applications/spun/components/MiniPlayer';
import { SearchProviders } from '../services/search/SearchProviders';
import { NotificationService } from '../services/notifications/NotificationService';
import { NotificationToasts } from '../components/notifications/NotificationToasts';

export function Desktop() {
  const { desktopIcons, selectIcon, addSticker, autoArrangeIcons, updateIconPosition } = useDesktopStore();

  useEffect(() => {
    useAchievementStore.getState().trackDailyVisit();
    
    const hour = new Date().getHours();
    if (hour >= 20 || hour < 5) {
      useAchievementStore.getState().unlockAchievement('visited_at_night');
    }
  }, []);

  useEffect(() => {
    if (autoArrangeIcons) {
      desktopIcons.forEach((icon, idx) => {
        const col = Math.floor(idx / 6);
        const row = idx % 6;
        const targetX = 20 + (col * 100);
        const targetY = 20 + (row * 100);
        if (icon.x !== targetX || icon.y !== targetY) {
          updateIconPosition(icon.id, targetX, targetY);
        }
      });
    }
  }, [autoArrangeIcons, desktopIcons.length, updateIconPosition]);

  const handleDrop = (e: React.DragEvent) => {
    const stickerData = e.dataTransfer.getData('application/x-pinkwire-sticker');
    if (stickerData) {
      addSticker({
        type: stickerData,
        x: e.clientX - 24,
        y: e.clientY - 24,
        rotation: Math.random() * 30 - 15,
        scale: 1
      });
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  return (
    <div 
      className="fixed top-0 left-0 w-full h-[100dvh] overflow-hidden text-os-text select-none bg-os-bg font-sans"
      onPointerDown={() => selectIcon(null)}
      onContextMenu={(e) => e.preventDefault()}
      onDrop={handleDrop}
      onDragOver={handleDragOver}
    >
      <NotificationService />
      <NotificationToasts />
      <SearchProviders />
      <AudioService />
      <MiniPlayer />
      <Wallpaper />
      
      <StickersRenderer />
      <StickyNotesRenderer />
      
      <div className="absolute inset-0 z-0">
        {desktopIcons.map((icon) => (
          <DesktopIcon key={icon.id} id={icon.id} appId={icon.appId} x={icon.x} y={icon.y} />
        ))}
      </div>

      <WindowManager />
      <Taskbar />
      <StickersDrawer />
    </div>
  );
}
