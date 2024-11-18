import { Module } from '@nestjs/common';
import { AlbumService } from './services/album.service';
import { AlbumController } from './controllers/album.controller';
import { DatabaseModule } from '../../database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [AlbumController],
  providers: [AlbumService],
  exports: [AlbumService],
})
export class AlbumModule {}
