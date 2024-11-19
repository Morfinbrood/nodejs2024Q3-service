import { ApiProperty } from '@nestjs/swagger';
import { Artist } from '@prisma/client';

export class ArtistDto implements Artist {
  @ApiProperty({
    description: 'UUID of the artist',
    example: '0a35dd62-e09f-444b-a628-f4e7c6954f57',
  })
  id: string;

  @ApiProperty({
    description: 'Name of the artist',
    example: 'Artist Name',
  })
  name: string;

  @ApiProperty({
    description: 'Indicates if the artist has won a Grammy award',
    example: true,
  })
  grammy: boolean;
}
