import { IAlbum } from "./album.interfaces";
import { IArtist } from "./artist.interfaces";
import { ITrack } from "./track.interfaces";

export interface IFavorites {
    artists: string[]; // favorite artists ids
    albums: string[]; // favorite albums ids
    tracks: string[]; // favorite tracks ids
}

export interface IFavoritesResponse {
    artists: IArtist[];
    albums: IAlbum[];
    tracks: ITrack[];
}