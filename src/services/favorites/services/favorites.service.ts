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
  private currentUserId = '38c5bc46-a3a9-415e-9568-ac1739438d33'; // mock user for favorites

  async getAllFavorites(): Promise<FavoritesResponseDto> {
    const favoriteTracks = await this.prisma.track.findMany({
      where: {
        favoredByUsers: {
          some: {
            id: this.currentUserId,
          },
        },
      },
    });

    const favoriteAlbums = await this.prisma.album.findMany({
      where: {
        favoredByUsers: {
          some: {
            id: this.currentUserId,
          },
        },
      },
    });

    const favoriteArtists = await this.prisma.artist.findMany({
      where: {
        favoredByUsers: {
          some: {
            id: this.currentUserId,
          },
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

    const user = await this.prisma.user.findUnique({
      where: { id: this.currentUserId },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    await this.prisma.user.update({
      where: { id: this.currentUserId },
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

    const user = await this.prisma.user.findUnique({
      where: { id: this.currentUserId },
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
      where: { id: this.currentUserId },
      data: {
        favoriteTracks: {
          disconnect: { id: trackId },
        },
      },
    });
  }

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

    const user = await this.prisma.user.findUnique({
      where: { id: this.currentUserId },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    await this.prisma.user.update({
      where: { id: this.currentUserId },
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

    const user = await this.prisma.user.findUnique({
      where: { id: this.currentUserId },
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
      where: { id: this.currentUserId },
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

    const user = await this.prisma.user.findUnique({
      where: { id: this.currentUserId },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    await this.prisma.user.update({
      where: { id: this.currentUserId },
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

    const user = await this.prisma.user.findUnique({
      where: { id: this.currentUserId },
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
      where: { id: this.currentUserId },
      data: {
        favoriteArtists: {
          disconnect: { id: artistId },
        },
      },
    });
  }
}
