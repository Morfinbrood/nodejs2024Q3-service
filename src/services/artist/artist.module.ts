import { Module } from '@nestjs/common';
import { ArtistController } from './controllers/artist.controller';
import { ArtistService } from './services/artist.service';
import { PrismaModule } from '../../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [ArtistController],
  providers: [ArtistService],
})
export class ArtistModule {}
