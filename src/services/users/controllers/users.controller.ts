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
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { UsersService } from '../services/users.service';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdatePasswordDto } from '../dto/update-password.dto';
import { User } from '../models/user.model';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
  ApiParam,
  ApiBody,
} from '@nestjs/swagger';

@ApiTags('Users')
@ApiBearerAuth()
@Controller('user')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  /**
   * GET /user
   * Retrieves all users
   */
  @Get()
  @ApiOperation({ summary: 'Retrieve all users' })
  @ApiResponse({
    status: 200,
    description: 'List of users',
    type: [User],
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized',
  })
  async getAllUsers(): Promise<User[]> {
    return await this.usersService.getAllUsers();
  }

  /**
   * GET /user/:id
   * Retrieves a user by ID
   */
  @Get(':id')
  @ApiOperation({ summary: 'Retrieve a user by ID' })
  @ApiParam({
    name: 'id',
    type: String,
    description: 'UUID of the user',
  })
  @ApiResponse({
    status: 200,
    description: 'User found',
    type: User,
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid ID format',
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized',
  })
  @ApiResponse({
    status: 404,
    description: 'User not found',
  })
  async getUserById(@Param('id') id: string): Promise<User> {
    if (!this.usersService.isValidUUID(id)) {
      throw new BadRequestException('Invalid user ID format');
    }

    const user = await this.usersService.getUserById(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  /**
   * POST /user
   * Creates a new user
   */
  @Post()
  @ApiOperation({ summary: 'Create a new user' })
  @ApiBody({
    type: CreateUserDto,
    description: 'Data required to create a new user',
  })
  @ApiResponse({
    status: 201,
    description: 'User created',
    type: User,
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid request data',
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized',
  })
  async createUser(@Body() createUserDto: CreateUserDto): Promise<User> {
    return await this.usersService.createUser(createUserDto);
  }

  /**
   * PUT /user/:id
   * Updates a user's password
   */
  @Put(':id')
  @ApiOperation({ summary: "Update a user's password" })
  @ApiParam({
    name: 'id',
    type: String,
    description: 'UUID of the user',
  })
  @ApiBody({
    type: UpdatePasswordDto,
    description: 'Data required to update the user password',
  })
  @ApiResponse({
    status: 200,
    description: 'User password updated',
    type: User,
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid ID or data',
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized',
  })
  @ApiResponse({
    status: 403,
    description: 'Old password is incorrect',
  })
  @ApiResponse({
    status: 404,
    description: 'User not found',
  })
  async updateUserPassword(
    @Param('id') id: string,
    @Body() updatePasswordDto: UpdatePasswordDto,
  ): Promise<User> {
    if (!this.usersService.isValidUUID(id)) {
      throw new BadRequestException('Invalid user ID format');
    }

    const user = await this.usersService.getUserById(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    const updatedUser = await this.usersService.updateUserPassword(
      id,
      updatePasswordDto,
    );

    if (!updatedUser) {
      throw new ForbiddenException('Old password is incorrect');
    }

    return updatedUser;
  }

  /**
   * DELETE /user/:id
   * Deletes a user by ID
   */
  @Delete(':id')
  @ApiOperation({ summary: 'Delete a user by ID' })
  @ApiParam({
    name: 'id',
    type: String,
    description: 'UUID of the user',
  })
  @ApiResponse({
    status: 204,
    description: 'User deleted successfully',
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid ID format',
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized',
  })
  @ApiResponse({
    status: 404,
    description: 'User not found',
  })
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteUser(@Param('id') id: string): Promise<void> {
    if (!this.usersService.isValidUUID(id)) {
      throw new BadRequestException('Invalid user ID format');
    }

    const userExists = await this.usersService.deleteUser(id);
    if (!userExists) {
      throw new NotFoundException('User not found');
    }
  }
}
