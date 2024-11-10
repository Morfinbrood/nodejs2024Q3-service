import {
  Injectable,
  BadRequestException,
  ForbiddenException,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdatePasswordDto } from '../dto/update-password.dto';
import { User } from '../models/user.model';
import * as bcrypt from 'bcrypt';
import { DatabaseService } from '../../../shared/database/database.service';
import {
  USER_ALREADY_EXISTS,
  USER_NOT_FOUND,
  WRONG_OLD_PASSWORD,
} from '../../../shared/constants';

@Injectable()
export class UsersService {
  constructor(private readonly databaseService: DatabaseService) {}

  async getAllUsers(): Promise<User[]> {
    const users = this.databaseService.getAllUsers();
    return users.map((user) => this.excludePassword(user));
  }

  async getUserById(id: string): Promise<User> {
    const user = this.databaseService.getUserById(id);
    if (!user) {
      throw new NotFoundException(USER_NOT_FOUND);
    }
    return this.excludePassword(user);
  }

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const { login, password } = createUserDto;

    if (this.databaseService.isLoginExists(login)) {
      throw new BadRequestException(USER_ALREADY_EXISTS);
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = this.databaseService.createUser(login, hashedPassword);

    return this.excludePassword(newUser);
  }

  async updateUserPassword(
    id: string,
    updatePasswordDto: UpdatePasswordDto,
  ): Promise<User> {
    const { oldPassword, newPassword } = updatePasswordDto;
    const user = this.databaseService.getUserById(id);
    if (!user) {
      throw new NotFoundException(USER_NOT_FOUND);
    }

    const isOldPasswordCorrect = await bcrypt.compare(
      oldPassword,
      user.password,
    );
    if (!isOldPasswordCorrect) {
      throw new ForbiddenException(WRONG_OLD_PASSWORD);
    }

    const hashedNewPassword = await bcrypt.hash(newPassword, 10);
    const updatedUser = this.databaseService.updateUser(id, {
      password: hashedNewPassword,
    });

    return this.excludePassword(updatedUser);
  }

  async deleteUser(id: string): Promise<void> {
    const result = this.databaseService.deleteUser(id);
    if (!result) {
      throw new NotFoundException(USER_NOT_FOUND);
    }

    // Here we need to remove the user from the associated data
  }

  private excludePassword(user: User): User {
    const result = { ...user };
    delete result.password;
    return result;
  }
}
