import { IUser } from 'src/interfaces/user.interface';

export class User implements IUser {
  id: string;
  login: string;
  password: string;
  version: number;
  createdAt: number;
  updatedAt: number;
}
