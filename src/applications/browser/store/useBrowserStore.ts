import { create } from 'zustand';
import { Tab, Bookmark } from '../types';
import { INITIAL_BOOKMARKS, HOMEPAGE_URL } from '../data/mockData';

interface BrowserStore {
  tabs: Tab[];
  activeTabId: string | null;
  bookmarks: Bookmark[];
  
  createTab: (url?: string, makeActive?: boolean) => void;
  closeTab: (id: string) => void;
  setActiveTab: (id: string) => void;
  
  navigate: (tabId: string, url: string) => void;
  goBack: (tabId: string) => void;
  goForward: (tabId: string) => void;
  reload: (tabId: string) => void;
  
  setLoading: (tabId: string, isLoading: boolean) => void;
  setTitle: (tabId: string, title: string) => void;
}

export const useBrowserStore = create<BrowserStore>((set, get) => ({
  tabs: [],
  activeTabId: null,
  bookmarks: INITIAL_BOOKMARKS,
  
  createTab: (url = HOMEPAGE_URL, makeActive = true) => {
    const newTab: Tab = {
      id: Math.random().toString(36).substring(2, 9),
      title: 'New Tab',
      url,
      history: [url],
      historyIndex: 0,
      isLoading: false
    };
    
    set((state) => {
      const newTabs = [...state.tabs, newTab];
      return {
        tabs: newTabs,
        activeTabId: makeActive ? newTab.id : state.activeTabId
      };
    });
  },
  
  closeTab: (id) => {
    set((state) => {
      const newTabs = state.tabs.filter(t => t.id !== id);
      let newActiveId = state.activeTabId;
      
      if (state.activeTabId === id) {
        const closedIndex = state.tabs.findIndex(t => t.id === id);
        if (newTabs.length > 0) {
          const nextIndex = Math.min(closedIndex, newTabs.length - 1);
          newActiveId = newTabs[nextIndex].id;
        } else {
          newActiveId = null;
        }
      }
      
      return {
        tabs: newTabs,
        activeTabId: newActiveId
      };
    });
  },
  
  setActiveTab: (id) => set({ activeTabId: id }),
  
  navigate: (tabId, url) => {
    // Process search vs URL
    let finalUrl = url;
    if (!url.startsWith('http://') && !url.startsWith('https://') && !url.startsWith('about:') && !url.startsWith('pinkwire://')) {
      if (url.includes('.') && !url.includes(' ')) {
        finalUrl = `https://${url}`;
      } else {
        finalUrl = `https://duckduckgo.com/?q=${encodeURIComponent(url)}`;
      }
    }
    
    set((state) => ({
      tabs: state.tabs.map(tab => {
        if (tab.id === tabId) {
          const newHistory = tab.history.slice(0, tab.historyIndex + 1);
          newHistory.push(finalUrl);
          return {
            ...tab,
            url: finalUrl,
            history: newHistory,
            historyIndex: newHistory.length - 1,
            isLoading: true
          };
        }
        return tab;
      })
    }));
  },
  
  goBack: (tabId) => {
    set((state) => ({
      tabs: state.tabs.map(tab => {
        if (tab.id === tabId && tab.historyIndex > 0) {
          const newIndex = tab.historyIndex - 1;
          return {
            ...tab,
            url: tab.history[newIndex],
            historyIndex: newIndex,
            isLoading: true
          };
        }
        return tab;
      })
    }));
  },
  
  goForward: (tabId) => {
    set((state) => ({
      tabs: state.tabs.map(tab => {
        if (tab.id === tabId && tab.historyIndex < tab.history.length - 1) {
          const newIndex = tab.historyIndex + 1;
          return {
            ...tab,
            url: tab.history[newIndex],
            historyIndex: newIndex,
            isLoading: true
          };
        }
        return tab;
      })
    }));
  },
  
  reload: (tabId) => {
    set((state) => ({
      tabs: state.tabs.map(tab => tab.id === tabId ? { ...tab, isLoading: true } : tab)
    }));
  },
  
  setLoading: (tabId, isLoading) => {
    set((state) => ({
      tabs: state.tabs.map(tab => tab.id === tabId ? { ...tab, isLoading } : tab)
    }));
  },
  
  setTitle: (tabId, title) => {
    set((state) => ({
      tabs: state.tabs.map(tab => tab.id === tabId ? { ...tab, title } : tab)
    }));
  }
}));
