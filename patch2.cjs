const fs = require('fs');
const path = 'src/applications/pinkwire/data/mockData.ts';
let content = fs.readFileSync(path, 'utf8');

content = content.replace(
  `      {
        id: 'm-8',
        senderId: 'glitterkernel',
        timestamp: subDays(now, 1).toISOString(),
        type: 'text',
        content: 'Take a look at the new glossy UI mockups. I feel like it fits the OS perfectly.'
      },`,
  `      {
        id: 'm-8',
        senderId: 'glitterkernel',
        timestamp: subDays(now, 1).toISOString(),
        type: 'text',
        content: 'omg wait i just quantized my entire aesthetic to 4-bit. look at these glossy UI mockups, it is literally altering my computational state.'
      },`
);

content = content.replace(
  `      {
        id: 'm-10',
        senderId: 'me',
        timestamp: subDays(now, 1).toISOString(),
        type: 'text',
        content: 'This is gorgeous. The transparency effects are exactly what I was envisioning.'
      }`,
  `      {
        id: 'm-10',
        senderId: 'me',
        timestamp: subDays(now, 1).toISOString(),
        type: 'text',
        content: 'This is gorgeous. The transparency effects are exactly what I was envisioning. you are actually a genius.'
      }`
);

// Add a new conversation for FounderMode
content = content.replace(
  `]
  }
];`,
  `]
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
];`
);

fs.writeFileSync(path, content);
