import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsBoolean, IsOptional, MaxLength, MinLength } from 'class-validator';
import { IUpdateArtist } from 'src/interfaces/artist.interfaces';

export class UpdateArtistDto implements IUpdateArtist {
    @ApiPropertyOptional({
        description: 'Updated name of the artist',
        example: 'Updated Artist Name',
    })
    @IsOptional()
    @IsString()
    @MinLength(1)
    @MaxLength(30)
    name?: string;

    @ApiPropertyOptional({
        description: 'Updated Grammy award status',
        example: true,
    })
    @IsOptional()
    @IsBoolean()
    grammy?: boolean;
}
