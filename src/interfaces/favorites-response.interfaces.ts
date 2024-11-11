import { IAlbum } from "./album.interfaces";
import { IArtist } from "./artist.interfaces";
import { ITrack } from "./track.interfaces";


export interface IFavoritesResponse {
    artists: IArtist[];
    albums: IAlbum[];
    tracks: ITrack[];
}
