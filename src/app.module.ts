import { Module } from '@nestjs/common';

import { DatabaseModule } from './database/database.module';
import { UserModule } from './services/user/user.module';
import { TrackModule } from './services/track/track.module';
import { ArtistModule } from './services/artist/artist.module';
import { AlbumModule } from './services/album/album.module';
import { FavoritesModule } from './services/favorites/favorites.module';
// import { AuthModule } from './services/auth/modules/auth.module';

@Module({
  imports: [
    DatabaseModule,
    UserModule,
    TrackModule,
    ArtistModule,
    AlbumModule,
    FavoritesModule,
    // AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
