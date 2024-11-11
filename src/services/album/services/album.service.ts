import { Injectable, NotFoundException } from '@nestjs/common';
import { DatabaseService } from '../../../database/database.service';
import { AlbumDto } from '../dto/album.dto';
import { CreateAlbumDto } from '../dto/create-album.dto';
import { UpdateAlbumDto } from '../dto/update-album.dto';

@Injectable()
export class AlbumService {
    constructor(private readonly databaseService: DatabaseService) { }

    async getAllAlbums(): Promise<AlbumDto[]> {
        return this.databaseService.getAllAlbums();
    }

    async getAlbumById(id: string): Promise<AlbumDto> {
        const album = this.databaseService.getAlbumById(id);
        if (!album) {
            throw new NotFoundException('Album not found');
        }
        return album;
    }

    async createAlbum(createAlbumDto: CreateAlbumDto): Promise<AlbumDto> {
        return this.databaseService.createAlbum(createAlbumDto);
    }

    async updateAlbum(id: string, updateAlbumDto: UpdateAlbumDto): Promise<AlbumDto> {
        const updatedAlbum = this.databaseService.updateAlbum(id, updateAlbumDto);
        if (!updatedAlbum) {
            throw new NotFoundException('Album not found');
        }
        return updatedAlbum;
    }

    async deleteAlbum(id: string): Promise<void> {
        const result = this.databaseService.deleteAlbum(id);
        if (!result) {
            throw new NotFoundException('Album not found');
        }
    }
}
