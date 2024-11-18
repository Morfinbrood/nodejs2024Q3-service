import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsUUID,
  IsString,
  IsInt,
  Min,
  MaxLength,
  MinLength,
  IsOptional,
  Max,
} from 'class-validator';
import { ICreateTrack } from 'src/interfaces/track.interfaces';

export class CreateTrackDto implements ICreateTrack {
  @ApiProperty({
    description: 'Name of the track',
    example: 'Test Track',
    minLength: 1,
    maxLength: 30,
  })
  @IsString()
  @MinLength(1)
  @MaxLength(30)
  name: string;

  @ApiPropertyOptional({
    description: 'UUID of the artist associated with the track',
    example: '1a56dd72-e09f-444b-a628-f4e7c6954d59',
    nullable: true,
  })
  @IsUUID()
  @IsOptional()
  artistId?: string | null;

  @ApiPropertyOptional({
    description: 'UUID of the album associated with the track',
    example: '3b47dd72-e09f-444b-a628-f4e7c6954d99',
    nullable: true,
  })
  @IsUUID()
  @IsOptional()
  albumId?: string | null;

  @ApiProperty({
    description: 'Duration of the track in ms',
    example: 240000,
  })
  @IsInt()
  @Min(1)
  @Max(99999)
  duration: number;
}
