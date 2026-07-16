import React, { useState, useEffect } from 'react';
import { useDesktopStore } from '../store/useDesktopStore';

export function StickersRenderer() {
  const stickers = useDesktopStore(state => state.stickers);
  const updateStickerPosition = useDesktopStore(state => state.updateStickerPosition);
  
  const [draggedSticker, setDraggedSticker] = useState<string | null>(null);

  useEffect(() => {
    const handlePointerMove = (e: PointerEvent) => {
      if (draggedSticker) {
        updateStickerPosition(draggedSticker, e.clientX - 24, e.clientY - 24);
      }
    };

    const handlePointerUp = () => {
      setDraggedSticker(null);
    };

    if (draggedSticker) {
      window.addEventListener('pointermove', handlePointerMove);
      window.addEventListener('pointerup', handlePointerUp);
    }

    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerup', handlePointerUp);
    };
  }, [draggedSticker, updateStickerPosition]);

  return (
    <div className="absolute inset-0 z-0 pointer-events-none">
      {stickers.map((sticker) => (
        <div
          key={sticker.id}
          onPointerDown={(e) => {
            e.stopPropagation();
            setDraggedSticker(sticker.id);
          }}
          className="absolute cursor-grab active:cursor-grabbing text-4xl select-none pointer-events-auto filter drop-shadow-os"
          style={{
            transform: `translate(${sticker.x}px, ${sticker.y}px) rotate(${sticker.rotation}deg) scale(${sticker.scale})`,
            touchAction: 'none'
          }}
        >
          {sticker.type}
        </div>
      ))}
    </div>
  );
}
