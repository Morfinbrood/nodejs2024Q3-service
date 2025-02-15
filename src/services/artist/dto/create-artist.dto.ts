import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsBoolean } from 'class-validator';

export class CreateArtistDto {
  @ApiProperty({
    description: 'Name of the artist',
    example: 'Artist Name',
  })
  @IsString()
  name: string;

  @ApiProperty({
    description: 'Indicates if the artist has won a Grammy award',
    example: true,
  })
  @IsBoolean()
  grammy: boolean;
}
