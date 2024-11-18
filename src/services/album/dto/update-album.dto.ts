import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsUUID,
  IsString,
  IsInt,
  Min,
  IsOptional,
  MaxLength,
  MinLength,
} from 'class-validator';
import { IUpdateAlbum } from 'src/interfaces/album.interfaces';

export class UpdateAlbumDto implements IUpdateAlbum {
  @ApiProperty({
    description: 'Updated name of the album',
    example: 'Updated Album Name',
  })
  @IsString()
  @MinLength(1)
  @MaxLength(30)
  name: string;

  @ApiProperty({
    description: 'Updated release year of the album',
    example: 2024,
  })
  @IsInt()
  @Min(1900)
  year: number;

  @ApiPropertyOptional({
    description: 'UUID of the artist',
    example: '1a56dd72-e09f-444b-a628-f4e7c6954d59',
    nullable: true,
  })
  @IsOptional()
  @IsUUID()
  @IsString()
  artistId?: string | null;
}
