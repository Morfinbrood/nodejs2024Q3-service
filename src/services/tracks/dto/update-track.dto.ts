import { IsString, IsOptional, IsUUID, IsInt, Min } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateTrackDto {
    @ApiPropertyOptional({
        description: 'Name of the track',
        example: 'Updated Track Name'
    })
    @IsOptional()
    @IsString()
    name?: string;

    @ApiPropertyOptional({
        description: 'UUID of the artist',
        example: 'd9b1d7a5-fbd1-4f1d-9a57-f8e2f9f5d36c'
    })
    @IsOptional()
    @IsUUID()
    artistId?: string | null;

    @ApiPropertyOptional({
        description: 'UUID of the album',
        example: 'b3da1d34-8c9a-4b9c-b5f1-2f8e2bdf9a57'
    })
    @IsOptional()
    @IsUUID()
    albumId?: string | null;

    @ApiPropertyOptional({
        description: 'Duration of the track in seconds',
        example: 300
    })
    @IsOptional()
    @IsInt()
    @Min(1)
    duration?: number;
}
