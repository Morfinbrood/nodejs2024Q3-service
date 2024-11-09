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

@Injectable()
export class UsersService {
  constructor(private readonly databaseService: DatabaseService) {}

  /**
   * Checks if the provided string is a valid UUID
   * @param id The string to validate
   */
  isValidUUID(id: string): boolean {
    return this.databaseService.isValidUUID(id);
  }

  /**
   * Retrieves all users
   */
  async getAllUsers(): Promise<User[]> {
    const users = this.databaseService.getAllUsers();
    return users.map((user) => this.excludePassword(user));
  }

  /**
   * Retrieves a user by ID
   * @param id UUID of the user
   */
  async getUserById(id: string): Promise<User | undefined> {
    const user = this.databaseService.getUserById(id);
    return user ? this.excludePassword(user) : undefined;
  }

  /**
   * Creates a new user
   * @param createUserDto Data to create a user
   */
  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const { login, password } = createUserDto;

    // Check for unique login
    if (
      this.databaseService.getAllUsers().some((user) => user.login === login)
    ) {
      throw new BadRequestException('User already exists');
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = this.databaseService.createUser(login, hashedPassword);

    return this.excludePassword(newUser);
  }

  /**
   * Updates a user's password
   * @param id UUID of the user
   * @param updatePasswordDto Data to update the password
   */
  async updateUserPassword(
    id: string,
    updatePasswordDto: UpdatePasswordDto,
  ): Promise<User> {
    const { oldPassword, newPassword } = updatePasswordDto;
    const user = this.databaseService.getUserById(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    const isPasswordValid = await bcrypt.compare(oldPassword, user.password);
    if (!isPasswordValid) {
      throw new ForbiddenException('Old password is incorrect');
    }

    const hashedNewPassword = await bcrypt.hash(newPassword, 10);
    const updatedUser = this.databaseService.updateUser(id, {
      password: hashedNewPassword,
    });

    if (!updatedUser) {
      throw new NotFoundException('Old password is incorrect');
    }

    return this.excludePassword(updatedUser);
  }

  /**
   * Deletes a user by ID
   * @param id UUID of the user
   */
  async deleteUser(id: string): Promise<boolean> {
    const result = this.databaseService.deleteUser(id);
    if (!result) {
      throw new NotFoundException('User not found');
    }
    return result;
  }

  /**
   * Excludes the password field from the user object
   * @param user The user object
   */
  private excludePassword(user: User): User {
    const { password, ...result } = user;
    return result;
  }
}
