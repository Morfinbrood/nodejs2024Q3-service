import {
  Injectable,
  BadRequestException,
  ForbiddenException,
  NotFoundException,
} from '@nestjs/common';
import { DatabaseService } from '../../../database/database.service';
import {
  USER_ALREADY_EXISTS,
  USER_NOT_FOUND,
  WRONG_OLD_PASSWORD,
} from '../../../constants';

import {
  IUser,
  ICreateUserDto,
  IUpdatePasswordDto,
} from 'src/interfaces/user.interfaces';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(private readonly databaseService: DatabaseService) {}

  async getAllUsers(): Promise<IUser[]> {
    const users = this.databaseService.getAllUsers();
    return users.map((user) => this.excludePassword(user));
  }

  async getUserById(id: string): Promise<IUser> {
    const user = this.databaseService.getUserById(id);
    if (!user) {
      throw new NotFoundException(USER_NOT_FOUND);
    }
    return this.excludePassword(user);
  }

  async createUser(createUserDto: ICreateUserDto): Promise<IUser> {
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
    updatePasswordDto: IUpdatePasswordDto,
  ): Promise<IUser> {
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
  }

  private excludePassword(user: IUser): IUser {
    const result = { ...user };
    delete result.password;
    return result;
  }
}
