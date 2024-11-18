import { ApiProperty } from '@nestjs/swagger';
import { IFavorites } from 'src/interfaces/favorite.interfaces';

export class FavoritesDto implements IFavorites {
  @ApiProperty({ type: String, isArray: true })
  artists: string[];

  @ApiProperty({ type: String, isArray: true })
  albums: string[];

  @ApiProperty({ type: String, isArray: true })
  tracks: string[];
}
