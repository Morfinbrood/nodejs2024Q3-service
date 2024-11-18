import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsUUID,
  IsString,
  IsInt,
  Min,
  MaxLength,
  MinLength,
  IsOptional,
} from 'class-validator';
import { ICreateAlbum } from '../../../interfaces/album.interfaces';

export class CreateAlbumDto implements ICreateAlbum {
  @ApiProperty({
    description: 'Name of the album',
    example: 'Test Album',
  })
  @IsString()
  @MinLength(1)
  @MaxLength(30)
  name: string;

  @ApiProperty({
    description: 'Release year of the album',
    example: 2023,
  })
  @IsInt()
  @Min(1900)
  year: number;

  @ApiPropertyOptional({
    description: 'UUID of the artist',
    example: '1a56dd72-e09f-444b-a628-f4e7c6954d59',
    nullable: true,
  })
  @IsUUID()
  @IsString()
  @IsOptional()
  artistId: string | null;
}
