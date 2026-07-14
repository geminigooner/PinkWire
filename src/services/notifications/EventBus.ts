export type OSEvent =
  | { type: 'JournalSaved'; payload: { entryTitle: string } }
  | { type: 'PhotoDownloaded'; payload: { filename: string } }
  | { type: 'MusicStarted'; payload: { trackId: string; title: string; artist: string; coverUrl?: string } }
  | { type: 'WallpaperChanged'; payload: { name: string } }
  | { type: 'GuestbookEntry'; payload: { visitorName: string; returning: boolean } }
  | { type: 'GuestbookFavorited'; payload: {} }
  | { type: 'BrowserFinishedLoading'; payload: { url: string } }
  | { type: 'ThemeChanged'; payload: { mode: string } }
  | { type: 'AtmosphereChanged'; payload: { mode: string } }
  | { type: 'FileMoved'; payload: { filename: string } }
  | { type: 'AchievementUnlocked'; payload: { title: string; message: string; icon?: string } }
  | { type: 'Toast'; payload: { message: string } }
  | { type: 'AppError'; payload: { message: string } }
  | { type: 'SystemMessage'; payload: { title: string; message: string; icon?: string } };

type Listener = (event: OSEvent) => void;

class EventBus {
  private listeners: Listener[] = [];

  subscribe(listener: Listener) {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter((l) => l !== listener);
    };
  }

  publish(event: OSEvent) {
    this.listeners.forEach((l) => l(event));
  }
}

export const osEvents = new EventBus();
