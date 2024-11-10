import { IsString, IsOptional, IsInt, IsUUID, Min } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { IUpdateTrackDto } from '../../../interfaces/track.interfaces';

export class UpdateTrackDto implements IUpdateTrackDto {
    @ApiPropertyOptional({
        description: 'Track name',
        example: 'Updated Track Name',
    })
    @IsString()
    @IsOptional()
    name?: string;

    @ApiPropertyOptional({
        description: 'Updated duration of the track in seconds',
        example: 240,
    })
    @IsInt()
    @Min(1)
    @IsOptional()
    duration?: number;

    @ApiPropertyOptional({
        description: 'Updated UUID of the artist',
        example: '0a35dd62-e09f-444b-a628-f4e7c6954f57',
    })
    @IsUUID()
    @IsOptional()
    artistId?: string | null;

    @ApiPropertyOptional({
        description: 'Updated UUID of the album',
        example: '0a35dd62-e09f-444b-a628-f4e7c6954f57',
    })
    @IsUUID()
    @IsOptional()
    albumId?: string | null;
}
