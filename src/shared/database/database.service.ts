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
  private users: User[] = [
    {
      id: uuidv4(),
      login: 'john_doe',
      password: 'password123',
      version: 1,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    },
    {
      id: uuidv4(),
      login: 'jane_smith',
      password: 'securepass456',
      version: 1,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    },
  ];

  /**
   * Checks if the provided string is a valid UUID
   * @param id The string to validate
   */
  isValidUUID(id: string): boolean {
    return isUUID(id);
  }

  /**
   * Retrieves all users
   */
  getAllUsers(): User[] {
    return this.users;
  }

  /**
   * Creates a new user
   * @param login User's login
   * @param password User's hashed password
   */
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

  /**
   * Retrieves a user by ID
   * @param id UUID of the user
   */
  getUserById(id: string): User | undefined {
    return this.isValidUUID(id)
      ? this.users.find((user) => user.id === id)
      : undefined;
  }

  /**
   * Updates a user
   * @param id UUID of the user
   * @param updatedData Fields to update
   */
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
    }
    return user;
  }

  /**
   * Deletes a user by ID
   * @param id UUID of the user
   */
  deleteUser(id: string): boolean {
    const index = this.users.findIndex((user) => user.id === id);
    if (index !== -1) {
      this.users.splice(index, 1);
      return true;
    }
    return false;
  }
}
