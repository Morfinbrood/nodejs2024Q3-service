import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AlbumModule } from './services/album/album.module';
import { ArtistModule } from './services/artist/artist.module';
import { TrackModule } from './services/track/track.module';
import { UserModule } from './services/user/user.module';
import { FavoritesModule } from './services/favorites/favorites.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    PrismaModule,
    AlbumModule,
    ArtistModule,
    TrackModule,
    UserModule,
    FavoritesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
