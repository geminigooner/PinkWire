import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { StartMenuProfile } from './StartMenuProfile';
import { StartMenuSearch } from './StartMenuSearch';
import { StartMenuPinned } from './StartMenuPinned';
import { StartMenuRecent } from './StartMenuRecent';
import { StartMenuQuickActions } from './StartMenuQuickActions';
import { useSearchStore } from '../store/useSearchStore';

export function StartMenu({ onClose }: { onClose: () => void }) {
  const menuRef = useRef<HTMLDivElement>(null);
  const isSearching = useSearchStore(state => state.isSearching);
  const query = useSearchStore(state => state.query);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        const target = e.target as HTMLElement;
        if (!target.closest('.start-button')) {
          onClose();
        }
      }
    };
    
    // Desktop: click outside
    document.addEventListener('mousedown', handleClickOutside);
    
    // Keyboard shortcuts
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleKeyDown);
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  // Mobile layout uses full height almost, sliding up.
  // Desktop layout is bottom-anchored, floating panel.

  return (
    <div className="fixed inset-x-0 bottom-12 top-0 sm:absolute sm:inset-auto sm:bottom-14 sm:left-2 z-50 pointer-events-auto flex items-end sm:items-start justify-center sm:justify-start" ref={menuRef}>
      <motion.div 
        initial={{ y: '100%', opacity: 0.8 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: '100%', opacity: 0.8 }}
        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
        className="w-full sm:w-[28rem] max-h-full sm:h-[40rem] bg-os-taskbar-bg/95 backdrop-blur-os-os-os sm:border border-os-window-border sm:rounded-os shadow-os flex flex-col overflow-hidden rounded-t-3xl sm:rounded-t-2xl"
      >
        <div className="w-12 h-1.5 bg-white/20 rounded-full mx-auto mt-3 mb-1 sm:hidden shrink-0" />
        
        <div className="flex-1 overflow-y-auto custom-scrollbar flex flex-col p-4 sm:p-6 gap-6 relative">
          <StartMenuProfile onClose={onClose} />
          <StartMenuSearch onClose={onClose} />
          
          {query.trim().length > 0 ? (
             <div className="flex-1 flex flex-col min-h-0">
               {/* Search results handled inside StartMenuSearch or a separate wrapper. But let's render them here or inside StartMenuSearch. */}
             </div>
          ) : (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex flex-col gap-6"
            >
              <StartMenuPinned onClose={onClose} />
              <StartMenuQuickActions onClose={onClose} />
              <StartMenuRecent onClose={onClose} />
            </motion.div>
          )}
        </div>
      </motion.div>
    </div>
  );
}
