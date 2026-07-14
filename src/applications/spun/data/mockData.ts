import { Track, Playlist, Album, Artist } from '../../../types/audio';

export const SPUN_TRACKS: Track[] = [
  {
    id: 't1',
    title: 'Rain Dance',
    artist: 'The Echoes',
    album: 'Silence & Sound',
    duration: 215,
    coverArt: 'https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?w=500&q=80',
    audioSource: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
    favorite: true,
    dateAdded: '2026-06-15T10:00:00Z',
    genre: 'Indie',
    year: 2025
  },
  {
    id: 't2',
    title: 'Neon Nights',
    artist: 'Synthwave Society',
    album: 'Future Past',
    duration: 284,
    coverArt: 'https://images.unsplash.com/photo-1557672172-298e090bd0f1?w=500&q=80',
    audioSource: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3',
    favorite: true,
    dateAdded: '2026-06-16T11:00:00Z',
    genre: 'Electronic',
    year: 2024
  },
  {
    id: 't3',
    title: 'Ocean Drive',
    artist: 'Miami Dreams',
    album: 'Summer 98',
    duration: 198,
    coverArt: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=500&q=80',
    audioSource: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3',
    favorite: false,
    dateAdded: '2026-07-01T09:00:00Z',
    genre: 'Pop',
    year: 1998
  },
  {
    id: 't4',
    title: 'Midnight Coding',
    artist: 'Coffee & Code',
    album: 'Focus Sessions',
    duration: 320,
    coverArt: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=500&q=80',
    audioSource: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3',
    favorite: true,
    dateAdded: '2026-07-10T22:00:00Z',
    genre: 'Lo-Fi',
    year: 2026
  }
];

export const SPUN_ALBUMS: Album[] = [
  {
    id: 'a1',
    title: 'Silence & Sound',
    artist: 'The Echoes',
    coverArt: 'https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?w=500&q=80',
    year: 2025,
    trackIds: ['t1']
  },
  {
    id: 'a2',
    title: 'Future Past',
    artist: 'Synthwave Society',
    coverArt: 'https://images.unsplash.com/photo-1557672172-298e090bd0f1?w=500&q=80',
    year: 2024,
    trackIds: ['t2']
  },
  {
    id: 'a3',
    title: 'Summer 98',
    artist: 'Miami Dreams',
    coverArt: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=500&q=80',
    year: 1998,
    trackIds: ['t3']
  },
  {
    id: 'a4',
    title: 'Focus Sessions',
    artist: 'Coffee & Code',
    coverArt: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=500&q=80',
    year: 2026,
    trackIds: ['t4']
  }
];

export const SPUN_ARTISTS: Artist[] = [
  {
    id: 'ar1',
    name: 'The Echoes',
    coverArt: 'https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?w=500&q=80',
    trackIds: ['t1']
  },
  {
    id: 'ar2',
    name: 'Synthwave Society',
    coverArt: 'https://images.unsplash.com/photo-1557672172-298e090bd0f1?w=500&q=80',
    trackIds: ['t2']
  },
  {
    id: 'ar3',
    name: 'Miami Dreams',
    trackIds: ['t3']
  },
  {
    id: 'ar4',
    name: 'Coffee & Code',
    trackIds: ['t4']
  }
];

export const SPUN_PLAYLISTS: Playlist[] = [
  {
    id: 'p1',
    name: 'Late Night Coding',
    description: 'Beeps and boops for focusing.',
    coverArt: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=500&q=80',
    trackIds: ['t2', 't4']
  },
  {
    id: 'p2',
    name: 'Favorites',
    description: 'My most loved tracks.',
    trackIds: ['t1', 't2', 't4']
  }
];
