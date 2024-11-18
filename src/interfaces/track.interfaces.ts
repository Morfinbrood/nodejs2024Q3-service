export interface ITrack {
  id: string; // uuid v4
  name: string;
  artistId: string | null; // refers to Artist
  albumId: string | null; // refers to Album
  duration: number; // integer number
}

export interface ICreateTrack {
  name: string;
  artistId?: string | null; // refers to Artist
  albumId?: string | null; // refers to Album
  duration: number; // integer number
}

export interface IUpdateTrack {
  name?: string;
  duration?: number;
  artistId?: string | null;
  albumId?: string | null;
}
