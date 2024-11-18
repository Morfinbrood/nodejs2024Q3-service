import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { PrismaModule } from '../prisma/prisma.module';
import { UserModule } from './services/user/user.module';
import { TrackModule } from './services/track/track.module';
import { ArtistModule } from './services/artist/artist.module';
import { AlbumModule } from './services/album/album.module';
import { FavoritesModule } from './services/favorites/favorites.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    PrismaModule,
    UserModule,
    TrackModule,
    ArtistModule,
    AlbumModule,
    FavoritesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
