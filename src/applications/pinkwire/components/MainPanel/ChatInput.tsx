import React, { useState } from 'react';
import { Send, Loader2 } from 'lucide-react';
import { useAuthStore } from '../../../../store/useAuthStore';
import { usePinkWireStore } from '../../store/usePinkWireStore';
import { Conversation, Message } from '../../types';

export function ChatInput({ conversation }: { conversation: Conversation }) {
  const [text, setText] = useState('');
  const [isSending, setIsSending] = useState(false);
  const isAuthenticated = useAuthStore(state => state.isAuthenticated);
  const token = useAuthStore(state => state.token);
  const { addMessage, setTyping } = usePinkWireStore();

  const isGeminiChat = conversation.title === 'Gemini';

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim() || isSending) return;
    
    const content = text;
    setText('');
    
    // Add our message
    const userMessageId = Math.random().toString(36).substring(2, 9);
    addMessage(conversation.id, {
      id: userMessageId,
      senderId: 'me',
      timestamp: new Date().toISOString(),
      type: 'text',
      content
    });

    if (isGeminiChat && isAuthenticated) {
      setIsSending(true);
      setTyping(conversation.id, true);
      
      try {
        // Send history + new message to Gemini
        const currentMessages = usePinkWireStore.getState().conversations.find(c => c.id === conversation.id)?.messages || [];
        
        const res = await fetch('/api/chat', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({ messages: currentMessages })
        });
        
        if (res.ok) {
          const data = await res.json();
          addMessage(conversation.id, {
            id: Math.random().toString(36).substring(2, 9),
            senderId: 'gemini',
            timestamp: new Date().toISOString(),
            type: 'text',
            content: data.message
          });
        }
      } catch (err) {
        console.error("Failed to send message to Gemini:", err);
      } finally {
        setIsSending(false);
        setTyping(conversation.id, false);
      }
    }
  };

  if (!isAuthenticated || !isGeminiChat) {
    return (
      <div className="p-4 border-t border-os-window-border bg-os-titlebar-bg/30">
        <div className="bg-black/40 border border-os-window-border rounded-os p-3 text-sm text-os-text-muted/50 cursor-not-allowed">
          Viewing conversation history...
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 border-t border-os-window-border bg-os-titlebar-bg/30">
      <form onSubmit={handleSend} className="relative flex items-center">
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Send a message..."
          disabled={isSending}
          className="w-full bg-black/40 border border-os-window-border rounded-os py-3 pl-4 pr-12 text-os-text focus:outline-none focus:border-os-accent/50 focus:bg-black/60 transition-all disabled:opacity-50"
        />
        <button
          type="submit"
          disabled={!text.trim() || isSending}
          className="absolute right-2 p-2 text-os-accent hover:bg-os-accent/20 rounded-os transition-colors disabled:opacity-50 disabled:hover:bg-transparent"
        >
          {isSending ? <Loader2 size={18} className="animate-spin" /> : <Send size={18} />}
        </button>
      </form>
    </div>
  );
}
