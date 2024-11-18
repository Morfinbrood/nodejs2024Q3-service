import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  HttpCode,
  UsePipes,
  ValidationPipe,
  ParseUUIDPipe,
} from '@nestjs/common';
import { UserService } from '../services/user.service';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdatePasswordDto } from '../dto/update-password.dto';
import { PublicUserDto } from '../dto/public-user.dto';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBody,
} from '@nestjs/swagger';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private readonly usersService: UserService) {}

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
  @ApiResponse({ status: 400, description: 'Invalid User ID' })
  @ApiResponse({ status: 404, description: 'User not found' })
  async getUserById(
    @Param('id', new ParseUUIDPipe()) id: string,
  ): Promise<PublicUserDto> {
    return await this.usersService.getPublicUserById(id);
  }

  @Post()
  @ApiOperation({ summary: 'Create a new user' })
  @ApiBody({ description: 'Data to create a user', type: CreateUserDto })
  @ApiResponse({
    status: 201,
    description: 'User successfully created',
    type: PublicUserDto,
  })
  @ApiResponse({ status: 400, description: 'Invalid data for creating a user' })
  @UsePipes(new ValidationPipe({ whitelist: true }))
  async createUser(
    @Body() createUserDto: CreateUserDto,
  ): Promise<PublicUserDto> {
    return await this.usersService.createUser(createUserDto);
  }

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
    type: PublicUserDto,
  })
  @ApiResponse({ status: 400, description: 'Invalid User ID' })
  @ApiResponse({ status: 403, description: 'Old password is incorrect' })
  @ApiResponse({ status: 404, description: 'User not found' })
  @UsePipes(new ValidationPipe({ whitelist: true }))
  async updateUserPassword(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() updatePasswordDto: UpdatePasswordDto,
  ): Promise<PublicUserDto> {
    return await this.usersService.updateUserPassword(id, updatePasswordDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a user' })
  @ApiParam({ name: 'id', description: 'User UUID', format: 'uuid' })
  @ApiResponse({ status: 204, description: 'User successfully deleted' })
  @ApiResponse({ status: 400, description: 'Invalid User ID' })
  @ApiResponse({ status: 404, description: 'User not found' })
  @HttpCode(204)
  async deleteUser(
    @Param('id', new ParseUUIDPipe()) id: string,
  ): Promise<void> {
    await this.usersService.deleteUser(id);
  }
}
