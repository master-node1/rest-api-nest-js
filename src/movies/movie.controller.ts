import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  InternalServerErrorException,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { MovieService } from './movie.service';
import { CreateMovieDto, MutateMovieDto } from './dto/movie.dto';
import mongoose from 'mongoose';
import { Public } from 'src/public.decorator';

@Controller('movies')
export class MovieController {
  constructor(private movieService: MovieService) {}

  @Public()
  @Get()
  async getAllMovies() {
    const result = await this.movieService.getAllMovies();
    return result;
  }

  @Post()
  async addMovie(@Body() data: CreateMovieDto) {
    try {
      const result = await this.movieService.addMovie(data);
      return result;
    } catch (error) {
      switch (error) {
        case 'error_title_must_be_unique':
          throw new BadRequestException(error);
        default:
          throw new InternalServerErrorException(error);
      }
    }
  }

  @Put('/:id')
  async updateMovieInfo(
    @Param('id') id: mongoose.Schema.Types.ObjectId,
    @Body() data: MutateMovieDto,
  ) {
    try {
      const result = await this.movieService.updateMovieInfo(id, data);
      return result;
    } catch (error) {
      switch (error) {
        case 'error_title_must_be_unique':
          throw new BadRequestException(error);
        default:
          throw new InternalServerErrorException(error);
      }
    }
  }

  @Delete('/:id')
  async deleteMovie(@Param('id') id: mongoose.Schema.Types.ObjectId) {
    try {
      const result = await this.movieService.deleteMovie(id);
      return result;
    } catch (error) {
      switch (error) {
        case 'error_movie_details_not_found':
          throw new BadRequestException(error);
        default:
          throw new InternalServerErrorException(error);
      }
    }
  }
}
