import fs from 'fs';

let content = `export interface WallpaperItem {
  id: string;
  name: string;
  url: string;
  creator: string;
  description: string;
  dateAdded: string;
}

export const WALLPAPERS: WallpaperItem[] = [
  { id: 'classic-pink', name: 'Classic Pink', url: 'bg-gradient-to-br from-indigo-950 via-purple-900 to-pink-900', creator: 'Amanda', description: 'The original default theme that started it all.', dateAdded: '2022-04-12' },
  { id: 'bubblegum', name: 'Bubblegum', url: 'bg-gradient-to-br from-pink-400 via-pink-300 to-purple-400', creator: 'Amanda', description: 'Way too bright, but I loved it for a week.', dateAdded: '2023-01-05' },
  { id: 'cherry-blossoms', name: 'Cherry Blossoms', url: 'https://images.unsplash.com/photo-1522383225653-ed111181a951?q=80&w=2000&auto=format&fit=crop', creator: 'Amanda', description: 'Found this online. Reminds me of spring.', dateAdded: '2023-03-21' },
  { id: 'pink-clouds', name: 'Pink Clouds', url: 'https://images.unsplash.com/photo-1505322022379-7c3353ee6291?q=80&w=2000&auto=format&fit=crop', creator: 'Amanda', description: 'Perfect sunset colors.', dateAdded: '2023-06-15' },
  { id: 'frutiger-sky', name: 'Frutiger Sky', url: 'https://images.unsplash.com/photo-1517483000871-1dbf64a6e1c6?q=80&w=2000&auto=format&fit=crop', creator: 'Amanda', description: 'A little slice of y2k nostalgia.', dateAdded: '2024-02-10' },
  { id: 'rainy-bedroom', name: 'Rainy Bedroom', url: 'https://images.unsplash.com/photo-1515894203077-9cd3ad868fb8?q=80&w=2000&auto=format&fit=crop', creator: 'Amanda', description: 'Cozy vibes for late night coding.', dateAdded: '2024-11-02' },
  { id: 'night-lights', name: 'Night Lights', url: 'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=2000&auto=format&fit=crop', creator: 'Amanda', description: 'Just looks cool behind glass.', dateAdded: '2025-01-14' },
  { id: 'cd-wall', name: 'CD Wall', url: 'https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?q=80&w=2000&auto=format&fit=crop', creator: 'Amanda', description: 'Music is everything.', dateAdded: '2025-05-09' },
  { id: 'library', name: 'Library', url: 'https://images.unsplash.com/photo-1507842217343-583bb7270b66?q=80&w=2000&auto=format&fit=crop', creator: 'Amanda', description: 'Trying to read more this year.', dateAdded: '2025-08-30' },
  { id: 'stars', name: 'Stars', url: 'https://images.unsplash.com/photo-1506318137071-a8e063b4bec0?q=80&w=2000&auto=format&fit=crop', creator: 'Amanda', description: 'Always wanted to go to space.', dateAdded: '2026-02-18' },
  { id: 'glitter', name: 'Glitter', url: 'https://images.unsplash.com/photo-1550596334-7bb40a71b6bc?q=80&w=2000&auto=format&fit=crop', creator: 'Amanda', description: 'Never enough sparkles.', dateAdded: '2026-06-01' },
  { id: 'retro-gradient', name: 'Retro Gradient', url: 'bg-gradient-to-tr from-fuchsia-900 via-rose-800 to-orange-600', creator: 'Amanda', description: 'For when I feel edgy.', dateAdded: '2026-07-04' },
];
`;

fs.writeFileSync('src/applications/settings/data/wallpapers.ts', content);
