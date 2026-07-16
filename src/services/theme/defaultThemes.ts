import { Theme } from './ThemeTypes';

export const DEFAULT_THEMES: Theme[] = [
  {
    id: 'theme-pinkwire-classic',
    name: 'PinkWire Classic',
    description: 'The standard PinkWire experience. Glossy, dark, and pink.',
    author: 'PinkWire Design',
    category: 'PinkWire Classic',
    
    primaryColor: '#000000',
    secondaryColor: 'rgba(15, 23, 42, 0.9)',
    accentColor: '#ec4899',
    accentHoverColor: '#db2777',
    titlebarColor: 'rgba(30, 41, 59, 0.8)',
    taskbarColor: 'rgba(15, 23, 42, 0.95)',
    textColor: '#f1f5f9',
    textMutedColor: '#94a3b8',
    borderColor: 'rgba(51, 65, 85, 0.5)',
    
    radius: '0.75rem',
    shadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
    blur: '12px',
    fontFamily: '"Inter", sans-serif',
    
    iconStyle: 'default',
    cursorStyle: 'default',
    
    wallpaper: 'bg-gradient-to-br from-indigo-950 via-purple-900 to-pink-900',
    buttonStyle: 'rounded',
    animationStyle: 'smooth',
    
    createdDate: new Date().toISOString(),
    favorite: false,
    featured: true,
  },
  {
    id: 'theme-y2k-bubblegum',
    name: 'Y2K Bubblegum',
    description: 'A blast from the past. Bright, glossy pinks and soft whites.',
    author: 'PinkWire Design',
    category: 'Y2K',
    
    primaryColor: '#fdf2f8',
    secondaryColor: 'rgba(253, 232, 243, 0.85)',
    accentColor: '#f472b6',
    accentHoverColor: '#ec4899',
    titlebarColor: 'rgba(252, 205, 228, 0.8)',
    taskbarColor: 'rgba(253, 232, 243, 0.95)',
    textColor: '#831843',
    textMutedColor: '#be185d',
    borderColor: 'rgba(244, 114, 182, 0.4)',
    
    radius: '1rem',
    shadow: '0 10px 25px -5px rgba(244, 114, 182, 0.3)',
    blur: '8px',
    fontFamily: '"Comic Sans MS", "Inter", sans-serif',
    
    iconStyle: 'retro',
    cursorStyle: 'hearts',
    
    wallpaper: 'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=2560&auto=format&fit=crop',
    buttonStyle: 'pill',
    animationStyle: 'bouncy',
    
    createdDate: new Date().toISOString(),
    favorite: false,
    featured: true,
  },
  {
    id: 'theme-minimal-pearl',
    name: 'Minimal Pearl',
    description: 'Clean, bright, and focused. Distraction-free environment.',
    author: 'PinkWire Design',
    category: 'Minimal',
    
    primaryColor: '#f8fafc',
    secondaryColor: 'rgba(255, 255, 255, 0.9)',
    accentColor: '#64748b',
    accentHoverColor: '#475569',
    titlebarColor: 'rgba(241, 245, 249, 0.9)',
    taskbarColor: 'rgba(255, 255, 255, 0.95)',
    textColor: '#0f172a',
    textMutedColor: '#64748b',
    borderColor: 'rgba(203, 213, 225, 0.8)',
    
    radius: '0.25rem',
    shadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)',
    blur: '24px',
    fontFamily: '"Inter", sans-serif',
    
    iconStyle: 'minimal',
    cursorStyle: 'default',
    
    wallpaper: 'https://images.unsplash.com/photo-1604147706283-d7119b5b822c?q=80&w=2560&auto=format&fit=crop',
    buttonStyle: 'flat',
    animationStyle: 'fast',
    
    createdDate: new Date().toISOString(),
    favorite: false,
    featured: false,
  },
  {
    id: 'theme-dark-midnight',
    name: 'Midnight',
    description: 'Deep blues and pure black for late-night productivity.',
    author: 'PinkWire Design',
    category: 'Dark',
    
    primaryColor: '#020617',
    secondaryColor: 'rgba(10, 15, 30, 0.95)',
    accentColor: '#3b82f6',
    accentHoverColor: '#2563eb',
    titlebarColor: 'rgba(15, 23, 42, 0.95)',
    taskbarColor: 'rgba(10, 15, 30, 0.98)',
    textColor: '#f8fafc',
    textMutedColor: '#94a3b8',
    borderColor: 'rgba(30, 41, 59, 0.8)',
    
    radius: '0.5rem',
    shadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
    blur: '16px',
    fontFamily: '"JetBrains Mono", "Inter", monospace',
    
    iconStyle: 'default',
    cursorStyle: 'minimal',
    
    wallpaper: 'bg-black',
    buttonStyle: 'rounded',
    animationStyle: 'smooth',
    
    createdDate: new Date().toISOString(),
    favorite: false,
    featured: true,
  }
];
