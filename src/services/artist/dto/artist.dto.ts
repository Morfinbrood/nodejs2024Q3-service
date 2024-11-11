import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsBoolean,
  MaxLength,
  MinLength,
  IsUUID,
} from 'class-validator';
import { IArtist } from '../../../interfaces/artist.interfaces';

export class ArtistDto implements IArtist {
  @ApiProperty({
    description: 'UUID of the artist',
    example: '0a35dd62-e09f-444b-a628-f4e7c6954f57',
  })
  @IsUUID()
  @IsString()
  id: string;

  @ApiProperty({
    description: 'Name of the artist',
    example: 'Artist Name',
  })
  @IsString()
  @MinLength(1)
  @MaxLength(30)
  name: string;

  @ApiProperty({
    description: 'Indicates if the artist has won a Grammy award',
    example: true,
  })
  @IsBoolean()
  grammy: boolean;
}
