import { Module } from '@nestjs/common';
import { MovieService } from './movie.service';
import { MovieController } from './movie.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Media, MediaSchema } from './models/media.models';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Media.name, schema: MediaSchema }]),
  ],
  providers: [MovieService],
  controllers: [MovieController],
  exports: [
    MongooseModule.forFeature([{ name: Media.name, schema: MediaSchema }]),
  ],
})
export class MovieMOdule {}
