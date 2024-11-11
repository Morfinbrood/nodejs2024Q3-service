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
import { TrackService } from '../services/track.service';
import { TrackDto } from '../dto/track.dto';
import { CreateTrackDto } from '../dto/create-track.dto';
import { UpdateTrackDto } from '../dto/update-track.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody } from '@nestjs/swagger';
import { validate as isUUID } from 'uuid';

@ApiTags('Track')
@Controller('track')
export class TrackController {
  constructor(private readonly tracksService: TrackService) {}

  @Get()
  @ApiOperation({ summary: 'Get all tracks' })
  @ApiResponse({
    status: 200,
    description: 'List of all tracks',
    type: [TrackDto],
  })
  async getAllTracks(): Promise<TrackDto[]> {
    return this.tracksService.getAllTracks();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a track by ID' })
  @ApiParam({ name: 'id', description: 'Track UUID', format: 'uuid' })
  @ApiResponse({
    status: 200,
    description: 'Track found',
    type: TrackDto,
  })
  @ApiResponse({ status: 400, description: 'Invalid track ID' })
  @ApiResponse({ status: 404, description: 'Track not found' })
  async getTrackById(@Param('id') id: string): Promise<TrackDto> {
    if (!isUUID(id)) {
      throw new BadRequestException('Invalid track ID');
    }
    return this.tracksService.getTrackById(id);
  }

  @Post()
  @ApiOperation({ summary: 'Create a new track' })
  @ApiBody({ description: 'Data to create a track', type: CreateTrackDto })
  @ApiResponse({
    status: 201,
    description: 'Track successfully created',
    type: TrackDto,
  })
  @UsePipes(new ValidationPipe({ whitelist: true }))
  async createTrack(@Body() createTrackDto: CreateTrackDto): Promise<TrackDto> {
    return this.tracksService.createTrack(createTrackDto);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update track info' })
  @ApiParam({ name: 'id', description: 'Track UUID', format: 'uuid' })
  @ApiBody({ description: 'Data to update the track', type: UpdateTrackDto })
  @ApiResponse({
    status: 200,
    description: 'Track successfully updated',
    type: TrackDto,
  })
  @ApiResponse({ status: 400, description: 'Invalid track ID' })
  @ApiResponse({ status: 404, description: 'Track not found' })
  async updateTrack(
    @Param('id') id: string,
    @Body() updateTrackDto: UpdateTrackDto,
  ): Promise<TrackDto> {
    if (!isUUID(id)) {
      throw new BadRequestException('Invalid track ID');
    }
    return this.tracksService.updateTrack(id, updateTrackDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a track' })
  @ApiParam({ name: 'id', description: 'Track UUID', format: 'uuid' })
  @ApiResponse({ status: 204, description: 'Track successfully deleted' })
  @ApiResponse({ status: 400, description: 'Invalid track ID' })
  @ApiResponse({ status: 404, description: 'Track not found' })
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteTrack(@Param('id') id: string): Promise<void> {
    if (!isUUID(id)) {
      throw new BadRequestException('Invalid track ID');
    }
    await this.tracksService.deleteTrack(id);
  }
}
