import { Injectable, NotFoundException } from '@nestjs/common';
import { DatabaseService } from '../../../database/database.service';
import { TrackDto } from '../dto/track.dto';
import { CreateTrackDto } from '../dto/create-track.dto';
import { UpdateTrackDto } from '../dto/update-track.dto';

@Injectable()
export class TrackService {
  constructor(private readonly databaseService: DatabaseService) {}

  async getAllTracks(): Promise<TrackDto[]> {
    return this.databaseService.getAllTracks();
  }

  async getTrackById(id: string): Promise<TrackDto> {
    const track = this.databaseService.getTrackById(id);
    if (!track) {
      throw new NotFoundException('Track not found');
    }
    return track;
  }

  async createTrack(createTrackDto: CreateTrackDto): Promise<TrackDto> {
    return this.databaseService.createTrack(createTrackDto); // предполагается, что createTrack создаст и вернет TrackDto с id
  }

  async updateTrack(
    id: string,
    updateTrackDto: UpdateTrackDto,
  ): Promise<TrackDto> {
    const updatedTrack = this.databaseService.updateTrack(id, updateTrackDto);
    if (!updatedTrack) {
      throw new NotFoundException('Track not found');
    }
    return updatedTrack;
  }

  async deleteTrack(id: string): Promise<void> {
    const result = this.databaseService.deleteTrack(id);
    if (!result) {
      throw new NotFoundException('Track not found');
    }
  }
}
