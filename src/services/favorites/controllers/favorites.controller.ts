import {
    Controller,
    Get,
    Post,
    Delete,
    Param,
    HttpCode,
    HttpStatus,
} from '@nestjs/common';
import { FavoritesService } from '../services/favorites.service';
import { FavoritesResponseDto } from '../dto/favorites-response.dto';
import {
    ApiTags,
    ApiOperation,
    ApiResponse,
    ApiParam,
} from '@nestjs/swagger';

@ApiTags('Favorites')
@Controller('favs')
export class FavoritesController {
    constructor(private readonly favoritesService: FavoritesService) { }

    @Get()
    @ApiOperation({ summary: 'Get all favorites' })
    @ApiResponse({
        status: 200,
        description: 'List of all favorites',
        type: FavoritesResponseDto,
    })
    getAllFavorites(): FavoritesResponseDto {
        return this.favoritesService.getAllFavorites();
    }

    @Post('track/:id')
    @ApiOperation({ summary: 'Add track to favorites' })
    @ApiParam({ name: 'id', description: 'Track UUID', format: 'uuid' })
    @ApiResponse({ status: 201, description: 'Track added to favorites' })
    @ApiResponse({ status: 400, description: 'Invalid track ID' })
    @ApiResponse({ status: 422, description: 'Track not found' })
    @HttpCode(HttpStatus.CREATED)
    addTrackToFavorites(@Param('id') trackId: string): void {
        this.favoritesService.addTrackToFavorites(trackId);
    }

    @Delete('track/:id')
    @ApiOperation({ summary: 'Remove track from favorites' })
    @ApiParam({ name: 'id', description: 'Track UUID', format: 'uuid' })
    @ApiResponse({ status: 204, description: 'Track removed from favorites' })
    @ApiResponse({ status: 400, description: 'Invalid track ID' })
    @ApiResponse({ status: 404, description: 'Track is not in favorites' })
    @HttpCode(HttpStatus.NO_CONTENT)
    removeTrackFromFavorites(@Param('id') trackId: string): void {
        this.favoritesService.removeTrackFromFavorites(trackId);
    }

    @Post('album/:id')
    @ApiOperation({ summary: 'Add album to favorites' })
    @ApiParam({ name: 'id', description: 'Album UUID', format: 'uuid' })
    @ApiResponse({ status: 201, description: 'Album added to favorites' })
    @ApiResponse({ status: 400, description: 'Invalid album ID' })
    @ApiResponse({ status: 422, description: 'Album not found' })
    @HttpCode(HttpStatus.CREATED)
    addAlbumToFavorites(@Param('id') albumId: string): void {
        this.favoritesService.addAlbumToFavorites(albumId);
    }

    @Delete('album/:id')
    @ApiOperation({ summary: 'Remove album from favorites' })
    @ApiParam({ name: 'id', description: 'Album UUID', format: 'uuid' })
    @ApiResponse({ status: 204, description: 'Album removed from favorites' })
    @ApiResponse({ status: 400, description: 'Invalid album ID' })
    @ApiResponse({ status: 404, description: 'Album is not in favorites' })
    @HttpCode(HttpStatus.NO_CONTENT)
    removeAlbumFromFavorites(@Param('id') albumId: string): void {
        this.favoritesService.removeAlbumFromFavorites(albumId);
    }

    @Post('artist/:id')
    @ApiOperation({ summary: 'Add artist to favorites' })
    @ApiParam({ name: 'id', description: 'Artist UUID', format: 'uuid' })
    @ApiResponse({ status: 201, description: 'Artist added to favorites' })
    @ApiResponse({ status: 400, description: 'Invalid artist ID' })
    @ApiResponse({ status: 422, description: 'Artist not found' })
    @HttpCode(HttpStatus.CREATED)
    addArtistToFavorites(@Param('id') artistId: string): void {
        this.favoritesService.addArtistToFavorites(artistId);
    }

    @Delete('artist/:id')
    @ApiOperation({ summary: 'Remove artist from favorites' })
    @ApiParam({ name: 'id', description: 'Artist UUID', format: 'uuid' })
    @ApiResponse({ status: 204, description: 'Artist removed from favorites' })
    @ApiResponse({ status: 400, description: 'Invalid artist ID' })
    @ApiResponse({ status: 404, description: 'Artist is not in favorites' })
    @HttpCode(HttpStatus.NO_CONTENT)
    removeArtistFromFavorites(@Param('id') artistId: string): void {
        this.favoritesService.removeArtistFromFavorites(artistId);
    }
}
