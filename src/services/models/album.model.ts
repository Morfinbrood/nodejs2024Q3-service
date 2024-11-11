import { IAlbum } from 'src/interfaces/album.interfaces';

export class Album implements IAlbum {
    id: string; // uuid v4
    name: string;
    year: number;
    artistId: string | null; // refers to Artist
}
