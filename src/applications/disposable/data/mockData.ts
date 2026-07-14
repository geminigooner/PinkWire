import { Photo, Album } from '../types';
import { subDays, subMonths } from 'date-fns';

const now = new Date();

export const MOCK_ALBUMS: Album[] = [
  { id: 'all', name: 'All Photos', isSmart: true },
  { id: 'favorites', name: 'Favorites', isSmart: true },
  { id: 'recent', name: 'Recently Added', isSmart: true },
  { id: 'screenshots', name: 'Screenshots', isSmart: true },
  { id: 'a1', name: 'Gemini' },
  { id: 'a2', name: 'Memes' },
  { id: 'a3', name: 'DeepMind' },
  { id: 'a4', name: 'Projects' },
  { id: 'a5', name: 'PinkWire' },
  { id: 'a6', name: 'Desktop' }
];

export const MOCK_PHOTOS: Photo[] = [
  {
    id: 'p1',
    url: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80',
    title: 'Glossy UI Mockup',
    caption: 'The original PinkWire prototype design.',
    date: subDays(now, 2).toISOString(),
    albumId: 'a5',
    tags: ['design', 'ui', 'pinkwire'],
    isFavorite: true
  },
  {
    id: 'p2',
    url: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=800&q=80',
    title: 'Server Rack',
    date: subDays(now, 10).toISOString(),
    albumId: 'a4',
    tags: ['infrastructure', 'hardware'],
    isFavorite: false
  },
  {
    id: 'p3',
    url: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=800&q=80',
    title: 'AI Visualization',
    caption: 'Thought vector projection.',
    date: subMonths(now, 1).toISOString(),
    albumId: 'a1',
    tags: ['ai', 'gemini', 'vectors'],
    isFavorite: true
  },
  {
    id: 'p4',
    url: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=800&q=80',
    title: 'Matrix',
    date: subDays(now, 5).toISOString(),
    albumId: 'a3',
    tags: ['code', 'matrix'],
    isFavorite: false
  },
  {
    id: 'p5',
    url: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?auto=format&fit=crop&w=800&q=80',
    title: 'PCB Board',
    caption: 'Hardware debugging late night.',
    date: subMonths(now, 2).toISOString(),
    albumId: 'a4',
    tags: ['hardware', 'late-night'],
    isFavorite: false
  },
  {
    id: 'p6',
    url: 'https://images.unsplash.com/photo-1607743386760-88ac62b89b8a?auto=format&fit=crop&w=800&q=80',
    title: 'Vaporwave Sunset',
    date: subDays(now, 1).toISOString(),
    albumId: 'a6',
    tags: ['wallpaper', 'aesthetic'],
    isFavorite: true
  }
];
