import { ITrack } from 'src/interfaces/track.interfaces';

export class Track implements ITrack {
  id: string;
  name: string;
  artistId: string | null;
  albumId: string | null;
  duration: number;
}
