import React, { useState } from 'react';
import { Bell, BellOff, X, Check, CheckCircle2 } from 'lucide-react';
import { useNotificationStore, NotificationType } from '../store/useNotificationStore';
import { useWindowStore } from '../store/useWindowStore';
import { AppRegistry } from '../applications/registry';
import { cn } from '../utils/cn';
import { formatDistanceToNow } from 'date-fns';
import { AnimatePresence, motion } from 'motion/react';
import { getNotificationIcon } from '../components/notifications/NotificationToasts';

export function NotificationCenter() {
  const [isOpen, setIsOpen] = useState(false);
  const { notifications, removeNotification, clearAll, markAsRead, markAllAsRead, quietMode, toggleQuietMode } = useNotificationStore();
  const { openWindow } = useWindowStore();

  const unreadCount = notifications.filter(n => !n.read).length;

  const handleNotificationClick = (appId?: string, id?: string) => {
    if (id) markAsRead(id);
    if (appId && AppRegistry[appId]) {
      openWindow(appId);
      setIsOpen(false);
    } else if (appId === 'settings') {
      openWindow('settings');
      setIsOpen(false);
    }
  };

  return (
    <div className="relative h-full flex items-center">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "h-9 px-3 flex items-center justify-center rounded-os transition-colors relative",
          isOpen ? "bg-white/10 text-os-text" : "text-os-text-muted hover:text-os-text hover:bg-white/10"
        )}
      >
        {quietMode ? <BellOff size={16} /> : <Bell size={16} />}
        {unreadCount > 0 && !quietMode && (
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
              transition={{ duration: 0.15 }}
              className="fixed sm:absolute bottom-14 sm:bottom-12 left-2 right-2 sm:left-auto sm:right-2 sm:w-96 bg-os-window-bg/95 backdrop-blur-os-os-os border border-os-window-border sm:rounded-os shadow-os z-50 flex flex-col max-h-[80vh] sm:max-h-[32rem] rounded-os overflow-hidden pointer-events-auto"
            >
              <div className="p-4 border-b border-os-window-border flex items-center justify-between bg-black/10">
                <div className="flex items-center gap-2">
                  <h3 className="font-medium text-os-text">Notifications</h3>
                  {unreadCount > 0 && (
                    <span className="bg-os-accent/20 text-os-accent text-[10px] px-2 py-0.5 rounded-full font-semibold">
                      {unreadCount} NEW
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={toggleQuietMode}
                    className={cn(
                      "p-1.5 rounded-os transition-colors",
                      quietMode ? "bg-os-accent/20 text-os-accent" : "text-os-text-muted hover:text-os-text hover:bg-white/10"
                    )}
                    title="Quiet Mode"
                  >
                    {quietMode ? <BellOff size={14} /> : <Bell size={14} />}
                  </button>
                  {notifications.length > 0 && (
                    <>
                      <button 
                        onClick={markAllAsRead}
                        className="p-1.5 text-os-text-muted hover:text-os-text transition-colors rounded-os hover:bg-white/10"
                        title="Mark all as read"
                      >
                        <CheckCircle2 size={14} />
                      </button>
                      <button 
                        onClick={clearAll}
                        className="p-1.5 text-os-text-muted hover:text-os-text transition-colors rounded-os hover:bg-white/10"
                        title="Clear all"
                      >
                        <X size={14} />
                      </button>
                    </>
                  )}
                </div>
              </div>
              
              <div className="flex-1 overflow-y-auto custom-scrollbar p-3 space-y-2">
                {notifications.length === 0 ? (
                  <div className="py-12 flex flex-col items-center justify-center text-os-text-muted">
                    <div className="w-12 h-12 rounded-full bg-black/20 flex items-center justify-center mb-3 border border-white/5">
                      <Bell size={20} className="opacity-50" />
                    </div>
                    <p className="text-sm">You're all caught up!</p>
                  </div>
                ) : (
                  notifications.map(n => {
                    const Icon = getNotificationIcon(n.icon, n.type);
                    return (
                      <div 
                        key={n.id}
                        className={cn(
                          "p-3 rounded-os border relative group transition-colors flex gap-3",
                          !n.read ? "bg-white/5 border-white/10" : "bg-black/20 border-transparent",
                          n.onClickApp ? "cursor-pointer hover:bg-white/10" : ""
                        )}
                        onClick={() => handleNotificationClick(n.onClickApp, n.id)}
                      >
                        {n.imageUrl ? (
                          <img src={n.imageUrl} alt="" className="w-10 h-10 rounded-os object-cover shadow-os bg-black/20 shrink-0" />
                        ) : (
                          <div className={cn(
                            "w-10 h-10 rounded-full flex items-center justify-center shrink-0 border shadow-os",
                            n.type === 'success' ? "bg-emerald-500/10 text-emerald-500 border-emerald-500/20" :
                            n.type === 'error' ? "bg-red-500/10 text-red-500 border-red-500/20" :
                            n.type === 'warning' ? "bg-amber-500/10 text-amber-500 border-amber-500/20" :
                            n.type === 'music' ? "bg-indigo-500/10 text-indigo-500 border-indigo-500/20" :
                            "bg-os-accent/10 text-os-accent border-os-accent/20"
                          )}>
                            <Icon size={18} />
                          </div>
                        )}
                        
                        <div className="flex-1 min-w-0 pt-0.5">
                          <h4 className={cn("text-sm mb-0.5 pr-6 truncate", !n.read ? "font-semibold text-os-text" : "font-medium text-os-text/90")}>
                            {n.title}
                          </h4>
                          <p className="text-xs text-os-text-muted line-clamp-2 leading-relaxed mb-1">{n.message}</p>
                          <span className="text-[10px] text-os-text-muted/60 font-medium">
                            {formatDistanceToNow(n.timestamp, { addSuffix: true })}
                          </span>
                        </div>

                        <button
                          onClick={(e) => { e.stopPropagation(); removeNotification(n.id); }}
                          className="absolute top-3 right-3 p-1.5 text-os-text-muted hover:text-os-text opacity-0 group-hover:opacity-100 transition-opacity rounded-os hover:bg-white/10"
                        >
                          <X size={14} />
                        </button>
                      </div>
                    );
                  })
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
