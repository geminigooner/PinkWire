const fs = require('fs');
const path = 'src/applications/wallpaper/store/useWallpaperStore.ts';
let content = fs.readFileSync(path, 'utf8');

const regex = /export const INITIAL_WALLPAPERS: Wallpaper\[\] = \[[\s\S]*?\];/;
const replacement = `export const INITIAL_WALLPAPERS: Wallpaper[] = [
  {
    id: 'w-default',
    title: 'PinkWire Gradient',
    description: 'The standard gradient background',
    artist: 'PinkWire Design',
    url: 'bg-gradient-to-br from-indigo-950 via-purple-900 to-pink-900',
    category: 'Minimal',
    tags: ['gradient', 'default', 'pink'],
    favorite: false,
    featured: true,
    uploadedDate: new Date().toISOString()
  },
  {
    id: 'w-sunset',
    title: 'Cyber Sunset',
    description: 'A beautiful retro sunset',
    artist: 'PinkWire Design',
    url: 'https://images.unsplash.com/photo-1614275069929-281b312781cc?q=80&w=2560&auto=format&fit=crop',
    category: 'Y2K',
    tags: ['retro', 'sunset', 'cyber'],
    favorite: false,
    featured: true,
    uploadedDate: new Date().toISOString()
  },
  {
    id: 'w-server',
    title: 'Server Room',
    description: 'Data center lights',
    artist: 'PinkWire Design',
    url: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=2560&auto=format&fit=crop',
    category: 'Servers',
    tags: ['tech', 'lights', 'data'],
    favorite: false,
    featured: false,
    uploadedDate: new Date().toISOString()
  }
];`;

content = content.replace(regex, replacement);
fs.writeFileSync(path, content);
