import { Injectable } from '@nestjs/common';
import { v4 as uuidv4, validate as isUUID } from 'uuid';
import * as bcrypt from 'bcrypt';
import { IUser } from 'src/interfaces/user.interfaces';

@Injectable()
export class DatabaseService {
  private users: IUser[] = [];

  constructor() {
    this.initializeUsers();
  }

  private initializeUsers() {
    const hashedPassword1 = bcrypt.hashSync('password1', 10);
    const hashedPassword2 = bcrypt.hashSync('password2', 10);

    this.users.push(
      {
        id: uuidv4(),
        login: 'user1',
        password: hashedPassword1,
        version: 1,
        createdAt: Date.now(),
        updatedAt: Date.now(),
      },
      {
        id: uuidv4(),
        login: 'user2',
        password: hashedPassword2,
        version: 1,
        createdAt: Date.now(),
        updatedAt: Date.now(),
      },
    );
  }

  isLoginExists(login: string): boolean {
    return this.users.some((user) => user.login === login);
  }

  getAllUsers(): IUser[] {
    return this.users;
  }

  createUser(login: string, password: string): IUser {
    const newUser: IUser = {
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

  getUserById(id: string): IUser | undefined {
    return isUUID(id) ? this.users.find((user) => user.id === id) : undefined;
  }

  updateUser(
    id: string,
    updatedData: Partial<Omit<IUser, 'id'>>,
  ): IUser | undefined {
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
