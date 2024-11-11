// src/services/favorites/services/favorites.service.ts

import {
  Injectable,
  NotFoundException,
  BadRequestException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { DatabaseService } from '../../../database/database.service';
import { validate as isUUID } from 'uuid';
import { FavoritesResponseDto } from '../dto/favorites-response.dto';

@Injectable()
export class FavoritesService {
  constructor(private readonly databaseService: DatabaseService) {}

  getAllFavorites(): FavoritesResponseDto {
    const favorites = this.databaseService.getFavorites();

    const artists = favorites.artists
      .map((artistId) => {
        const artist = this.databaseService.getArtistById(artistId);
        if (artist) {
          return artist;
        }
        // Если артист не найден, удаляем его из избранного
        this.databaseService.removeFromFavorites('artists', artistId);
        return null;
      })
      .filter(Boolean);

    const albums = favorites.albums
      .map((albumId) => {
        const album = this.databaseService.getAlbumById(albumId);
        if (album) {
          return album;
        }
        this.databaseService.removeFromFavorites('albums', albumId);
        return null;
      })
      .filter(Boolean);

    const tracks = favorites.tracks
      .map((trackId) => {
        const track = this.databaseService.getTrackById(trackId);
        if (track) {
          return track;
        }
        this.databaseService.removeFromFavorites('tracks', trackId);
        return null;
      })
      .filter(Boolean);

    return { artists, albums, tracks };
  }

  addTrackToFavorites(trackId: string): void {
    if (!isUUID(trackId)) {
      throw new BadRequestException('Invalid track ID');
    }
    const track = this.databaseService.getTrackById(trackId);
    if (!track) {
      throw new UnprocessableEntityException('Track not found');
    }
    this.databaseService.addToFavorites('tracks', trackId);
  }

  removeTrackFromFavorites(trackId: string): void {
    if (!isUUID(trackId)) {
      throw new BadRequestException('Invalid track ID');
    }
    const removed = this.databaseService.removeFromFavorites('tracks', trackId);
    if (!removed) {
      throw new NotFoundException('Track is not in favorites');
    }
  }

  addAlbumToFavorites(albumId: string): void {
    if (!isUUID(albumId)) {
      throw new BadRequestException('Invalid album ID');
    }
    const album = this.databaseService.getAlbumById(albumId);
    if (!album) {
      throw new UnprocessableEntityException('Album not found');
    }
    this.databaseService.addToFavorites('albums', albumId);
  }

  removeAlbumFromFavorites(albumId: string): void {
    if (!isUUID(albumId)) {
      throw new BadRequestException('Invalid album ID');
    }
    const removed = this.databaseService.removeFromFavorites('albums', albumId);
    if (!removed) {
      throw new NotFoundException('Album is not in favorites');
    }
  }

  addArtistToFavorites(artistId: string): void {
    if (!isUUID(artistId)) {
      throw new BadRequestException('Invalid artist ID');
    }
    const artist = this.databaseService.getArtistById(artistId);
    if (!artist) {
      throw new UnprocessableEntityException('Artist not found');
    }
    this.databaseService.addToFavorites('artists', artistId);
  }

  removeArtistFromFavorites(artistId: string): void {
    if (!isUUID(artistId)) {
      throw new BadRequestException('Invalid artist ID');
    }
    const removed = this.databaseService.removeFromFavorites(
      'artists',
      artistId,
    );
    if (!removed) {
      throw new NotFoundException('Artist is not in favorites');
    }
  }
}
