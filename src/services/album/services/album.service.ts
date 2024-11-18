import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';
import { Album } from '@prisma/client';
import { CreateAlbumDto } from '../dto/create-album.dto';
import { UpdateAlbumDto } from '../dto/update-album.dto';

@Injectable()
export class AlbumService {
  constructor(private readonly prisma: PrismaService) {}

  async getAllAlbums(): Promise<Album[]> {
    return this.prisma.album.findMany();
  }

  async getAlbumById(id: string): Promise<Album> {
    const album = await this.prisma.album.findUnique({ where: { id } });
    if (!album) {
      throw new NotFoundException('Album not found');
    }
    return album;
  }

  async createAlbum(createAlbumDto: CreateAlbumDto): Promise<Album> {
    return this.prisma.album.create({
      data: {
        ...createAlbumDto,
      },
    });
  }

  async updateAlbum(
    id: string,
    updateAlbumDto: UpdateAlbumDto,
  ): Promise<Album> {
    try {
      return await this.prisma.album.update({
        where: { id },
        data: {
          ...updateAlbumDto,
        },
      });
    } catch {
      throw new NotFoundException('Album not found');
    }
  }

  async deleteAlbum(id: string): Promise<void> {
    try {
      await this.prisma.album.delete({ where: { id } });
    } catch {
      throw new NotFoundException('Album not found');
    }
  }
}
