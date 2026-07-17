import { create } from 'zustand';
import { persist, createJSONStorage }  from 'zustand/middleware';
import { createSyncStorage } from '../../../services/sync/syncStorage';
import { Article, Category } from '../types';
import { MOCK_ARTICLES, MOCK_CATEGORIES } from '../data/mockData';

interface JournalState {
  articles: Article[];
  categories: Category[];
  activeCategoryId: string;
  activeArticleId: string | null;
  searchQuery: string;
  readingMode: boolean;
  textSize: 'small' | 'medium' | 'large';
  isSidebarOpen: boolean;
  
  // CMS Mode States
  isEditing: boolean;
  draftArticle: Partial<Article> | null;
  saveStatus: 'idle' | 'saving' | 'saved' | 'error';
  
  // Actions
  setActiveCategory: (id: string) => void;
  setActiveArticle: (id: string | null) => void;
  setSearchQuery: (query: string) => void;
  toggleReadingMode: () => void;
  setTextSize: (size: 'small' | 'medium' | 'large') => void;
  setSidebarOpen: (isOpen: boolean) => void;
  
  // CMS Actions
  startEditing: (articleId?: string) => void;
  stopEditing: () => void;
  updateDraft: (updates: Partial<Article>) => void;
  saveDraft: () => void;
  publishArticle: () => void;
  unpublishArticle: (id: string) => void;
  deleteArticle: (id: string) => void;
  duplicateArticle: (id: string) => void;
  archiveArticle: (id: string) => void;
  restoreArticle: (id: string) => void;
  seedMockData: () => void;
}

export const useJournalStore = create<JournalState>()(
  persist(
    (set, get) => ({
      articles: [],
      categories: MOCK_CATEGORIES,
      activeCategoryId: 'all',
      activeArticleId: null,
      searchQuery: '',
      readingMode: false,
      textSize: 'medium',
      isSidebarOpen: false,
      isEditing: false,
      draftArticle: null,
      saveStatus: 'idle',

      setActiveCategory: (id) => set({ activeCategoryId: id, activeArticleId: null, readingMode: false, isSidebarOpen: false, isEditing: false }),
      setActiveArticle: (id) => set({ activeArticleId: id, isSidebarOpen: false, isEditing: false }),
      setSearchQuery: (query) => set({ searchQuery: query }),
      toggleReadingMode: () => set((state) => ({ readingMode: !state.readingMode })),
      setTextSize: (size) => set({ textSize: size }),
      setSidebarOpen: (isOpen) => set({ isSidebarOpen: isOpen }),
      
      startEditing: (articleId) => {
        if (articleId) {
          const article = get().articles.find(a => a.id === articleId);
          if (article) {
            set({ isEditing: true, draftArticle: { ...article }, saveStatus: 'idle' });
          }
        } else {
          // New draft
          set({ 
            isEditing: true, 
            draftArticle: {
              id: crypto.randomUUID ? crypto.randomUUID() : Math.random().toString(36).substring(2, 9),
              title: '',
              slug: '',
              content: '',
              summary: '',
              tags: [],
              category: 'research',
              status: 'draft',
              date: new Date().toISOString(),
              readingTime: 0,
              favorite: false
            }, 
            saveStatus: 'idle' 
          });
        }
      },
      
      stopEditing: () => {
        set({ isEditing: false, draftArticle: null, saveStatus: 'idle' });
      },
      
      updateDraft: (updates) => {
        const draft = get().draftArticle;
        if (draft) {
          set({ draftArticle: { ...draft, ...updates }, saveStatus: 'saving' });
          // Auto-save logic could go here or be managed by a debounced effect in the component
        }
      },
      
      saveDraft: () => {
        const draft = get().draftArticle;
        if (!draft) return;
        
        set((state) => {
          const existingIndex = state.articles.findIndex(a => a.id === draft.id);
          let newArticles = [...state.articles];
          const updatedArticle = { ...draft, updatedDate: new Date().toISOString() } as Article;
          
          if (existingIndex >= 0) {
            newArticles[existingIndex] = updatedArticle;
          } else {
            newArticles.unshift(updatedArticle);
          }
          
          return { articles: newArticles, saveStatus: 'saved' };
        });
        
        // Reset save status after a delay
        setTimeout(() => {
          set((state) => (state.saveStatus === 'saved' ? { saveStatus: 'idle' } : state));
        }, 2000);
      },
      
      publishArticle: () => {
        const draft = get().draftArticle;
        if (!draft) return;
        
        const now = new Date().toISOString();
        const words = draft.content?.trim().split(/\s+/).length || 0;
        const readingTime = Math.max(1, Math.ceil(words / 200));
        
        const slug = draft.slug || draft.title?.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '') || 'untitled';
        
        set((state) => {
          const existingIndex = state.articles.findIndex(a => a.id === draft.id);
          let newArticles = [...state.articles];
          
          const updatedArticle = { 
            ...draft, 
            status: 'published',
            slug,
            publishedDate: draft.publishedDate || now,
            updatedDate: now,
            readingTime
          } as Article;
          
          if (existingIndex >= 0) {
            newArticles[existingIndex] = updatedArticle;
          } else {
            newArticles.unshift(updatedArticle);
          }
          
          return { 
            articles: newArticles, 
            activeArticleId: updatedArticle.id,
            isEditing: false,
            draftArticle: null,
            saveStatus: 'idle'
          };
        });
      },
      
      unpublishArticle: (id) => {
        set((state) => ({
          articles: state.articles.map(a => a.id === id ? { ...a, status: 'draft' } : a)
        }));
      },
      
      deleteArticle: (id) => {
        set((state) => {
          const newArticles = state.articles.filter(a => a.id !== id);
          return {
            articles: newArticles,
            activeArticleId: state.activeArticleId === id ? null : state.activeArticleId,
            isEditing: state.draftArticle?.id === id ? false : state.isEditing
          };
        });
      },
      
      duplicateArticle: (id) => {
        const article = get().articles.find(a => a.id === id);
        if (!article) return;
        
        const newId = crypto.randomUUID ? crypto.randomUUID() : Math.random().toString(36).substring(2, 9);
        const newArticle: Article = {
          ...article,
          id: newId,
          title: `${article.title} (Copy)`,
          slug: `${article.slug}-copy`,
          status: 'draft',
          date: new Date().toISOString(),
          publishedDate: undefined,
          updatedDate: undefined
        };
        
        set((state) => ({
          articles: [newArticle, ...state.articles]
        }));
      },
      
      archiveArticle: (id) => {
        set((state) => ({
          articles: state.articles.map(a => a.id === id ? { ...a, status: 'archived' } : a)
        }));
      },
      
      restoreArticle: (id) => {
        set((state) => ({
          articles: state.articles.map(a => a.id === id ? { ...a, status: 'draft' } : a)
        }));
      },
      
      seedMockData: () => set((state) => {
        if (state.articles.length > 0) return state;
        return { articles: MOCK_ARTICLES };
      })
    }),
    {
      name: 'pinkwire-journal',
      storage: createJSONStorage(() => createSyncStorage('journal')),
      partialize: (state) => ({
        articles: state.articles,
        categories: state.categories
      })
    }
  )
);
