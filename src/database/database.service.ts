import { Injectable, NotFoundException } from '@nestjs/common';
import { v4 as uuidv4, validate as isUUID } from 'uuid';
import * as bcrypt from 'bcrypt';

import { IUser } from '../interfaces/user.interfaces';
import {
  ITrack,
  ICreateTrack,
  IUpdateTrack,
} from '../interfaces/track.interfaces';
import {
  IAlbum,
  ICreateAlbum,
  IUpdateAlbum,
} from '../interfaces/album.interfaces';
import {
  IArtist,
  ICreateArtist,
  IUpdateArtist,
} from '../interfaces/artist.interfaces';
import { IFavorites } from '../interfaces/favorite.interfaces';

@Injectable()
export class DatabaseService {
  private users: IUser[] = [];
  private tracks: ITrack[] = [];
  private albums: IAlbum[] = [];
  private artists: IArtist[] = [];
  private favorites: IFavorites = {
    artists: [],
    albums: [],
    tracks: [],
  };

  private initializedArtists: IArtist[] = [];
  private initializedAlbums: IAlbum[] = [];

  constructor() {
    this.initializeUsers();
    this.initializeArtists();
    this.initializeAlbums();
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

  // Initialize hardcoded artists
  private initializeArtists() {
    const artist1: IArtist = {
      id: uuidv4(),
      name: 'Artist 1',
      grammy: true,
    };
    const artist2: IArtist = {
      id: uuidv4(),
      name: 'Artist 2',
      grammy: false,
    };
    this.artists.push(artist1, artist2);
    this.initializedArtists = [artist1, artist2];
  }

  // Initialize hardcoded albums
  private initializeAlbums() {
    const album1: IAlbum = {
      id: uuidv4(),
      name: 'Album 1',
      year: 2021,
      artistId: this.initializedArtists[0].id,
    };
    const album2: IAlbum = {
      id: uuidv4(),
      name: 'Album 2',
      year: 2022,
      artistId: this.initializedArtists[1].id,
    };
    this.albums.push(album1, album2);
    this.initializedAlbums = [album1, album2];
  }

  // Initialize hardcoded tracks
  private initializeTracks() {
    this.tracks.push(
      {
        id: uuidv4(),
        name: 'Track 1',
        artistId: this.initializedArtists[0].id,
        albumId: this.initializedAlbums[0].id,
        duration: 240,
      },
      {
        id: uuidv4(),
        name: 'Track 2',
        artistId: this.initializedArtists[1].id,
        albumId: this.initializedAlbums[1].id,
        duration: 180,
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
    const hashedPassword = bcrypt.hashSync(password, 10);
    const newUser: IUser = {
      id: uuidv4(),
      login,
      password: hashedPassword,
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

  updateUserPassword(id: string, newPassword: string): IUser | undefined {
    const user = this.getUserById(id);
    if (user) {
      const password = bcrypt.hashSync(newPassword, 10);
      Object.assign(user, {
        password,
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

  async validateUserPassword(id: string, password: string): Promise<boolean> {
    const user = this.getUserById(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return await bcrypt.compare(password, user.password);
  }

  // Track Methods
  isTrackExists(trackName: string): boolean {
    return this.tracks.some((track) => track.name === trackName);
  }

  getAllTracks(): ITrack[] {
    return this.tracks;
  }

  getTrackById(id: string): ITrack | undefined {
    return isUUID(id)
      ? this.tracks.find((track) => track.id === id)
      : undefined;
  }

  createTrack(trackData: ICreateTrack): ITrack {
    if (trackData.artistId && !this.getArtistById(trackData.artistId)) {
      throw new NotFoundException('Artist not found');
    }
    if (trackData.albumId && !this.getAlbumById(trackData.albumId)) {
      throw new NotFoundException('Album not found');
    }
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
      if (updatedData.artistId && !this.getArtistById(updatedData.artistId)) {
        throw new NotFoundException('Artist not found');
      }
      if (updatedData.albumId && !this.getAlbumById(updatedData.albumId)) {
        throw new NotFoundException('Album not found');
      }
      Object.assign(track, updatedData);
      return track;
    }
    return undefined;
  }

  deleteTrack(id: string): boolean {
    const index = this.tracks.findIndex((track) => track.id === id);
    if (index !== -1) {
      this.tracks.splice(index, 1);
      this.removeFromFavorites('artists', id);
      return true;
    }
    return false;
  }

  // Album Methods
  getAllAlbums(): IAlbum[] {
    return this.albums;
  }

  getAlbumById(id: string): IAlbum | undefined {
    return isUUID(id)
      ? this.albums.find((album) => album.id === id)
      : undefined;
  }

  createAlbum(albumData: ICreateAlbum): IAlbum {
    if (albumData.artistId && !this.getArtistById(albumData.artistId)) {
      throw new NotFoundException('Artist not found');
    }
    const newAlbum: IAlbum = {
      id: uuidv4(),
      name: albumData.name,
      year: albumData.year,
      artistId: albumData.artistId ?? null,
    };
    this.albums.push(newAlbum);
    return newAlbum;
  }

  updateAlbum(id: string, updatedData: IUpdateAlbum): IAlbum | undefined {
    const album = this.getAlbumById(id);
    if (album) {
      if (updatedData.artistId && !this.getArtistById(updatedData.artistId)) {
        throw new NotFoundException('Artist not found');
      }
      Object.assign(album, updatedData);
      return album;
    }
    return undefined;
  }

  deleteAlbum(id: string): boolean {
    const index = this.albums.findIndex((album) => album.id === id);
    if (index !== -1) {
      this.albums.splice(index, 1);
      this.tracks.forEach((track) => {
        if (track.albumId === id) {
          track.albumId = null;
        }
      });
      this.removeFromFavorites('artists', id);
      return true;
    }
    return false;
  }

  // Artist Methods
  getAllArtists(): IArtist[] {
    return this.artists;
  }

  getArtistById(id: string): IArtist | undefined {
    return isUUID(id)
      ? this.artists.find((artist) => artist.id === id)
      : undefined;
  }

  createArtist(artistData: ICreateArtist): IArtist {
    const newArtist: IArtist = {
      id: uuidv4(),
      name: artistData.name,
      grammy: artistData.grammy,
    };
    this.artists.push(newArtist);
    return newArtist;
  }

  updateArtist(id: string, updatedData: IUpdateArtist): IArtist | undefined {
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
      this.tracks.forEach((track) => {
        if (track.artistId === id) {
          track.artistId = null;
        }
      });
      this.albums.forEach((album) => {
        if (album.artistId === id) {
          album.artistId = null;
        }
      });
      this.removeFromFavorites('artists', id);
      return true;
    }
    return false;
  }

  getFavorites(): IFavorites {
    return this.favorites;
  }

  addToFavorites(type: 'artists' | 'albums' | 'tracks', id: string): void {
    let entityExists = false;

    if (type === 'artists') {
      entityExists = this.getArtistById(id) !== undefined;
    } else if (type === 'albums') {
      entityExists = this.getAlbumById(id) !== undefined;
    } else if (type === 'tracks') {
      entityExists = this.getTrackById(id) !== undefined;
    }

    if (!entityExists) {
      throw new NotFoundException(`${type} with ${id} not found`);
    }

    if (!this.favorites[type].includes(id)) {
      this.favorites[type].push(id);
    }
  }

  removeFromFavorites(
    type: 'artists' | 'albums' | 'tracks',
    id: string,
  ): boolean {
    const index = this.favorites[type].indexOf(id);
    if (index !== -1) {
      this.favorites[type].splice(index, 1);
      return true;
    }
    return false;
  }
}
