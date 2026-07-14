import { create } from 'zustand';
import { Photo, Album, ViewMode } from '../types';
import { MOCK_ALBUMS, MOCK_PHOTOS } from '../data/mockData';

interface DisposableState {
  albums: Album[];
  photos: Photo[];
  currentAlbumId: string;
  searchQuery: string;
  viewMode: ViewMode;
  selectedPhotoIds: string[];
  isSidebarOpen: boolean;
  
  // Viewer state
  viewerPhotoUrl: string | null;
  isFullscreen: boolean;
  slideshowActive: boolean;

  setCurrentAlbum: (id: string) => void;
  setSearchQuery: (query: string) => void;
  setViewMode: (mode: ViewMode) => void;
  togglePhotoSelection: (id: string) => void;
  clearSelection: () => void;
  setSidebarOpen: (isOpen: boolean) => void;
  
  openViewer: (url: string) => void;
  closeViewer: () => void;
  setFullscreen: (full: boolean) => void;
  toggleSlideshow: () => void;
}

export const useDisposableStore = create<DisposableState>((set) => ({
  albums: MOCK_ALBUMS,
  photos: MOCK_PHOTOS,
  currentAlbumId: 'all',
  searchQuery: '',
  viewMode: 'medium',
  selectedPhotoIds: [],
  isSidebarOpen: false,

  viewerPhotoUrl: null,
  isFullscreen: false,
  slideshowActive: false,

  setCurrentAlbum: (id) => set({ currentAlbumId: id, selectedPhotoIds: [], isSidebarOpen: false }),
  setSearchQuery: (query) => set({ searchQuery: query }),
  setViewMode: (mode) => set({ viewMode: mode }),
  
  togglePhotoSelection: (id) => set((state) => ({
    selectedPhotoIds: state.selectedPhotoIds.includes(id)
      ? state.selectedPhotoIds.filter(pid => pid !== id)
      : [...state.selectedPhotoIds, id]
  })),
  clearSelection: () => set({ selectedPhotoIds: [] }),
  setSidebarOpen: (isOpen) => set({ isSidebarOpen: isOpen }),

  openViewer: (url) => set({ viewerPhotoUrl: url, slideshowActive: false }),
  closeViewer: () => set({ viewerPhotoUrl: null, slideshowActive: false, isFullscreen: false }),
  setFullscreen: (full) => set({ isFullscreen: full }),
  toggleSlideshow: () => set(state => ({ slideshowActive: !state.slideshowActive })),
}));
