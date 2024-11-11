import {
    Controller,
    Get,
    Post,
    Body,
    Param,
    Put,
    Delete,
    HttpCode,
    HttpStatus,
    BadRequestException,
    UsePipes,
    ValidationPipe,
} from '@nestjs/common';
import { AlbumService } from '../services/album.service';
import { AlbumDto } from '../dto/album.dto';
import { CreateAlbumDto } from '../dto/create-album.dto';
import { UpdateAlbumDto } from '../dto/update-album.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody } from '@nestjs/swagger';
import { validate as isUUID } from 'uuid';

@ApiTags('Album')
@Controller('album')
export class AlbumController {
    constructor(private readonly albumsService: AlbumService) { }

    @Get()
    @ApiOperation({ summary: 'Get all albums' })
    @ApiResponse({
        status: 200,
        description: 'List of all albums',
        type: [AlbumDto],
    })
    async getAllAlbums(): Promise<AlbumDto[]> {
        return this.albumsService.getAllAlbums();
    }

    @Get(':id')
    @ApiOperation({ summary: 'Get an album by ID' })
    @ApiParam({ name: 'id', description: 'Album UUID', format: 'uuid' })
    @ApiResponse({
        status: 200,
        description: 'Album found',
        type: AlbumDto,
    })
    @ApiResponse({ status: 400, description: 'Invalid album ID' })
    @ApiResponse({ status: 404, description: 'Album not found' })
    async getAlbumById(@Param('id') id: string): Promise<AlbumDto> {
        if (!isUUID(id)) {
            throw new BadRequestException('Invalid album ID');
        }
        return this.albumsService.getAlbumById(id);
    }

    @Post()
    @ApiOperation({ summary: 'Create a new album' })
    @ApiBody({ description: 'Data to create an album', type: CreateAlbumDto })
    @ApiResponse({
        status: 201,
        description: 'Album successfully created',
        type: AlbumDto,
    })
    @UsePipes(new ValidationPipe({ whitelist: true }))
    async createAlbum(@Body() createAlbumDto: CreateAlbumDto): Promise<AlbumDto> {
        return this.albumsService.createAlbum(createAlbumDto);
    }

    @Put(':id')
    @ApiOperation({ summary: 'Update album info' })
    @ApiParam({ name: 'id', description: 'Album UUID', format: 'uuid' })
    @ApiBody({ description: 'Data to update the album', type: UpdateAlbumDto })
    @ApiResponse({
        status: 200,
        description: 'Album successfully updated',
        type: AlbumDto,
    })
    @ApiResponse({ status: 400, description: 'Invalid album ID' })
    @ApiResponse({ status: 404, description: 'Album not found' })
    async updateAlbum(
        @Param('id') id: string,
        @Body() updateAlbumDto: UpdateAlbumDto,
    ): Promise<AlbumDto> {
        if (!isUUID(id)) {
            throw new BadRequestException('Invalid album ID');
        }
        return this.albumsService.updateAlbum(id, updateAlbumDto);
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Delete an album' })
    @ApiParam({ name: 'id', description: 'Album UUID', format: 'uuid' })
    @ApiResponse({ status: 204, description: 'Album successfully deleted' })
    @ApiResponse({ status: 400, description: 'Invalid album ID' })
    @ApiResponse({ status: 404, description: 'Album not found' })
    @HttpCode(HttpStatus.NO_CONTENT)
    async deleteAlbum(@Param('id') id: string): Promise<void> {
        if (!isUUID(id)) {
            throw new BadRequestException('Invalid album ID');
        }
        await this.albumsService.deleteAlbum(id);
    }
}
