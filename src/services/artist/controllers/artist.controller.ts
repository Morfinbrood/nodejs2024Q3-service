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
  import { ArtistService } from '../services/artist.service';
  import { ArtistDto } from '../dto/artist.dto';
  import { CreateArtistDto } from '../dto/create-artist.dto';
  import { UpdateArtistDto } from '../dto/update-artist.dto';
  import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody } from '@nestjs/swagger';
  import { validate as isUUID } from 'uuid';
  
  @ApiTags('Artist')
  @Controller('artist')
  export class ArtistController {
    constructor(private readonly artistService: ArtistService) {}
  
    @Get()
    @ApiOperation({ summary: 'Get all artists' })
    @ApiResponse({
      status: 200,
      description: 'List of all artists',
      type: [ArtistDto],
    })
    async getAllArtists(): Promise<ArtistDto[]> {
      return this.artistService.getAllArtists();
    }
  
    @Get(':id')
    @ApiOperation({ summary: 'Get an artist by ID' })
    @ApiParam({ name: 'id', description: 'Artist UUID', format: 'uuid' })
    @ApiResponse({
      status: 200,
      description: 'Artist found',
      type: ArtistDto,
    })
    @ApiResponse({ status: 400, description: 'Invalid artist ID' })
    @ApiResponse({ status: 404, description: 'Artist not found' })
    async getArtistById(@Param('id') id: string): Promise<ArtistDto> {
      if (!isUUID(id)) {
        throw new BadRequestException('Invalid artist ID');
      }
      return this.artistService.getArtistById(id);
    }
  
    @Post()
    @ApiOperation({ summary: 'Create a new artist' })
    @ApiBody({ description: 'Data to create an artist', type: CreateArtistDto })
    @ApiResponse({
      status: 201,
      description: 'Artist successfully created',
      type: ArtistDto,
    })
    @UsePipes(new ValidationPipe({ whitelist: true }))
    async createArtist(@Body() createArtistDto: CreateArtistDto): Promise<ArtistDto> {
      return this.artistService.createArtist(createArtistDto);
    }
  
    @Put(':id')
    @ApiOperation({ summary: 'Update artist info' })
    @ApiParam({ name: 'id', description: 'Artist UUID', format: 'uuid' })
    @ApiBody({ description: 'Data to update the artist', type: UpdateArtistDto })
    @ApiResponse({
      status: 200,
      description: 'Artist successfully updated',
      type: ArtistDto,
    })
    @ApiResponse({ status: 400, description: 'Invalid artist ID' })
    @ApiResponse({ status: 404, description: 'Artist not found' })
    async updateArtist(
      @Param('id') id: string,
      @Body() updateArtistDto: UpdateArtistDto,
    ): Promise<ArtistDto> {
      if (!isUUID(id)) {
        throw new BadRequestException('Invalid artist ID');
      }
      return this.artistService.updateArtist(id, updateArtistDto);
    }
  
    @Delete(':id')
    @ApiOperation({ summary: 'Delete an artist' })
    @ApiParam({ name: 'id', description: 'Artist UUID', format: 'uuid' })
    @ApiResponse({ status: 204, description: 'Artist successfully deleted' })
    @ApiResponse({ status: 400, description: 'Invalid artist ID' })
    @ApiResponse({ status: 404, description: 'Artist not found' })
    @HttpCode(HttpStatus.NO_CONTENT)
    async deleteArtist(@Param('id') id: string): Promise<void> {
      if (!isUUID(id)) {
        throw new BadRequestException('Invalid artist ID');
      }
      await this.artistService.deleteArtist(id);
    }
  }
  