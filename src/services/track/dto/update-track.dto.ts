import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsInt, Min, IsUUID, IsOptional } from 'class-validator';

export class UpdateTrackDto {
  @ApiPropertyOptional({
    description: 'Updated name of the track',
    example: 'Updated Track Name',
  })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiPropertyOptional({
    description: 'Updated duration of the track in ms',
    example: 300000,
  })
  @IsOptional()
  @IsInt()
  @Min(1)
  duration?: number;

  @ApiPropertyOptional({
    description: 'UUID of the artist',
    example: '1a56dd72-e09f-444b-a628-f4e7c6954d59',
    nullable: true,
  })
  @IsUUID()
  @IsOptional()
  artistId?: string | null;

  @ApiPropertyOptional({
    description: 'UUID of the album',
    example: '3b47dd72-e09f-444b-a628-f4e7c6954d99',
    nullable: true,
  })
  @IsUUID()
  @IsOptional()
  albumId?: string | null;
}
