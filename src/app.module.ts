import { Module } from '@nestjs/common';

import { DatabaseModule } from './shared/database/database.module';
import { UsersModule } from './services/users/users.module';
// import { UsersModule } from './services/users/modules/users.module';
// import { ArtistsModule } from './services/artists/modules/artists.module';
// import { AlbumsModule } from './services/albums/modules/albums.module';
// import { TracksModule } from './services/tracks/modules/tracks.module';
// import { FavoritesModule } from './services/favorites/modules/favorites.module';
// import { AuthModule } from './services/auth/modules/auth.module';

@Module({
  imports: [
    DatabaseModule,
    UsersModule,
    // ArtistsModule,
    // AlbumsModule,
    // TracksModule,
    // FavoritesModule,
    // AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
