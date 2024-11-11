import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsUUID, IsString, IsInt, Min, IsOptional, MaxLength, MinLength } from 'class-validator';
import { IUpdateAlbum } from 'src/interfaces/album.interfaces';

export class UpdateAlbumDto implements IUpdateAlbum {
    @ApiPropertyOptional({
        description: 'Updated name of the album',
        example: 'Updated Album Name',
    })
    @IsOptional()
    @IsString()
    @MinLength(1)
    @MaxLength(30)
    name?: string;

    @ApiPropertyOptional({
        description: 'Updated release year of the album',
        example: 2024,
    })
    @IsOptional()
    @IsInt()
    @Min(1900)
    year?: number;

    @ApiPropertyOptional({
        description: 'UUID of the artist',
        example: '1a56dd72-e09f-444b-a628-f4e7c6954d59',
        nullable: true,
    })
    @IsOptional()
    @IsUUID()
    @IsString()
    artistId?: string | null;
}
