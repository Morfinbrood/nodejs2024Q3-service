import { Injectable } from '@nestjs/common';
import { v4 as uuidv4, validate as isUUID } from 'uuid';

interface User {
  id: string;
  login: string;
  password: string;
  version: number;
  createdAt: number;
  updatedAt: number;
}

@Injectable()
export class DatabaseService {
  private users: User[] = [];

  isLoginExists(login: string): boolean {
    return this.users.some((user) => user.login === login);
  }

  getAllUsers(): User[] {
    return this.users;
  }

  createUser(login: string, password: string): User {
    const newUser: User = {
      id: uuidv4(),
      login,
      password,
      version: 1,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };
    this.users.push(newUser);
    return newUser;
  }

  getUserById(id: string): User | undefined {
    return isUUID(id) ? this.users.find((user) => user.id === id) : undefined;
  }

  updateUser(
    id: string,
    updatedData: Partial<Omit<User, 'id'>>,
  ): User | undefined {
    const user = this.getUserById(id);
    if (user) {
      Object.assign(user, {
        ...updatedData,
        updatedAt: Date.now(),
        version: user.version + 1,
      });
      return user;
    }
    return undefined;
  }

  deleteUser(id: string): boolean {
    const index = this.users.findIndex((user) => user.id === id);
    if (index !== -1) {
      this.users.splice(index, 1);
      return true;
    }
    return false;
  }
}
