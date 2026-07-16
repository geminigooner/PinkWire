import React, { useState } from 'react';
import { useDesktopStore } from '../store/useDesktopStore';
import { Sticker as StickerIcon, X } from 'lucide-react';
import { cn } from '../utils/cn';

const AVAILABLE_STICKERS = [
  '⭐', '💖', '🌸', '💿', '🦋', '🎀', '✨', '💻', '🔮', '🧸'
];

export function StickersDrawer() {
  const [isOpen, setIsOpen] = useState(false);
  const addSticker = useDesktopStore(state => state.addSticker);

  const handleDragStart = (e: React.DragEvent, sticker: string) => {
    e.dataTransfer.setData('application/x-pinkwire-sticker', sticker);
  };

  const handleAddClick = (sticker: string) => {
    addSticker({
      type: sticker,
      x: window.innerWidth / 2 - 24 + (Math.random() * 40 - 20),
      y: window.innerHeight / 2 - 24 + (Math.random() * 40 - 20),
      rotation: Math.random() * 30 - 15,
      scale: 1
    });
  };

  return (
    <div className="absolute right-4 bottom-16 z-50 flex flex-col items-end pointer-events-none">
      <div 
        className={cn(
          "bg-os-window-bg/90 backdrop-blur-os-os-os border border-os-window-border rounded-os shadow-os overflow-hidden transition-all duration-300 mb-4 pointer-events-auto",
          isOpen ? "w-64 max-h-96 opacity-100" : "w-0 max-h-0 opacity-0 border-none"
        )}
      >
        <div className="p-3 border-b border-os-window-border flex items-center justify-between bg-black/20">
          <h3 className="font-medium text-sm">Sticker Drawer</h3>
          <button onClick={() => setIsOpen(false)} className="text-os-text-muted hover:text-os-text">
            <X size={14} />
          </button>
        </div>
        <div className="p-4 grid grid-cols-4 gap-3 max-h-64 overflow-y-auto">
          {AVAILABLE_STICKERS.map((sticker, idx) => (
            <button
              key={idx}
              draggable
              onDragStart={(e) => handleDragStart(e, sticker)}
              onClick={() => handleAddClick(sticker)}
              className="text-3xl hover:scale-110 hover:-rotate-6 transition-transform cursor-grab active:cursor-grabbing text-center"
            >
              {sticker}
            </button>
          ))}
        </div>
        <div className="p-3 border-t border-os-window-border bg-black/20 text-xs text-os-text-muted text-center">
          Click or drag onto desktop
        </div>
      </div>

      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-10 h-10 rounded-full bg-os-accent hover:bg-os-accent-hover text-white flex items-center justify-center shadow-os pointer-events-auto transition-transform hover:scale-105 active:scale-95"
      >
        <StickerIcon size={20} />
      </button>
    </div>
  );
}
