import React from 'react';
import { useRecentStore } from '../store/useRecentStore';
import { formatDistanceToNow } from 'date-fns';
import { AppRegistry } from '../applications/registry';
import { useWindowStore } from '../store/useWindowStore';
import { FileText, User, Globe, Image as ImageIcon } from 'lucide-react';
import { useGuestbookStore } from '../applications/guestbook/store/useGuestbookStore';

export function StartMenuRecent({ onClose }: { onClose: () => void }) {
  const recentActivity = useRecentStore(state => state.recentActivity);
  const openWindow = useWindowStore(state => state.openWindow);

  if (recentActivity.length === 0) {
    return (
      <div className="shrink-0 flex-1 flex flex-col">
        <h3 className="text-xs font-semibold text-os-text-muted px-2 mb-3 tracking-wider">RECENT ACTIVITY</h3>
        <div className="flex-1 flex flex-col items-center justify-center p-8 border border-white/5 border-dashed rounded-os bg-black/10">
          <p className="text-sm text-os-text-muted text-center">No recent activity</p>
        </div>
      </div>
    );
  }

  const handleRecentClick = (item: any) => {
    if (item.type === 'app') {
      openWindow(item.id);
    } else if (item.type === 'journal') {
      openWindow('journal');
    } else if (item.type === 'guestbook') {
      openWindow('guestbook');
      if (item.id.startsWith('visitor-')) {
         const vId = item.id.replace('visitor-', '');
         useGuestbookStore.getState().setSelectedVisitorId(vId);
      }
    } else if (item.type === 'media') {
      openWindow('spun');
    }
    onClose();
  };

  const getIcon = (item: any) => {
    if (item.type === 'app') {
      const app = AppRegistry[item.id];
      if (app) return app.icon;
    }
    if (item.type === 'journal') return FileText;
    if (item.type === 'guestbook') return User;
    if (item.type === 'media') return ImageIcon;
    return FileText;
  };

  return (
    <div className="shrink-0 flex-1 flex flex-col min-h-0">
      <h3 className="text-xs font-semibold text-os-text-muted px-2 mb-3 tracking-wider">RECENT ACTIVITY</h3>
      <div className="flex flex-col gap-1 overflow-y-auto custom-scrollbar -mx-2 px-2 pb-4">
        {recentActivity.slice(0, 8).map((item, idx) => {
          const Icon = getIcon(item);
          return (
            <button
              key={`${item.id}-${idx}`}
              onClick={() => handleRecentClick(item)}
              className="flex items-center gap-3 p-2.5 hover:bg-white/10 rounded-os transition-colors text-left group"
            >
              <div className="w-10 h-10 rounded-os bg-black/20 flex items-center justify-center shrink-0 border border-white/5 shadow-os">
                {Icon && <Icon size={18} className="text-os-text-muted group-hover:text-os-text transition-colors" />}
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-medium text-os-text text-sm truncate">{item.title}</div>
                <div className="text-xs text-os-text-muted truncate mt-0.5">
                  {formatDistanceToNow(item.timestamp, { addSuffix: true })}
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
