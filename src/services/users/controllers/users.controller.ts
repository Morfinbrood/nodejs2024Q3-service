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
  UsePipes,
  ValidationPipe,
  BadRequestException,
} from '@nestjs/common';
import { UsersService } from '../services/users.service';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdatePasswordDto } from '../dto/update-password.dto';
import { IUser } from '../../../interfaces/user.interfaces';
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
  constructor(private readonly usersService: UsersService) {}

  /**
   * Get all users
   * @returns Array of User objects
   */
  @Get()
  @ApiOperation({ summary: 'Get all users' })
  @ApiResponse({
    status: 200,
    description: 'List of all users',
    type: [CreateUserDto],
  })
  async getAllUsers(): Promise<IUser[]> {
    return await this.usersService.getAllUsers();
  }

  /**
   * Get a user by ID
   * @param id User UUID
   * @returns User object
   */
  @Get(':id')
  @ApiOperation({ summary: 'Get a user by ID' })
  @ApiParam({ name: 'id', description: 'User UUID', format: 'uuid' })
  @ApiResponse({
    status: 200,
    description: 'User found',
    type: CreateUserDto,
  })
  @ApiResponse({
    status: 400,
    description: INVALID_USER_ID,
  })
  @ApiResponse({
    status: 404,
    description: USER_NOT_FOUND,
  })
  @UsePipes(new ValidationPipe({ whitelist: true }))
  async getUserById(@Param('id') id: string): Promise<IUser> {
    if (!isUUID(id)) {
      throw new BadRequestException(INVALID_USER_ID);
    }

    const user = await this.usersService.getUserById(id);
    if (!user) {
      throw new NotFoundException(USER_NOT_FOUND);
    }

    return user;
  }

  /**
   * Create a new user
   * @param createUserDto Data to create a user
   * @returns Created User object
   */
  @Post()
  @ApiOperation({ summary: 'Create a new user' })
  @ApiBody({
    description: 'Data to create a user',
    type: CreateUserDto,
  })
  @ApiResponse({
    status: 201,
    description: 'User successfully created',
    type: CreateUserDto,
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid data for creating a user',
  })
  @UsePipes(new ValidationPipe({ whitelist: true }))
  async createUser(@Body() createUserDto: CreateUserDto): Promise<IUser> {
    return await this.usersService.createUser(createUserDto);
  }

  /**
   * Update user password
   * @param id User UUID
   * @param updatePasswordDto Data to update the password
   * @returns Updated User object
   */
  @Put(':id')
  @ApiOperation({ summary: 'Update user password' })
  @ApiParam({ name: 'id', description: 'User UUID', format: 'uuid' })
  @ApiBody({
    description: 'Data to update the password',
    type: UpdatePasswordDto,
  })
  @ApiResponse({
    status: 200,
    description: 'Password successfully updated',
    type: CreateUserDto,
  })
  @ApiResponse({
    status: 400,
    description: INVALID_USER_ID,
  })
  @ApiResponse({
    status: 403,
    description: WRONG_OLD_PASSWORD,
  })
  @ApiResponse({
    status: 404,
    description: USER_NOT_FOUND,
  })
  @UsePipes(new ValidationPipe({ whitelist: true }))
  async updateUserPassword(
    @Param('id') id: string,
    @Body() updatePasswordDto: UpdatePasswordDto,
  ): Promise<IUser> {
    if (!isUUID(id)) {
      throw new BadRequestException(INVALID_USER_ID);
    }

    return await this.usersService.updateUserPassword(id, updatePasswordDto);
  }

  /**
   * Delete a user
   * @param id User UUID
   */
  @Delete(':id')
  @ApiOperation({ summary: 'Delete a user' })
  @ApiParam({ name: 'id', description: 'User UUID', format: 'uuid' })
  @ApiResponse({
    status: 204,
    description: 'User successfully deleted',
  })
  @ApiResponse({
    status: 400,
    description: INVALID_USER_ID,
  })
  @ApiResponse({
    status: 404,
    description: USER_NOT_FOUND,
  })
  @HttpCode(HttpStatus.NO_CONTENT)
  @UsePipes(new ValidationPipe({ whitelist: true }))
  async deleteUser(@Param('id') id: string): Promise<void> {
    if (!isUUID(id)) {
      throw new BadRequestException(INVALID_USER_ID);
    }

    await this.usersService.deleteUser(id);
  }
}
