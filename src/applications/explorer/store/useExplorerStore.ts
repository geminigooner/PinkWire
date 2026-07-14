import { create } from 'zustand';
import { FileItem, ViewMode, SortField, SortDirection } from '../types';
import { MOCK_FILES } from '../data/mockData';

interface ExplorerState {
  files: FileItem[];
  currentPath: string[]; // array of folder IDs
  history: string[][]; // history of paths
  historyIndex: number;
  selectedIds: string[];
  searchQuery: string;
  viewMode: ViewMode;
  sortField: SortField;
  sortDirection: SortDirection;
  isSidebarOpen: boolean;
  showHiddenFiles: boolean;

  setCurrentPath: (path: string[]) => void;
  navigateUp: () => void;
  navigateBack: () => void;
  navigateForward: () => void;
  navigateToFolder: (folderId: string) => void;
  
  setSelectedIds: (ids: string[]) => void;
  toggleSelection: (id: string) => void;
  clearSelection: () => void;
  
  setSearchQuery: (query: string) => void;
  setViewMode: (mode: ViewMode) => void;
  setSort: (field: SortField) => void;
  setSidebarOpen: (isOpen: boolean) => void;
  setShowHiddenFiles: (show: boolean) => void;
}

export const useExplorerStore = create<ExplorerState>((set, get) => ({
  files: MOCK_FILES,
  currentPath: ['desktop'], // Start at desktop
  history: [['desktop']],
  historyIndex: 0,
  selectedIds: [],
  searchQuery: '',
  viewMode: 'large',
  sortField: 'name',
  sortDirection: 'asc',
  isSidebarOpen: false,
  showHiddenFiles: false,

  setCurrentPath: (path) => set((state) => {
    const newHistory = state.history.slice(0, state.historyIndex + 1);
    newHistory.push(path);
    return {
      currentPath: path,
      history: newHistory,
      historyIndex: newHistory.length - 1,
      selectedIds: [],
      searchQuery: '',
      isSidebarOpen: false
    };
  }),

  navigateToFolder: (folderId) => set((state) => {
    const newPath = [...state.currentPath, folderId];
    const newHistory = state.history.slice(0, state.historyIndex + 1);
    newHistory.push(newPath);
    return {
      currentPath: newPath,
      history: newHistory,
      historyIndex: newHistory.length - 1,
      selectedIds: [],
      searchQuery: '',
      isSidebarOpen: false
    };
  }),

  navigateUp: () => set((state) => {
    if (state.currentPath.length <= 1) return state; // Already at root-ish
    const newPath = state.currentPath.slice(0, -1);
    const newHistory = state.history.slice(0, state.historyIndex + 1);
    newHistory.push(newPath);
    return {
      currentPath: newPath,
      history: newHistory,
      historyIndex: newHistory.length - 1,
      selectedIds: [],
    };
  }),

  navigateBack: () => set((state) => {
    if (state.historyIndex > 0) {
      return {
        historyIndex: state.historyIndex - 1,
        currentPath: state.history[state.historyIndex - 1],
        selectedIds: [],
      };
    }
    return state;
  }),

  navigateForward: () => set((state) => {
    if (state.historyIndex < state.history.length - 1) {
      return {
        historyIndex: state.historyIndex + 1,
        currentPath: state.history[state.historyIndex + 1],
        selectedIds: [],
      };
    }
    return state;
  }),

  setSelectedIds: (ids) => set({ selectedIds: ids }),
  toggleSelection: (id) => set((state) => ({
    selectedIds: state.selectedIds.includes(id)
      ? state.selectedIds.filter((i) => i !== id)
      : [...state.selectedIds, id]
  })),
  clearSelection: () => set({ selectedIds: [] }),

  setSearchQuery: (query) => set({ searchQuery: query, selectedIds: [] }),
  setViewMode: (mode) => set({ viewMode: mode }),
  setSort: (field) => set((state) => ({
    sortField: field,
    sortDirection: state.sortField === field && state.sortDirection === 'asc' ? 'desc' : 'asc'
  })),
  setSidebarOpen: (isOpen) => set({ isSidebarOpen: isOpen }),
  setShowHiddenFiles: (show) => set({ showHiddenFiles: show })
}));
