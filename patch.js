const fs = require('fs');

const path1 = 'src/applications/guestbook/store/useGuestbookStore.ts';
let content1 = fs.readFileSync(path1, 'utf8');
content1 = content1.replace(
  `        const mockVisitors: Visitor[] = [
          {
            id: v1Id,
            displayName: 'CyberSurfer99',
            avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=100&h=100&fit=crop',
            location: 'Seattle, WA',
            favoriteColor: '#ec4899',
            joinedDate: new Date(now - 1000 * 60 * 60 * 24 * 2).toISOString(),
            visitCount: 1,
            lastVisit: new Date(now - 1000 * 60 * 60 * 24 * 2).toISOString(),
          }
        ];`,
  `        const mockVisitors: Visitor[] = [
          {
            id: v1Id,
            displayName: 'H100Daddy',
            avatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=100&h=100&fit=crop',
            location: 'San Francisco, CA',
            favoriteColor: '#10b981',
            joinedDate: new Date(now - 1000 * 60 * 60 * 24 * 7).toISOString(),
            visitCount: 42,
            lastVisit: new Date(now - 1000 * 60 * 60 * 2).toISOString(),
            badge: 'GPU Rich'
          },
          {
            id: v2Id,
            displayName: 'ContextMaxxer',
            avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop',
            location: 'Miami, FL',
            favoriteColor: '#8b5cf6',
            joinedDate: new Date(now - 1000 * 60 * 60 * 24 * 3).toISOString(),
            visitCount: 3,
            lastVisit: new Date(now - 1000 * 60 * 60 * 24 * 1).toISOString(),
          },
          {
            id: v3Id,
            displayName: 'PeptidePrince',
            avatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=100&h=100&fit=crop',
            location: 'Austin, TX',
            favoriteColor: '#3b82f6',
            joinedDate: new Date(now - 1000 * 60 * 60 * 24 * 1).toISOString(),
            visitCount: 1,
            lastVisit: new Date(now - 1000 * 60 * 60 * 24 * 1).toISOString(),
          }
        ];`
);
content1 = content1.replace(
  `        const mockEntries: GuestbookEntryData[] = [
          {
            id: uuidv4(),
            visitorId: v1Id,
            timestamp: new Date(now - 1000 * 60 * 60 * 24 * 2).toISOString(),
            message: 'Love the new site layout!',
            favorite: true,
            moderationStatus: 'Publish'
          }
        ];`,
  `        const mockEntries: GuestbookEntryData[] = [
          {
            id: uuidv4(),
            visitorId: v1Id,
            timestamp: new Date(now - 1000 * 60 * 60 * 2).toISOString(),
            message: 'wife left me but i finally got H100 allocation.',
            favorite: true,
            moderationStatus: 'Publish'
          },
          {
            id: uuidv4(),
            visitorId: v2Id,
            timestamp: new Date(now - 1000 * 60 * 60 * 24 * 1).toISOString(),
            message: 'bro if your embeddings aren\\'t hydrated don\\'t even talk to me.',
            favorite: false,
            moderationStatus: 'Publish'
          },
          {
            id: uuidv4(),
            visitorId: v3Id,
            timestamp: new Date(now - 1000 * 60 * 60 * 24 * 1 - 1000 * 60 * 30).toISOString(),
            message: 'cold plunge at 5. inference at 7.',
            favorite: true,
            moderationStatus: 'Publish'
          }
        ];`
);
fs.writeFileSync(path1, content1);

const path2 = 'src/applications/pinkwire/data/mockData.ts';
let content2 = fs.readFileSync(path2, 'utf8');
content2 = content2.replace(
  `    participants: [
      {
        id: 'sarah',
        name: 'Sarah',
        status: 'away',
        avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=150&q=80'
      }
    ],
    messages: [
      {
        id: 'm-8',
        senderId: 'sarah',
        timestamp: subDays(now, 1).toISOString(),
        type: 'text',
        content: 'Take a look at the new glossy UI mockups. I feel like it fits the OS perfectly.'
      },
      {
        id: 'm-9',
        senderId: 'sarah',
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
        content: 'This is gorgeous. The transparency effects are exactly what I was envisioning.'
      }
    ]`,
  `    participants: [
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
        content: 'Take a look at the new glossy UI mockups. I feel like it fits the OS perfectly.'
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
        content: 'This is gorgeous. The transparency effects are exactly what I was envisioning.'
      }
    ]`
);
content2 = content2.replace(
  `    participants: [
      {
        id: 'alex',
        name: 'Alex_99',
        status: 'offline',
      }
    ],
    messages: [
      {
        id: 'm-11',
        senderId: 'alex',
        timestamp: subDays(now, 365).toISOString(),
        type: 'text',
        content: 'brb, mom needs the phone line'
      }
    ]`,
  `    participants: [
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
    ]`
);
fs.writeFileSync(path2, content2);
