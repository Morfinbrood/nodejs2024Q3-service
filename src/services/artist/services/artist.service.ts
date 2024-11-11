import { Injectable, NotFoundException } from '@nestjs/common';
import { DatabaseService } from '../../../database/database.service';
import { ArtistDto } from '../dto/artist.dto';
import { CreateArtistDto } from '../dto/create-artist.dto';
import { UpdateArtistDto } from '../dto/update-artist.dto';

@Injectable()
export class ArtistService {
  constructor(private readonly databaseService: DatabaseService) {}

  async getAllArtists(): Promise<ArtistDto[]> {
    return this.databaseService.getAllArtists();
  }

  async getArtistById(id: string): Promise<ArtistDto> {
    const artist = this.databaseService.getArtistById(id);
    if (!artist) {
      throw new NotFoundException('Artist not found');
    }
    return artist;
  }

  async createArtist(createArtistDto: CreateArtistDto): Promise<ArtistDto> {
    return this.databaseService.createArtist(createArtistDto); 
  }

  async updateArtist(id: string, updateArtistDto: UpdateArtistDto): Promise<ArtistDto> {
    const updatedArtist = this.databaseService.updateArtist(id, updateArtistDto);
    if (!updatedArtist) {
      throw new NotFoundException('Artist not found');
    }
    return updatedArtist;
  }

  async deleteArtist(id: string): Promise<void> {
    const result = this.databaseService.deleteArtist(id);
    if (!result) {
      throw new NotFoundException('Artist not found');
    }
  }
}
