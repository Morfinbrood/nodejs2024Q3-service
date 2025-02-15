import { ApiProperty } from '@nestjs/swagger';
import { Track } from '@prisma/client';

export class TrackDto implements Track {
  @ApiProperty({
    description: 'UUID of the track',
    example: '0a35dd62-e09f-444b-a628-f4e7c6954f57',
  })
  id: string;

  @ApiProperty({
    description: 'Name of the track',
    example: 'Test Track',
  })
  name: string;

  @ApiProperty({
    description: 'Duration of the track in ms',
    example: 240000,
  })
  duration: number;

  @ApiProperty({
    description: 'UUID of the artist',
    example: '1a56dd72-e09f-444b-a628-f4e7c6954d59',
    nullable: true,
  })
  artistId: string | null;

  @ApiProperty({
    description: 'UUID of the album',
    example: '3b47dd72-e09f-444b-a628-f4e7c6954d99',
    nullable: true,
  })
  albumId: string | null;
}
