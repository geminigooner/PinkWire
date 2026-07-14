import React, { useEffect } from 'react';
import { osEvents } from './EventBus';
import { useNotificationStore } from '../../store/useNotificationStore';

export function NotificationService() {
  const addNotification = useNotificationStore(state => state.addNotification);

  useEffect(() => {
    const unsubscribe = osEvents.subscribe((event) => {
      switch (event.type) {
        case 'JournalSaved':
          addNotification({
            title: 'Journal saved',
            message: `"${event.payload.entryTitle}" has been saved.`,
            type: 'success',
            icon: 'FileText',
            onClickApp: 'journal'
          });
          break;
        case 'MusicStarted':
          addNotification({
            title: 'Now Playing',
            message: `${event.payload.title} by ${event.payload.artist}`,
            type: 'music',
            icon: 'Music',
            imageUrl: event.payload.coverUrl,
            onClickApp: 'spun'
          });
          break;
        case 'WallpaperChanged':
          addNotification({
            title: 'Wallpaper changed',
            message: `Applied ${event.payload.name} wallpaper.`,
            type: 'system',
            icon: 'Image',
            onClickApp: 'settings'
          });
          break;
        case 'ThemeChanged':
          addNotification({
            title: 'Theme updated',
            message: `${event.payload.mode.charAt(0).toUpperCase() + event.payload.mode.slice(1)} theme enabled.`,
            type: 'system',
            icon: 'Settings',
            onClickApp: 'settings'
          });
          break;
        case 'AtmosphereChanged':
          addNotification({
            title: 'Atmosphere updated',
            message: `${event.payload.mode.charAt(0).toUpperCase() + event.payload.mode.slice(1)} mode enabled.`,
            type: 'system',
            icon: event.payload.mode === 'night' ? 'Moon' : 'Sun',
            onClickApp: 'settings'
          });
          break;
        case 'GuestbookEntry':
          addNotification({
            title: event.payload.returning ? '👋 Returning Visitor' : '💌 New Guestbook Entry',
            message: `${event.payload.visitorName} just signed your guestbook!`,
            type: 'guestbook',
            icon: 'BookHeart',
            onClickApp: 'guestbook'
          });
          break;
        case 'GuestbookFavorited':
          addNotification({
            title: '⭐ Entry Favorited',
            message: `You favorited an entry.`,
            type: 'guestbook',
            icon: 'Star',
            onClickApp: 'guestbook'
          });
          break;
        case 'PhotoDownloaded':
          addNotification({
            title: 'Download complete',
            message: `${event.payload.filename} downloaded successfully.`,
            type: 'success',
            icon: 'Download'
          });
          break;
        case 'BrowserFinishedLoading':
          addNotification({
            title: 'Page loaded',
            message: event.payload.url,
            type: 'info',
            icon: 'Globe',
            onClickApp: 'browser'
          });
          break;
        case 'FileMoved':
          addNotification({
            title: 'File moved',
            message: `${event.payload.filename} was moved.`,
            type: 'info',
            icon: 'Folder'
          });
          break;
      }
    });
    return () => unsubscribe();
  }, [addNotification]);

  return null;
}
