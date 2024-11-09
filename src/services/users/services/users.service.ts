// src/services/users/services/users.service.ts

import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../../../shared/database/database.service';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { User } from '../interfaces/user.interface';

@Injectable()
export class UsersService {
  constructor(private readonly databaseService: DatabaseService) {}

  getAllUsers(): User[] {
    return this.databaseService.getAllUsers();
  }

  createUser(createUserDto: CreateUserDto): User {
    const { name, email } = createUserDto;
    return this.databaseService.createUser(name, email);
  }

  getUserById(id: number): User | undefined {
    return this.databaseService.getUserById(id);
  }

  updateUser(id: number, updateUserDto: UpdateUserDto): User | undefined {
    return this.databaseService.updateUser(id, updateUserDto);
  }

  deleteUser(id: number): boolean {
    return this.databaseService.deleteUser(id);
  }
}
