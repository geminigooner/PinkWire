export interface Track {
  id: string;
  title: string;
  artist: string;
  album: string;
  duration: number; // in seconds
  coverArt: string;
  audioSource: string;
  favorite?: boolean;
  dateAdded: string;
  genre?: string;
  year?: number;
  tags?: string[];
  projectAssociation?: string;
}

export interface Playlist {
  id: string;
  name: string;
  description?: string;
  coverArt?: string;
  trackIds: string[];
}

export interface Album {
  id: string;
  title: string;
  artist: string;
  coverArt: string;
  year: number;
  trackIds: string[];
}

export interface Artist {
  id: string;
  name: string;
  coverArt?: string;
  trackIds: string[];
}
