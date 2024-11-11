import { Module } from '@nestjs/common';

import { DatabaseModule } from './database/database.module';
import { UserModule } from './services/user/user.module';
import { TrackModule } from './services/track/track.module';
// import { ArtistModule } from './services/artists/modules/artists.module';
// import { AlbumModule } from './services/albums/modules/albums.module';
// import { FavoritesModule } from './services/favorites/modules/favorites.module';
// import { AuthModule } from './services/auth/modules/auth.module';

@Module({
  imports: [
    DatabaseModule,
    UserModule,
    TrackModule,
    // ArtistModule,
    // AlbumModule,
    // FavoritesModule,
    // AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
