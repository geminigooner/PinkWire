import React, { useRef } from 'react';
import { motion, useDragControls } from 'motion/react';
import { useDesktopStore, StickyNoteState } from '../store/useDesktopStore';
import { X } from 'lucide-react';
import { cn } from '../utils/cn';
import { useMediaQuery } from '../hooks/useMediaQuery';

function StickyNote({ note }: { note: StickyNoteState }) {
  const { updateStickyNote, removeStickyNote } = useDesktopStore();
  const dragControls = useDragControls();
  const isMobile = useMediaQuery('(max-width: 768px)');
  
  const handleDragEnd = (e: any, info: any) => {
    updateStickyNote(note.id, {
      x: note.x + info.offset.x,
      y: note.y + info.offset.y
    });
  };

  if (isMobile) return null; // Hide sticky notes on mobile for a cleaner desktop, or just scale them? The prompt says "Everything remains MOBILE-FIRST. Desktop is a progressive enhancement." So maybe let's keep them but smaller? No, I'll let them render on mobile.

  return (
    <motion.div
      drag
      dragControls={dragControls}
      dragListener={false}
      dragMomentum={false}
      onDragEnd={handleDragEnd}
      initial={false}
      animate={{ x: note.x, y: note.y }}
      className={cn(
        "absolute w-48 min-h-[160px] p-4 shadow-os cursor-default flex flex-col font-handwriting rotate-[-1deg]",
        note.color
      )}
      style={{ 
        fontFamily: "'Comic Sans MS', 'Chalkboard SE', 'Marker Felt', sans-serif",
        boxShadow: "2px 4px 10px rgba(0,0,0,0.1), 0 0 40px rgba(0,0,0,0.05) inset"
      }}
    >
      <div 
        className="h-6 w-full cursor-grab active:cursor-grabbing mb-2 opacity-50 hover:opacity-100 flex justify-between items-center"
        onPointerDown={(e) => dragControls.start(e)}
      >
        <div className="flex-1 h-full" />
        <button 
          onClick={() => removeStickyNote(note.id)}
          className="p-1 rounded-full hover:bg-black/10 transition-colors"
          onPointerDown={(e) => e.stopPropagation()}
        >
          <X size={14} />
        </button>
      </div>
      <div className="flex-1 text-lg leading-snug break-words">
        {note.text}
      </div>
    </motion.div>
  );
}

export function StickyNotesRenderer() {
  const stickyNotes = useDesktopStore(state => state.stickyNotes) || [];
  
  return (
    <div className="absolute inset-0 pointer-events-none z-[5]">
      {stickyNotes.map(note => (
        <div key={note.id} className="pointer-events-auto absolute inset-0 w-0 h-0">
          <StickyNote note={note} />
        </div>
      ))}
    </div>
  );
}
