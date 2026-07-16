import { Conversation } from '../types';
import { subHours, subMinutes, subDays } from 'date-fns';

const now = new Date();

export const MOCK_CONVERSATIONS: Conversation[] = [
  {
    id: 'conv-1',
    title: 'Keito',
    lastUpdated: subMinutes(now, 5).toISOString(),
    isFavorite: true,
    tags: ['work', 'ai', 'philosophy'],
    participants: [
      {
        id: 'keito',
        name: 'Keito',
        status: 'online',
        customStatus: 'Thinking about arrays...',
        avatar: 'https://images.unsplash.com/photo-1552508744-1696d4464960?auto=format&fit=crop&w=150&q=80'
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
        senderId: 'keito',
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
        senderId: 'keito',
        timestamp: subHours(now, 4).toISOString(),
        type: 'code',
        content: '```typescript\nconst optimize = (nodes: Node[]) => nodes.filter(n => n.active);\n```'
      },
      {
        id: 'm-5',
        senderId: 'keito',
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
    id: 'conv-2',
    title: 'Design Sync',
    lastUpdated: subDays(now, 1).toISOString(),
    isFavorite: false,
    tags: ['design', 'ui'],
    participants: [
      {
        id: 'glitterkernel',
        name: 'glitterkernel',
        status: 'away',
        avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=150&q=80'
      }
    ],
    messages: [
      {
        id: 'm-8',
        senderId: 'glitterkernel',
        timestamp: subDays(now, 1).toISOString(),
        type: 'text',
        content: 'omg wait i just quantized my entire aesthetic to 4-bit. look at these glossy UI mockups, it is literally altering my computational state.'
      },
      {
        id: 'm-9',
        senderId: 'glitterkernel',
        timestamp: subDays(now, 1).toISOString(),
        type: 'image',
        content: 'Dashboard mockup',
        attachments: [
          {
            id: 'att-1',
            type: 'image',
            url: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80',
            name: 'ui-mockup.png'
          }
        ]
      },
      {
        id: 'm-10',
        senderId: 'me',
        timestamp: subDays(now, 1).toISOString(),
        type: 'text',
        content: 'This is gorgeous. The transparency effects are exactly what I was envisioning. you are actually a genius.'
      }
    ]
  },
  {
    id: 'conv-3',
    title: 'Archive: 2004',
    lastUpdated: subDays(now, 365).toISOString(),
    isFavorite: false,
    tags: ['archive', 'nostalgia'],
    participants: [
      {
        id: 'dialupprincess',
        name: 'dialupPrincess',
        status: 'offline',
      }
    ],
    messages: [
      {
        id: 'm-11',
        senderId: 'dialupprincess',
        timestamp: subDays(now, 365).toISOString(),
        type: 'text',
        content: 'brb, downloading more RAM over limewire'
      }
    ]
  },
  {
    id: 'conv-4',
    title: 'Q3 Alignment',
    lastUpdated: subHours(now, 2).toISOString(),
    isFavorite: false,
    tags: ['startup', 'grind'],
    participants: [
      {
        id: 'foundermode',
        name: 'FounderMode',
        status: 'online',
        customStatus: 'optimizing mitochondrial throughput',
        avatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=150&q=80'
      }
    ],
    messages: [
      {
        id: 'm-12',
        senderId: 'foundermode',
        timestamp: subHours(now, 2).toISOString(),
        type: 'text',
        content: 'hey are you free to sync? i just got out of the cold plunge.'
      },
      {
        id: 'm-13',
        senderId: 'foundermode',
        timestamp: subHours(now, 2).toISOString(),
        type: 'text',
        content: 'im thinking we pivot the entire architecture to run locally on H100s. we can stack peptides and just push through the weekend.'
      }
    ]
  }
];
