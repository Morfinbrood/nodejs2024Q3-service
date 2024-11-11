import { Injectable } from '@nestjs/common';
import { v4 as uuidv4, validate as isUUID } from 'uuid';
import * as bcrypt from 'bcrypt';
import { IUser } from 'src/interfaces/user.interfaces';
import { ICreateTrack, ITrack, IUpdateTrack } from 'src/interfaces/track.interfaces';
import { IAlbum } from 'src/interfaces/album.interfaces';
import { IArtist } from 'src/interfaces/artist.interfaces';

@Injectable()
export class DatabaseService {
  private users: IUser[] = [];
  private tracks: ITrack[] = [];
  private albums: IAlbum[] = [];
  private artists: IArtist[] = [];

  constructor() {
    this.initializeUsers();
    this.initializeTracks();
    this.initializeAlbums();
    this.initializeArtists();
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

  // Initialize hardcoded albums
  private initializeAlbums() {
    this.albums.push(
      {
        id: uuidv4(),
        name: 'Album 1',
        year: 2021,
        artistId: uuidv4(),
      },
      {
        id: uuidv4(),
        name: 'Album 2',
        year: 2022,
        artistId: uuidv4(),
      },
    );
  }

  // Initialize hardcoded artists
  private initializeArtists() {
    this.artists.push(
      {
        id: uuidv4(),
        name: 'Artist 1',
        grammy: true,
      },
      {
        id: uuidv4(),
        name: 'Artist 2',
        grammy: false,
      },
    );
  }

  // User Methods
  isUserExists(login: string): boolean {
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

  updateUser(id: string, updatedData: Partial<Omit<IUser, 'id'>>): IUser | undefined {
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
  isTrackExists(trackName: string): boolean {
    return this.tracks.some((track) => track.name === trackName);
  }

  getAllTracks(): ITrack[] {
    return this.tracks;
  }

  getTrackById(id: string): ITrack | undefined {
    return isUUID(id) ? this.tracks.find((track) => track.id === id) : undefined;
  }

  createTrack(trackData: ICreateTrack): ITrack {
    const newTrack: ITrack = {
      id: uuidv4(),
      name: trackData.name,
      artistId: trackData.artistId ?? null,
      albumId: trackData.albumId ?? null,
      duration: trackData.duration,
    };
    this.tracks.push(newTrack);
    return newTrack;
  }

  updateTrack(id: string, updatedData: IUpdateTrack): ITrack | undefined {
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

  // Album Methods
  getAllAlbums(): IAlbum[] {
    return this.albums;
  }

  getAlbumById(id: string): IAlbum | undefined {
    return isUUID(id) ? this.albums.find((album) => album.id === id) : undefined;
  }

  createAlbum(albumData: Omit<IAlbum, 'id'>): IAlbum {
    const newAlbum: IAlbum = {
      id: uuidv4(),
      ...albumData,
    };
    this.albums.push(newAlbum);
    return newAlbum;
  }

  updateAlbum(id: string, updatedData: Partial<IAlbum>): IAlbum | undefined {
    const album = this.getAlbumById(id);
    if (album) {
      Object.assign(album, updatedData);
      return album;
    }
    return undefined;
  }

  deleteAlbum(id: string): boolean {
    const index = this.albums.findIndex((album) => album.id === id);
    if (index !== -1) {
      this.albums.splice(index, 1);
      return true;
    }
    return false;
  }

  // Artist Methods
  getAllArtists(): IArtist[] {
    return this.artists;
  }

  getArtistById(id: string): IArtist | undefined {
    return isUUID(id) ? this.artists.find((artist) => artist.id === id) : undefined;
  }

  createArtist(artistData: Omit<IArtist, 'id'>): IArtist {
    const newArtist: IArtist = {
      id: uuidv4(),
      ...artistData,
    };
    this.artists.push(newArtist);
    return newArtist;
  }

  updateArtist(id: string, updatedData: Partial<IArtist>): IArtist | undefined {
    const artist = this.getArtistById(id);
    if (artist) {
      Object.assign(artist, updatedData);
      return artist;
    }
    return undefined;
  }

  deleteArtist(id: string): boolean {
    const index = this.artists.findIndex((artist) => artist.id === id);
    if (index !== -1) {
      this.artists.splice(index, 1);
      return true;
    }
    return false;
  }
}
