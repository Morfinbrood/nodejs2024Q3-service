export interface IAlbum {
  id: string; // uuid v4
  name: string;
  year: number;
  artistId: string | null; // refers to Artist
}

export interface ICreateAlbum {
  name: string;
  year: number;
  artistId?: string | null;
}

export interface IUpdateAlbum {
  name?: string;
  year?: number;
  artistId?: string | null;
}
