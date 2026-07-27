import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { Conversation, Message } from '../types';
import { MOCK_CONVERSATIONS } from '../data/mockData';
import { createSyncStorage } from '../../../services/sync/syncStorage';

interface PinkWireState {
  conversations: Conversation[];
  activeConversationId: string | null;
  searchQuery: string;
  isTyping: Record<string, boolean>;
  
  setActiveConversation: (id: string | null) => void;
  setSearchQuery: (query: string) => void;
  addMessage: (conversationId: string, message: Message) => void;
  setTyping: (conversationId: string, typing: boolean) => void;
}

export const usePinkWireStore = create<PinkWireState>()(
  persist(
    (set) => ({
      conversations: MOCK_CONVERSATIONS,
      activeConversationId: MOCK_CONVERSATIONS[0]?.id || null,
      searchQuery: '',
      isTyping: {},
      
      setActiveConversation: (id) => set({ activeConversationId: id }),
      setSearchQuery: (query) => set({ searchQuery: query }),
      
      addMessage: (conversationId, message) => set((state) => ({
        conversations: state.conversations.map(c => 
          c.id === conversationId 
            ? { ...c, messages: [...c.messages, message], lastUpdated: new Date().toISOString() }
            : c
        )
      })),
      
      setTyping: (conversationId, typing) => set((state) => ({
        isTyping: { ...state.isTyping, [conversationId]: typing }
      }))
    }),
    {
      name: 'pinkwire-store',
      storage: createJSONStorage(() => createSyncStorage('pinkwire')),
      partialize: (state) => ({
        conversations: state.conversations
      })
    }
  )
);
