import { IsString, IsInt, IsUUID, IsOptional } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { ICreateTrackDto } from 'src/interfaces/track.interfaces';

export class CreateTrackDto implements ICreateTrackDto {
  @ApiProperty({
    description: 'Name of the track',
    example: 'Song Title',
  })
  @IsString()
  name: string;

  @ApiPropertyOptional({
    description: 'UUID of the artist',
    format: 'uuid',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @IsUUID()
  @IsOptional()
  artistId: string | null;

  @ApiPropertyOptional({
    description: 'UUID of the album',
    format: 'uuid',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @IsUUID()
  @IsOptional()
  albumId: string | null;

  @ApiProperty({
    description: 'Duration of the track in seconds',
    example: 240,
  })
  @IsInt()
  duration: number;
}
