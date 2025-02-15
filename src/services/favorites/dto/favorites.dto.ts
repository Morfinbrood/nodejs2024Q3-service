import { ApiProperty } from '@nestjs/swagger';

export class FavoritesDto {
  @ApiProperty({
    description: 'List of favorite artist IDs',
    type: [String],
  })
  artistIds: string[];

  @ApiProperty({
    description: 'List of favorite album IDs',
    type: [String],
  })
  albumIds: string[];

  @ApiProperty({
    description: 'List of favorite track IDs',
    type: [String],
  })
  trackIds: string[];
}
