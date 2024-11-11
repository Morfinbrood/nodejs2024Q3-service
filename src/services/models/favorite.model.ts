import { IFavorites } from "src/interfaces/favorite.interface";

export class Favorite implements IFavorites {
    artists: string[]; // favorite artists ids
    albums: string[]; // favorite albums ids
    tracks: string[]; // favorite tracks ids
}