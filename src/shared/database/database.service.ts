import { Injectable } from '@nestjs/common';

interface User {
  id: number;
  name: string;
  email: string;
}

@Injectable()
export class DatabaseService {
  private users: User[] = [];
  private currentId = 1;

  getAllUsers(): User[] {
    return this.users;
  }

  createUser(name: string, email: string): User {
    const newUser: User = {
      id: this.currentId++,
      name,
      email,
    };
    this.users.push(newUser);
    return newUser;
  }

  getUserById(id: number): User | undefined {
    return this.users.find((user) => user.id === id);
  }

  updateUser(
    id: number,
    updatedData: Partial<Omit<User, 'id'>>,
  ): User | undefined {
    const user = this.getUserById(id);
    if (user) {
      Object.assign(user, updatedData);
    }
    return user;
  }

  deleteUser(id: number): boolean {
    const index = this.users.findIndex((user) => user.id === id);
    if (index !== -1) {
      this.users.splice(index, 1);
      return true;
    }
    return false;
  }
}
