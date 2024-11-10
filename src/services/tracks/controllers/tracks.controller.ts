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
  NotFoundException,
  BadRequestException,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { TracksService } from '../services/tracks.service';
import { CreateTrackDto } from '../dto/create-track.dto';
import { ITrack } from '../../../interfaces/track.interfaces';
import { validate as isUUID } from 'uuid';
import { TRACK_NOT_FOUND, INVALID_TRACK_ID } from '../../../constants';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody } from '@nestjs/swagger';

@ApiTags('Tracks')
@Controller('track')
export class TracksController {
  constructor(private readonly tracksService: TracksService) {}

  @Get()
  @ApiOperation({ summary: 'Get all tracks' })
  @ApiResponse({
    status: 200,
    description: 'List of all tracks',
    type: [CreateTrackDto],
  })
  async getAllTracks(): Promise<ITrack[]> {
    return await this.tracksService.getAllTracks();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a track by ID' })
  @ApiParam({ name: 'id', description: 'Track UUID', format: 'uuid' })
  @ApiResponse({
    status: 200,
    description: 'Track found',
    type: CreateTrackDto,
  })
  @ApiResponse({
    status: 400,
    description: INVALID_TRACK_ID,
  })
  @ApiResponse({
    status: 404,
    description: TRACK_NOT_FOUND,
  })
  async getTrackById(@Param('id') id: string): Promise<ITrack> {
    if (!isUUID(id)) {
      throw new BadRequestException(INVALID_TRACK_ID);
    }

    return await this.tracksService.getTrackById(id);
  }

  @Post()
  @ApiOperation({ summary: 'Create a new track' })
  @ApiBody({
    description: 'Data to create a track',
    type: CreateTrackDto,
  })
  @ApiResponse({
    status: 201,
    description: 'Track successfully created',
    type: CreateTrackDto,
  })
  @UsePipes(new ValidationPipe({ whitelist: true }))
  async createTrack(@Body() createTrackDto: CreateTrackDto): Promise<ITrack> {
    return await this.tracksService.createTrack(createTrackDto);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update track info' })
  @ApiParam({ name: 'id', description: 'Track UUID', format: 'uuid' })
  @ApiBody({
    description: 'Data to update the track',
    type: CreateTrackDto,
  })
  @ApiResponse({
    status: 200,
    description: 'Track successfully updated',
    type: CreateTrackDto,
  })
  @ApiResponse({
    status: 400,
    description: INVALID_TRACK_ID,
  })
  @ApiResponse({
    status: 404,
    description: TRACK_NOT_FOUND,
  })
  async updateTrack(
    @Param('id') id: string,
    @Body() updateTrackDto: Partial<CreateTrackDto>,
  ): Promise<ITrack> {
    if (!isUUID(id)) {
      throw new BadRequestException(INVALID_TRACK_ID);
    }

    return await this.tracksService.updateTrack(id, updateTrackDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a track' })
  @ApiParam({ name: 'id', description: 'Track UUID', format: 'uuid' })
  @ApiResponse({
    status: 204,
    description: 'Track successfully deleted',
  })
  @ApiResponse({
    status: 400,
    description: INVALID_TRACK_ID,
  })
  @ApiResponse({
    status: 404,
    description: TRACK_NOT_FOUND,
  })
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteTrack(@Param('id') id: string): Promise<void> {
    if (!isUUID(id)) {
      throw new BadRequestException(INVALID_TRACK_ID);
    }

    await this.tracksService.deleteTrack(id);
  }
}
