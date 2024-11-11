import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  HttpCode,
  BadRequestException,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { UsersService } from '../services/users.service';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdatePasswordDto } from '../dto/update-password.dto';
import { PublicUserDto } from '../dto/public-user.dto';
import { validate as isUUID } from 'uuid';
import {
  INVALID_USER_ID,
  USER_NOT_FOUND,
  WRONG_OLD_PASSWORD,
} from '../../../constants';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBody,
} from '@nestjs/swagger';

@ApiTags('Users')
@Controller('user')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @Get()
  @ApiOperation({ summary: 'Get all users' })
  @ApiResponse({
    status: 200,
    description: 'List of all users',
    type: [PublicUserDto],
  })
  async getAllUsers(): Promise<PublicUserDto[]> {
    return await this.usersService.getAllUsers();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a user by ID' })
  @ApiParam({ name: 'id', description: 'User UUID', format: 'uuid' })
  @ApiResponse({
    status: 200,
    description: 'User found',
    type: PublicUserDto,
  })
  @ApiResponse({ status: 400, description: INVALID_USER_ID })
  @ApiResponse({ status: 404, description: USER_NOT_FOUND })
  async getUserById(@Param('id') id: string): Promise<PublicUserDto> {
    if (!isUUID(id)) {
      throw new BadRequestException(INVALID_USER_ID);
    }
    return await this.usersService.getUserById(id);
  }

  @Post()
  @ApiOperation({ summary: 'Create a new user' })
  @ApiBody({ description: 'Data to create a user', type: CreateUserDto })
  @ApiResponse({ status: 201, description: 'User successfully created', type: PublicUserDto })
  @ApiResponse({ status: 400, description: 'Invalid data for creating a user' })
  @UsePipes(new ValidationPipe({ whitelist: true }))
  async createUser(@Body() createUserDto: CreateUserDto): Promise<PublicUserDto> {
    return await this.usersService.createUser(createUserDto);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update user password' })
  @ApiParam({ name: 'id', description: 'User UUID', format: 'uuid' })
  @ApiBody({ description: 'Data to update the password', type: UpdatePasswordDto })
  @ApiResponse({ status: 200, description: 'Password successfully updated', type: PublicUserDto })
  @ApiResponse({ status: 400, description: INVALID_USER_ID })
  @ApiResponse({ status: 403, description: WRONG_OLD_PASSWORD })
  @ApiResponse({ status: 404, description: USER_NOT_FOUND })
  @UsePipes(new ValidationPipe({ whitelist: true }))
  async updateUserPassword(
    @Param('id') id: string,
    @Body() updatePasswordDto: UpdatePasswordDto,
  ): Promise<PublicUserDto> {
    if (!isUUID(id)) {
      throw new BadRequestException(INVALID_USER_ID);
    }
    return await this.usersService.updateUserPassword(id, updatePasswordDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a user' })
  @ApiParam({ name: 'id', description: 'User UUID', format: 'uuid' })
  @ApiResponse({ status: 204, description: 'User successfully deleted' })
  @ApiResponse({ status: 400, description: INVALID_USER_ID })
  @ApiResponse({ status: 404, description: USER_NOT_FOUND })
  @HttpCode(204)
  @UsePipes(new ValidationPipe({ whitelist: true }))
  async deleteUser(@Param('id') id: string): Promise<void> {
    if (!isUUID(id)) {
      throw new BadRequestException(INVALID_USER_ID);
    }
    await this.usersService.deleteUser(id);
  }
}
