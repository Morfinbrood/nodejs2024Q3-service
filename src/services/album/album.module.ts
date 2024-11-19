import { Module } from '@nestjs/common';
import { AlbumController } from './controllers/album.controller';
import { AlbumService } from './services/album.service';
import { PrismaModule } from '../../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [AlbumController],
  providers: [AlbumService],
})
export class AlbumModule {}
