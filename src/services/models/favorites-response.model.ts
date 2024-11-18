import { IFavoritesResponse } from 'src/interfaces/favorite.interfaces';
import { Artist } from './artist.model';
import { Track } from './track.model';
import { Album } from './album.model';

export class FavoritesResponse implements IFavoritesResponse {
  artists: Artist[];
  albums: Album[];
  tracks: Track[];
}
