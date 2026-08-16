import React, { useEffect } from 'react';
import { motion, useMotionValue } from 'motion/react';
import { useDesktopStore, StickerState } from '../store/useDesktopStore';

function Sticker({ sticker }: { sticker: StickerState }) {
  const updateStickerPosition = useDesktopStore(state => state.updateStickerPosition);
  
  const x = useMotionValue(sticker.x);
  const y = useMotionValue(sticker.y);

  useEffect(() => {
    x.set(sticker.x);
    y.set(sticker.y);
  }, [sticker.x, sticker.y, x, y]);

  const handleDragEnd = () => {
    updateStickerPosition(sticker.id, x.get(), y.get());
  };

  return (
    <motion.div
      drag
      dragMomentum={false}
      onDragEnd={handleDragEnd}
      style={{ x, y, touchAction: 'none' }}
      animate={{ rotate: sticker.rotation, scale: sticker.scale }}
      className="absolute left-0 top-0 cursor-grab active:cursor-grabbing text-4xl select-none pointer-events-auto filter drop-shadow-os"
      onPointerDown={(e) => e.stopPropagation()}
    >
      {sticker.type}
    </motion.div>
  );
}

export function StickersRenderer() {
  const stickers = useDesktopStore(state => state.stickers);
  
  return (
    <div className="absolute inset-0 z-[4] pointer-events-none">
      {stickers.map((sticker) => (
        <div key={sticker.id} className="pointer-events-auto absolute inset-0 w-0 h-0">
          <Sticker sticker={sticker} />
        </div>
      ))}
    </div>
  );
}

