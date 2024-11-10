import { IsString, IsOptional, IsInt, IsUUID } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateTrackDto {
    @ApiPropertyOptional({
        description: 'Track name',
        example: 'Updated Track Name',
    })
    @IsString()
    @IsOptional()
    name?: string;

    @ApiPropertyOptional({
        description: 'Duration of the track in seconds',
        example: 240,
    })
    @IsInt()
    @IsOptional()
    duration?: number;

    @ApiPropertyOptional({
        description: 'UUID of the artist',
        example: '0a35dd62-e09f-444b-a628-f4e7c6954f57',
    })
    @IsUUID()
    @IsOptional()
    artistId?: string | null;

    @ApiPropertyOptional({
        description: 'UUID of the album',
        example: '0a35dd62-e09f-444b-a628-f4e7c6954f57',
    })
    @IsUUID()
    @IsOptional()
    albumId?: string | null;
}
