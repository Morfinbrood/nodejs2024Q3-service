import {
  Injectable,
  NotFoundException,
  BadRequestException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';
import { FavoritesResponseDto } from '../dto/favorites-response.dto';
import { validate as isUUID } from 'uuid';

@Injectable()
export class FavoritesService {
  constructor(private readonly prisma: PrismaService) {}

  async getAllFavorites(): Promise<FavoritesResponseDto> {
    const favoriteTracks = await this.prisma.track.findMany({
      where: {
        favoredByUsers: {
          some: {},
        },
      },
    });

    const favoriteAlbums = await this.prisma.album.findMany({
      where: {
        favoredByUsers: {
          some: {},
        },
      },
    });

    const favoriteArtists = await this.prisma.artist.findMany({
      where: {
        favoredByUsers: {
          some: {},
        },
      },
    });

    return {
      tracks: favoriteTracks,
      albums: favoriteAlbums,
      artists: favoriteArtists,
    };
  }

  async addTrackToFavorites(trackId: string): Promise<void> {
    if (!isUUID(trackId)) {
      throw new BadRequestException('Invalid track ID');
    }

    const track = await this.prisma.track.findUnique({
      where: { id: trackId },
    });
    if (!track) {
      throw new UnprocessableEntityException('Track not found');
    }

    // Предполагается, что есть текущий пользователь с id 'currentUserId'
    const currentUserId = 'currentUserId'; // Замените на реальное получение текущего пользователя

    await this.prisma.user.update({
      where: { id: currentUserId },
      data: {
        favoriteTracks: {
          connect: { id: trackId },
        },
      },
    });
  }

  async removeTrackFromFavorites(trackId: string): Promise<void> {
    if (!isUUID(trackId)) {
      throw new BadRequestException('Invalid track ID');
    }

    const currentUserId = 'currentUserId'; // Замените на реальное получение текущего пользователя

    const user = await this.prisma.user.findUnique({
      where: { id: currentUserId },
      include: { favoriteTracks: true },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const isTrackFavorited = user.favoriteTracks.some(
      (track) => track.id === trackId,
    );
    if (!isTrackFavorited) {
      throw new NotFoundException('Track is not in favorites');
    }

    await this.prisma.user.update({
      where: { id: currentUserId },
      data: {
        favoriteTracks: {
          disconnect: { id: trackId },
        },
      },
    });
  }

  // Аналогично реализуйте методы для альбомов и артистов

  async addAlbumToFavorites(albumId: string): Promise<void> {
    if (!isUUID(albumId)) {
      throw new BadRequestException('Invalid album ID');
    }

    const album = await this.prisma.album.findUnique({
      where: { id: albumId },
    });
    if (!album) {
      throw new UnprocessableEntityException('Album not found');
    }

    const currentUserId = 'currentUserId'; // Замените на реальное получение текущего пользователя

    await this.prisma.user.update({
      where: { id: currentUserId },
      data: {
        favoriteAlbums: {
          connect: { id: albumId },
        },
      },
    });
  }

  async removeAlbumFromFavorites(albumId: string): Promise<void> {
    if (!isUUID(albumId)) {
      throw new BadRequestException('Invalid album ID');
    }

    const currentUserId = 'currentUserId'; // Замените на реальное получение текущего пользователя

    const user = await this.prisma.user.findUnique({
      where: { id: currentUserId },
      include: { favoriteAlbums: true },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const isAlbumFavorited = user.favoriteAlbums.some(
      (album) => album.id === albumId,
    );
    if (!isAlbumFavorited) {
      throw new NotFoundException('Album is not in favorites');
    }

    await this.prisma.user.update({
      where: { id: currentUserId },
      data: {
        favoriteAlbums: {
          disconnect: { id: albumId },
        },
      },
    });
  }

  async addArtistToFavorites(artistId: string): Promise<void> {
    if (!isUUID(artistId)) {
      throw new BadRequestException('Invalid artist ID');
    }

    const artist = await this.prisma.artist.findUnique({
      where: { id: artistId },
    });
    if (!artist) {
      throw new UnprocessableEntityException('Artist not found');
    }

    const currentUserId = 'currentUserId'; // Замените на реальное получение текущего пользователя

    await this.prisma.user.update({
      where: { id: currentUserId },
      data: {
        favoriteArtists: {
          connect: { id: artistId },
        },
      },
    });
  }

  async removeArtistFromFavorites(artistId: string): Promise<void> {
    if (!isUUID(artistId)) {
      throw new BadRequestException('Invalid artist ID');
    }

    const currentUserId = 'currentUserId'; // Замените на реальное получение текущего пользователя

    const user = await this.prisma.user.findUnique({
      where: { id: currentUserId },
      include: { favoriteArtists: true },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const isArtistFavorited = user.favoriteArtists.some(
      (artist) => artist.id === artistId,
    );
    if (!isArtistFavorited) {
      throw new NotFoundException('Artist is not in favorites');
    }

    await this.prisma.user.update({
      where: { id: currentUserId },
      data: {
        favoriteArtists: {
          disconnect: { id: artistId },
        },
      },
    });
  }
}
