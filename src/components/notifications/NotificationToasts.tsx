import React, { useEffect } from 'react';
import { useNotificationStore } from '../../store/useNotificationStore';
import { motion, AnimatePresence } from 'motion/react';
import { X, FileText, Music, Image, Moon, Sun, BookHeart, Star, Download, Globe, Folder, Info, CheckCircle, AlertTriangle, XCircle, Settings } from 'lucide-react';
import { useWindowStore } from '../../store/useWindowStore';
import { cn } from '../../utils/cn';

export const getNotificationIcon = (iconName?: string, type?: string) => {
  if (iconName === 'FileText') return FileText;
  if (iconName === 'Music') return Music;
  if (iconName === 'Image') return Image;
  if (iconName === 'Moon') return Moon;
  if (iconName === 'Sun') return Sun;
  if (iconName === 'BookHeart') return BookHeart;
  if (iconName === 'Star') return Star;
  if (iconName === 'Download') return Download;
  if (iconName === 'Globe') return Globe;
  if (iconName === 'Folder') return Folder;
  if (iconName === 'Settings') return Settings;
  
  if (type === 'success') return CheckCircle;
  if (type === 'warning') return AlertTriangle;
  if (type === 'error') return XCircle;
  return Info;
};

export function NotificationToasts() {
  const activeToasts = useNotificationStore(state => state.activeToasts);
  const dismissToast = useNotificationStore(state => state.dismissToast);
  const markAsRead = useNotificationStore(state => state.markAsRead);
  const openWindow = useWindowStore(state => state.openWindow);

  useEffect(() => {
    if (activeToasts.length > 0) {
      const timers = activeToasts.map(toast => {
        return setTimeout(() => {
          dismissToast(toast.id);
        }, 5000);
      });
      return () => timers.forEach(clearTimeout);
    }
  }, [activeToasts, dismissToast]);

  const handleActionClick = (toast: any, actionId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    // In a real app we'd dispatch an action back to the system
    dismissToast(toast.id);
  };

  const handleToastClick = (toast: any) => {
    if (toast.onClickApp) {
      openWindow(toast.onClickApp);
    }
    markAsRead(toast.id);
    dismissToast(toast.id);
  };

  return (
    <div className="fixed top-4 left-4 right-4 sm:top-auto sm:left-auto sm:bottom-16 sm:right-4 z-[100] flex flex-col gap-2 pointer-events-none items-center sm:items-end">
      <AnimatePresence>
        {activeToasts.map(toast => {
          const Icon = getNotificationIcon(toast.icon, toast.type);
          
          return (
            <motion.div
              key={toast.id}
              layout
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              onDragEnd={(e, { offset, velocity }) => {
                if (Math.abs(offset.x) > 100 || Math.abs(velocity.x) > 500) {
                  dismissToast(toast.id);
                }
              }}
              className="pointer-events-auto w-full max-w-sm bg-os-window-bg/90 backdrop-blur-os-os-os border border-os-window-border shadow-os rounded-os overflow-hidden flex flex-col cursor-pointer hover:bg-os-window-bg transition-colors"
              onClick={() => handleToastClick(toast)}
            >
              <div className="flex items-start gap-3 p-4">
                {toast.imageUrl ? (
                  <img src={toast.imageUrl} alt="" className="w-10 h-10 rounded-os object-cover shadow-os bg-black/20" />
                ) : (
                  <div className={cn(
                    "w-10 h-10 rounded-full flex items-center justify-center shrink-0 border shadow-os",
                    toast.type === 'success' ? "bg-emerald-500/20 text-emerald-500 border-emerald-500/30" :
                    toast.type === 'error' ? "bg-red-500/20 text-red-500 border-red-500/30" :
                    toast.type === 'warning' ? "bg-amber-500/20 text-amber-500 border-amber-500/30" :
                    toast.type === 'music' ? "bg-indigo-500/20 text-indigo-500 border-indigo-500/30" :
                    "bg-os-accent/20 text-os-accent border-os-accent/30"
                  )}>
                    <Icon size={20} />
                  </div>
                )}
                
                <div className="flex-1 min-w-0 pt-0.5">
                  <h4 className="font-semibold text-sm text-os-text leading-tight mb-1">{toast.title}</h4>
                  <p className="text-xs text-os-text-muted leading-relaxed line-clamp-2">{toast.message}</p>
                </div>
                
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    dismissToast(toast.id);
                  }}
                  className="p-1.5 text-os-text-muted hover:text-os-text hover:bg-white/10 rounded-os transition-colors shrink-0 -mt-1 -mr-1"
                >
                  <X size={16} />
                </button>
              </div>
              
              {toast.actions && toast.actions.length > 0 && (
                <div className="bg-black/10 border-t border-os-window-border px-4 py-2 flex items-center gap-2 justify-end">
                  {toast.actions.map(action => (
                    <button
                      key={action.actionId}
                      onClick={(e) => handleActionClick(toast, action.actionId, e)}
                      className="px-3 py-1.5 bg-white/10 hover:bg-white/20 text-xs font-medium text-os-text rounded-os transition-colors border border-white/5"
                    >
                      {action.label}
                    </button>
                  ))}
                </div>
              )}
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
}
