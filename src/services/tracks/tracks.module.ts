import { Module } from '@nestjs/common';
import { DatabaseModule } from '../../database/database.module';
import { TracksController } from './controllers/tracks.controller';
import { TracksService } from './services/tracks.service';

@Module({
  imports: [DatabaseModule],
  controllers: [TracksController],
  providers: [TracksService],
  exports: [TracksService],
})
export class TracksModule {}
