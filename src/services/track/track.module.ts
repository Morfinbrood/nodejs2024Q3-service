import { Module } from '@nestjs/common';
import { DatabaseModule } from '../../database/database.module';
import { TrackController } from './controllers/track.controller';
import { TrackService } from './services/track.service';

@Module({
  imports: [DatabaseModule],
  controllers: [TrackController],
  providers: [TrackService],
  exports: [TrackService],
})
export class TrackModule {}
