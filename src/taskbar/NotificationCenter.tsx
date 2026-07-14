import React, { useState } from 'react';
import { Bell, X } from 'lucide-react';
import { useNotificationStore } from '../store/useNotificationStore';
import { useWindowStore } from '../store/useWindowStore';
import { AppRegistry } from '../applications/registry';
import { cn } from '../utils/cn';
import { formatDistanceToNow } from 'date-fns';
import { AnimatePresence, motion } from 'motion/react';

export function NotificationCenter() {
  const [isOpen, setIsOpen] = useState(false);
  const { notifications, removeNotification, clearAll } = useNotificationStore();
  const { openWindow } = useWindowStore();

  const handleNotificationClick = (appId?: string) => {
    if (appId && AppRegistry[appId]) {
      openWindow(appId);
      setIsOpen(false);
    }
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "h-9 px-3 flex items-center justify-center rounded-lg transition-colors relative",
          isOpen ? "bg-white/10 text-os-text" : "text-os-text-muted hover:text-os-text hover:bg-white/10"
        )}
      >
        <Bell size={16} />
        {notifications.length > 0 && (
          <div className="absolute top-2 right-2 w-2 h-2 bg-os-accent rounded-full animate-pulse" />
        )}
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            <div 
              className="fixed inset-0 z-40"
              onClick={() => setIsOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.95 }}
              className="absolute bottom-12 right-0 w-80 bg-os-window-bg/95 backdrop-blur-xl border border-os-window-border rounded-xl shadow-2xl z-50 overflow-hidden flex flex-col max-h-[400px]"
            >
              <div className="p-4 border-b border-os-window-border flex items-center justify-between">
                <h3 className="font-medium text-os-text">Notifications</h3>
                {notifications.length > 0 && (
                  <button 
                    onClick={clearAll}
                    className="text-xs text-os-text-muted hover:text-os-text transition-colors"
                  >
                    Clear All
                  </button>
                )}
              </div>
              
              <div className="flex-1 overflow-y-auto custom-scrollbar p-2 space-y-2">
                {notifications.length === 0 ? (
                  <div className="p-8 text-center text-os-text-muted text-sm">
                    No new notifications
                  </div>
                ) : (
                  notifications.map(n => (
                    <div 
                      key={n.id}
                      className={cn(
                        "p-3 bg-black/20 rounded-lg border border-white/5 relative group transition-colors",
                        n.onClickApp ? "cursor-pointer hover:bg-white/10" : ""
                      )}
                      onClick={() => handleNotificationClick(n.onClickApp)}
                    >
                      <button
                        onClick={(e) => { e.stopPropagation(); removeNotification(n.id); }}
                        className="absolute top-2 right-2 p-1 text-os-text-muted hover:text-os-text opacity-0 group-hover:opacity-100 transition-opacity rounded-md hover:bg-white/10"
                      >
                        <X size={14} />
                      </button>
                      <h4 className="font-medium text-sm text-os-text pr-6 mb-1">{n.title}</h4>
                      <p className="text-xs text-os-text-muted mb-2">{n.message}</p>
                      <span className="text-[10px] text-os-text-muted/60">
                        {formatDistanceToNow(n.timestamp, { addSuffix: true })}
                      </span>
                    </div>
                  ))
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
