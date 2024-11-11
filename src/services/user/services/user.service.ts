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
import { PublicUser } from '../../models/public-user.model';
import { UpdatePasswordDto } from '../dto/update-password.dto';
import { CreateUserDto } from '../dto/create-user.dto';
import { IUser } from '../../../interfaces/user.interfaces';

@Injectable()
export class UserService {
  constructor(private readonly databaseService: DatabaseService) {}

  async getAllUsers(): Promise<PublicUser[]> {
    const users = this.databaseService.getAllUsers();
    return users.map((user) => this.excludePassword(user));
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

    const newUser = this.databaseService.createUser(login, password);

    return this.excludePassword(newUser);
  }

  async updateUserPassword(
    id: string,
    updatePasswordDto: UpdatePasswordDto,
  ): Promise<PublicUser> {
    const { oldPassword, newPassword } = updatePasswordDto;

    const isOldPasswordCorrect =
      await this.databaseService.validateUserPassword(id, oldPassword);

    if (!isOldPasswordCorrect) {
      throw new ForbiddenException(WRONG_OLD_PASSWORD);
    }

    const updatedUser = this.databaseService.updateUserPassword(
      id,
      newPassword,
    );

    return this.excludePassword(updatedUser);
  }
  async deleteUser(id: string): Promise<void> {
    const result = this.databaseService.deleteUser(id);
    if (!result) {
      throw new NotFoundException(USER_NOT_FOUND);
    }
  }

  private excludePassword(user: IUser): PublicUser {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...publicUser } = user;
    return publicUser;
  }
}
