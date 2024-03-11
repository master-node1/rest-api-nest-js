import { Module } from '@nestjs/common';
import { SearchService } from './search.service';
import { SearchController } from './search.controller';
import { MovieMOdule } from 'src/movies/movie.module';

@Module({
  imports: [MovieMOdule],
  providers: [SearchService],
  controllers: [SearchController],
})
export class SearchModule {}
