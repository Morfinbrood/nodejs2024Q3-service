import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsBoolean, IsOptional } from 'class-validator';

export class UpdateArtistDto {
  @ApiPropertyOptional({
    description: 'Updated name of the artist',
    example: 'Updated Artist Name',
  })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiPropertyOptional({
    description: 'Updated Grammy award status',
    example: true,
  })
  @IsOptional()
  @IsBoolean()
  grammy?: boolean;
}
