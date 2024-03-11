import { Controller, Get, Query } from '@nestjs/common';
import { SearchService } from './search.service';
import { Public } from 'src/public.decorator';

@Controller('search')
export class SearchController {
  constructor(private searchService: SearchService) {}

  @Public()
  @Get()
  async searchMovies(@Query('q') searchKey: string) {
    return await this.searchService.searchMovies(searchKey);
  }
}
