import { Injectable, NotFoundException } from '@nestjs/common';
import { DatabaseService } from '../../../database/database.service';
import { ICreateTrackDto, ITrack } from 'src/interfaces/track.interfaces';
import { TRACK_NOT_FOUND } from '../../../constants';
import { UpdateTrackDto } from '../dto/update-track.dto';

@Injectable()
export class TracksService {
  constructor(private readonly databaseService: DatabaseService) {}

  async getAllTracks(): Promise<ITrack[]> {
    return this.databaseService.getAllTracks();
  }

  async getTrackById(id: string): Promise<ITrack> {
    const track = this.databaseService.getTrackById(id);
    if (!track) {
      throw new NotFoundException(TRACK_NOT_FOUND);
    }
    return track;
  }

  async createTrack(data: ICreateTrackDto): Promise<ITrack> {
    return this.databaseService.createTrack(data);
  }

  async updateTrack(id: string, data: UpdateTrackDto): Promise<ITrack> {
    const updatedTrack = this.databaseService.updateTrack(id, data);
    if (!updatedTrack) {
      throw new NotFoundException(TRACK_NOT_FOUND);
    }
    return updatedTrack;
  }

  async deleteTrack(id: string): Promise<void> {
    const result = this.databaseService.deleteTrack(id);
    if (!result) {
      throw new NotFoundException(TRACK_NOT_FOUND);
    }
  }
}
