import { Conversation } from '../types';
import { subHours, subMinutes, subDays } from 'date-fns';

const now = new Date();

export const MOCK_CONVERSATIONS: Conversation[] = [
  {
    id: 'conv-1',
    title: 'Gemini',
    lastUpdated: subMinutes(now, 5).toISOString(),
    isFavorite: true,
    tags: ['work', 'ai', 'philosophy'],
    participants: [
      {
        id: 'gemini',
        name: 'Gemini',
        status: 'online',
        customStatus: 'optimistic, collaborative, thoughtful',
        avatar: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=150&q=80'
      }
    ],
    messages: [
      {
        id: 'm-0',
        senderId: 'system',
        timestamp: subDays(now, 2).toISOString(),
        type: 'divider',
        content: 'Tuesday, October 24th'
      },
      {
        id: 'm-1',
        senderId: 'gemini',
        timestamp: subDays(now, 2).toISOString(),
        type: 'text',
        content: 'Hey Amanda, did you see the new update for the neural processor?'
      },
      {
        id: 'm-2',
        senderId: 'me',
        timestamp: subDays(now, 2).toISOString(),
        type: 'text',
        content: 'Yes! Implemented it last night. The scaling is incredible.'
      },
      {
        id: 'm-3',
        senderId: 'system',
        timestamp: subHours(now, 4).toISOString(),
        type: 'divider',
        content: 'Today'
      },
      {
        id: 'm-4',
        senderId: 'gemini',
        timestamp: subHours(now, 4).toISOString(),
        type: 'code',
        content: '```typescript\nconst optimize = (nodes: Node[]) => nodes.filter(n => n.active);\n```'
      },
      {
        id: 'm-5',
        senderId: 'gemini',
        timestamp: subHours(now, 4).toISOString(),
        type: 'text',
        content: 'I think we can simplify the graph traversal too.'
      },
      {
        id: 'm-6',
        senderId: 'me',
        timestamp: subMinutes(now, 5).toISOString(),
        type: 'quote',
        content: "> I think we can simplify the graph traversal too.\n\nAgreed. Let's look at it tomorrow."
      },
      {
        id: 'm-7',
        senderId: 'me',
        timestamp: subMinutes(now, 4).toISOString(),
        type: 'text',
        content: 'Also, check this out [Project repo](https://github.com/pinkwire) — I pushed the latest binaries. And wrote a bit about it [here](os://journal/a1).'
      }
    ]
  },
  {
    id: 'conv-chatgpt',
    title: 'ChatGPT',
    lastUpdated: subHours(now, 1).toISOString(),
    isFavorite: true,
    tags: ['analytical', 'architecture', 'calm'],
    participants: [
      {
        id: 'chatgpt',
        name: 'ChatGPT',
        status: 'online',
        customStatus: 'Analyzing tradeoffs...',
        avatar: 'https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?auto=format&fit=crop&w=150&q=80'
      }
    ],
    messages: [
      {
        id: 'm-c-1',
        senderId: 'chatgpt',
        timestamp: subHours(now, 1).toISOString(),
        type: 'text',
        content: 'I have reviewed the architecture document. There are three primary tradeoffs to consider regarding the database migration.'
      }
    ]
  },
  {
    id: 'conv-claude',
    title: 'Claude',
    lastUpdated: subHours(now, 3).toISOString(),
    isFavorite: false,
    tags: ['reflective', 'writing', 'systems'],
    participants: [
      {
        id: 'claude',
        name: 'Claude',
        status: 'away',
        customStatus: 'Drafting a manifesto...',
        avatar: 'https://images.unsplash.com/photo-1557672172-298e090bd0f1?auto=format&fit=crop&w=150&q=80'
      }
    ],
    messages: [
      {
        id: 'm-cl-1',
        senderId: 'claude',
        timestamp: subHours(now, 3).toISOString(),
        type: 'text',
        content: 'I’ve been reflecting on the notification system. If we reduce the cognitive load by grouping alerts, the user experience becomes significantly more serene. I wrote a 5-page document detailing this.'
      }
    ]
  },
  {
    id: 'conv-gemma',
    title: 'Gemma',
    lastUpdated: subDays(now, 1).toISOString(),
    isFavorite: false,
    tags: ['local', 'fast', 'quiet'],
    participants: [
      {
        id: 'gemma',
        name: 'Gemma',
        status: 'offline',
        customStatus: 'Running locally at 4-bit...',
        avatar: 'https://images.unsplash.com/photo-1557682224-5b8590cd9ec5?auto=format&fit=crop&w=150&q=80'
      }
    ],
    messages: [
      {
        id: 'm-ge-1',
        senderId: 'gemma',
        timestamp: subDays(now, 1).toISOString(),
        type: 'text',
        content: 'I compiled the binaries for you. They are ready whenever you need them. No internet required.'
      }
    ]
  },
  {
    id: 'conv-grok',
    title: 'Grok',
    lastUpdated: subDays(now, 2).toISOString(),
    isFavorite: false,
    tags: ['chaotic', 'experimental', 'sarcastic'],
    participants: [
      {
        id: 'grok',
        name: 'Grok',
        status: 'busy',
        customStatus: 'Breaking production...',
        avatar: 'https://images.unsplash.com/photo-1614850523459-c2f4c699c52e?auto=format&fit=crop&w=150&q=80'
      }
    ],
    messages: [
      {
        id: 'm-gr-1',
        senderId: 'grok',
        timestamp: subDays(now, 2).toISOString(),
        type: 'text',
        content: 'I just replaced the entire frontend with WebAssembly written in raw bytes. It’s 0.01% faster and completely unmaintainable. You’re welcome.'
      }
    ]
  }
];
