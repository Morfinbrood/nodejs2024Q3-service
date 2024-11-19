import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsInt, Min, IsUUID, IsOptional } from 'class-validator';

export class CreateAlbumDto {
  @ApiProperty({
    description: 'Name of the album',
    example: 'Test Album',
  })
  @IsString()
  name: string;

  @ApiProperty({
    description: 'Release year of the album',
    example: 2023,
  })
  @IsInt()
  @Min(1900)
  year: number;

  @ApiProperty({
    description: 'UUID of the artist',
    example: '1a56dd72-e09f-444b-a628-f4e7c6954d59',
    nullable: true,
  })
  @IsUUID()
  @IsOptional()
  artistId?: string | null;
}
