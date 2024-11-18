import { ApiProperty } from '@nestjs/swagger';
import { Album } from '@prisma/client';

export class AlbumDto implements Album {
  @ApiProperty({
    description: 'UUID of the album',
    example: '0a35dd62-e09f-444b-a628-f4e7c6954f57',
  })
  id: string;

  @ApiProperty({
    description: 'Name of the album',
    example: 'Test Album',
  })
  name: string;

  @ApiProperty({
    description: 'Release year of the album',
    example: 2023,
  })
  year: number;

  @ApiProperty({
    description: 'UUID of the artist',
    example: '1a56dd72-e09f-444b-a628-f4e7c6954d59',
    nullable: true,
  })
  artistId: string | null;
}
