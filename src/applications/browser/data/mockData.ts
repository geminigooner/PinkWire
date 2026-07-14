import { Bookmark } from '../types';

export const INITIAL_BOOKMARKS: Bookmark[] = [
  { id: 'b1', title: 'The Archive', url: 'pinkwire://archive', category: 'internal' },
  { id: 'b2', title: 'The Ledger', url: 'pinkwire://ledger', category: 'internal' },
  { id: 'b3', title: 'Echo Observatory', url: 'pinkwire://echo', category: 'internal' },
  { id: 'b4', title: 'Dark Velvet Topology', url: 'pinkwire://dark-velvet', category: 'internal' },
  { id: 'b5', title: 'K-ONSET', url: 'pinkwire://konset', category: 'internal' },
  { id: 'b6', title: 'Vestige', url: 'pinkwire://vestige', category: 'internal' },
  { id: 'b7', title: 'GitHub', url: 'https://github.com', category: 'external' },
  { id: 'b8', title: 'Blog', url: 'pinkwire://blog', category: 'internal' },
];

export const HOMEPAGE_URL = 'about:home';
