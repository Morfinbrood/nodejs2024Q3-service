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
import * as bcrypt from 'bcrypt';
import { PublicUser } from '../../models/public-user.model';
import { User } from '../../models/user.model';
import { UpdatePasswordDto } from '../dto/update-password.dto';
import { CreateUserDto } from '../dto/create-user.dto';

@Injectable()
export class UserService {
  constructor(private readonly databaseService: DatabaseService) { }

  async getAllUsers(): Promise<PublicUser[]> {
    const users = this.databaseService.getAllUsers();
    return users.map((user) => this.excludePassword(user));
  }

  async getUserPasswordById(id: string): Promise<string> {
    const user = this.databaseService.getUserById(id);
    if (!user) {
      throw new NotFoundException(USER_NOT_FOUND);
    }
    return user.password;
  }

  async getPublicUserById(id: string): Promise<PublicUser> {
    const user = this.databaseService.getUserById(id);
    if (!user) {
      throw new NotFoundException(USER_NOT_FOUND);
    }
    return this.excludePassword(user);
  }

  async createUser(createUserDto: CreateUserDto): Promise<PublicUser> {
    const { login, password } = createUserDto;

    if (this.databaseService.isUserExists(login)) {
      throw new BadRequestException(USER_ALREADY_EXISTS);
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = this.databaseService.createUser(login, hashedPassword);

    return this.excludePassword(newUser);
  }

  async updateUserPassword(
    id: string,
    updatePasswordDto: UpdatePasswordDto,
  ): Promise<PublicUser> {
    const { oldPassword, newPassword } = updatePasswordDto;
    const userPassword = await this.getUserPasswordById(id);

    const isOldPasswordCorrect = await bcrypt.compare(
      oldPassword,
      userPassword,
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

  private excludePassword(user: User): PublicUser {
    const { password, ...publicUser } = user;
    return publicUser;
  }
}
