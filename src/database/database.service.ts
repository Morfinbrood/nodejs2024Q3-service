import { Injectable } from '@nestjs/common';
import { v4 as uuidv4, validate as isUUID } from 'uuid';
import * as bcrypt from 'bcrypt';
import { IUser } from 'src/interfaces/user.interfaces';
import { ITrack } from 'src/interfaces/track.interfaces';
import { UpdateTrackDto } from 'src/services/tracks/dto/update-track.dto';

@Injectable()
export class DatabaseService {
  private users: IUser[] = [];
  private tracks: ITrack[] = [];

  constructor() {
    this.initializeUsers();
    this.initializeTracks();
  }

  // Initialize hardcoded users
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

  // Initialize hardcoded tracks
  private initializeTracks() {
    this.tracks.push(
      {
        id: uuidv4(),
        name: 'Track 1',
        artistId: uuidv4(),
        albumId: uuidv4(),
        duration: 240,
      },
      {
        id: uuidv4(),
        name: 'Track 2',
        artistId: uuidv4(),
        albumId: uuidv4(),
        duration: 180,
      },
    );
  }

  // User Methods
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

  // Track Methods
  getAllTracks(): ITrack[] {
    return this.tracks;
  }

  getTrackById(id: string): ITrack | undefined {
    return isUUID(id) ? this.tracks.find((track) => track.id === id) : undefined;
  }

  createTrack(trackData: Omit<ITrack, 'id'>): ITrack {
    const newTrack: ITrack = {
      id: uuidv4(),
      ...trackData,
    };
    this.tracks.push(newTrack);
    return newTrack;
  }

  updateTrack(id: string, updatedData: UpdateTrackDto): ITrack | undefined {
    const track = this.getTrackById(id);
    if (track) {
      Object.assign(track, updatedData);
      return track;
    }
    return undefined;
  }

  deleteTrack(id: string): boolean {
    const index = this.tracks.findIndex((track) => track.id === id);
    if (index !== -1) {
      this.tracks.splice(index, 1);
      return true;
    }
    return false;
  }
}
