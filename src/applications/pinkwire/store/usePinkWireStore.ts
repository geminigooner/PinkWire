import { create } from 'zustand';
import { Conversation } from '../types';
import { MOCK_CONVERSATIONS } from '../data/mockData';

interface PinkWireState {
  conversations: Conversation[];
  activeConversationId: string | null;
  searchQuery: string;
  
  setActiveConversation: (id: string | null) => void;
  setSearchQuery: (query: string) => void;
}

export const usePinkWireStore = create<PinkWireState>((set) => ({
  conversations: MOCK_CONVERSATIONS,
  activeConversationId: MOCK_CONVERSATIONS[0]?.id || null,
  searchQuery: '',
  
  setActiveConversation: (id) => set({ activeConversationId: id }),
  setSearchQuery: (query) => set({ searchQuery: query }),
}));
