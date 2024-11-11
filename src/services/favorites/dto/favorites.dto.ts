import { ApiProperty } from '@nestjs/swagger';
import { ArtistDto } from '../../artist/dto/artist.dto';
import { AlbumDto } from '../../album/dto/album.dto';
import { TrackDto } from '../../track/dto/track.dto';

export class FavoritesDto {
    @ApiProperty({ type: [ArtistDto] })
    artists: ArtistDto[];

    @ApiProperty({ type: [AlbumDto] })
    albums: AlbumDto[];

    @ApiProperty({ type: [TrackDto] })
    tracks: TrackDto[];
}
