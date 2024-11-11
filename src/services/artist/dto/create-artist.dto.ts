import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsBoolean, MaxLength, MinLength } from 'class-validator';
import {  ICreateArtist } from '../../../interfaces/artist.interfaces';

export class CreateArtistDto implements ICreateArtist {
    @ApiProperty({
        description: 'Name of the artist',
        example: 'Artist Name',
    })
    @IsString()
    @MinLength(1)
    @MaxLength(30)
    name: string;

    @ApiProperty({
        description: 'Indicates if the artist has won a Grammy award',
        example: true,
    })
    @IsBoolean()
    grammy: boolean;
}
