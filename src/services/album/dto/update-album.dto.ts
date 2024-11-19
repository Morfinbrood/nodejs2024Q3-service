import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsInt, Min, IsUUID, IsOptional } from 'class-validator';

export class UpdateAlbumDto {
  @ApiProperty({
    description: 'Updated name of the album',
    example: 'Updated Album Name',
  })
  @IsString()
  @IsOptional()
  name?: string;

  @ApiProperty({
    description: 'Updated release year of the album',
    example: 2024,
  })
  @IsInt()
  @Min(1900)
  @IsOptional()
  year?: number;

  @ApiProperty({
    description: 'UUID of the artist',
    example: '1a56dd72-e09f-444b-a628-f4e7c6954d59',
    nullable: true,
  })
  @IsUUID()
  @IsOptional()
  artistId?: string | null;
}
