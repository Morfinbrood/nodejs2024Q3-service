import { IAlbum } from "./album.interfaces";
import { IArtist } from "./artist.interface";
import { ITrack } from "./track.interface";


export interface IFavoritesResponse {
    artists: IArtist[];
    albums: IAlbum[];
    tracks: ITrack[];
}
