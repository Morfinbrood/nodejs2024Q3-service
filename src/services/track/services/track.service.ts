import { Injectable, NotFoundException } from '@nestjs/common';
import { Track } from '@prisma/client';
import { PrismaService } from '../../../prisma/prisma.service';
import { CreateTrackDto } from '../dto/create-track.dto';
import { UpdateTrackDto } from '../dto/update-track.dto';

@Injectable()
export class TrackService {
  constructor(private readonly prisma: PrismaService) {}

  async getAllTracks(): Promise<Track[]> {
    return this.prisma.track.findMany();
  }

  async getTrackById(id: string): Promise<Track> {
    const track = await this.prisma.track.findUnique({ where: { id } });
    if (!track) {
      throw new NotFoundException('Track not found');
    }
    return track;
  }

  async createTrack(createTrackDto: CreateTrackDto): Promise<Track> {
    const { artistId, albumId } = createTrackDto;
    if (artistId) {
      const artistExists = await this.prisma.artist.findUnique({
        where: { id: artistId },
      });

      if (!artistExists) {
        throw new NotFoundException(`Artist with id ${artistId} not found`);
      }
    }

    if (albumId) {
      const albumExists = await this.prisma.artist.findUnique({
        where: { id: artistId },
      });

      if (!albumExists) {
        throw new NotFoundException(`Album with id ${albumId} not found`);
      }
    }

    return this.prisma.track.create({
      data: {
        name: createTrackDto.name,
        duration: createTrackDto.duration,
        artistId: createTrackDto.artistId || null,
        albumId: createTrackDto.albumId || null,
      },
    });
  }

  async updateTrack(
    id: string,
    updateTrackDto: UpdateTrackDto,
  ): Promise<Track> {
    try {
      const { artistId, albumId } = updateTrackDto;
      if (artistId) {
        const artistExists = await this.prisma.artist.findUnique({
          where: { id: artistId },
        });

        if (!artistExists) {
          throw new NotFoundException(`Artist with id ${artistId} not found`);
        }
      }

      if (albumId) {
        const albumExists = await this.prisma.artist.findUnique({
          where: { id: artistId },
        });

        if (!albumExists) {
          throw new NotFoundException(`Album with id ${albumId} not found`);
        }
      }

      return await this.prisma.track.update({
        where: { id },
        data: {
          name: updateTrackDto.name,
          duration: updateTrackDto.duration,
          artistId: updateTrackDto.artistId || null,
          albumId: updateTrackDto.albumId || null,
        },
      });
    } catch {
      throw new NotFoundException('Track not found');
    }
  }

  async deleteTrack(id: string): Promise<void> {
    try {
      await this.prisma.track.delete({ where: { id } });
    } catch {
      throw new NotFoundException('Track not found');
    }
  }
}
