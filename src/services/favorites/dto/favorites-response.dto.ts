import { ApiProperty } from '@nestjs/swagger';
import { Artist, Album, Track } from '@prisma/client';

export class FavoritesResponseDto {
  @ApiProperty({
    description: 'List of favorite artists',
    type: [Object], // Или вы можете указать конкретный класс ArtistDto, если он у вас есть
  })
  artists: Artist[];

  @ApiProperty({
    description: 'List of favorite albums',
    type: [Object], // Или AlbumDto
  })
  albums: Album[];

  @ApiProperty({
    description: 'List of favorite tracks',
    type: [Object], // Или TrackDto
  })
  tracks: Track[];
}
