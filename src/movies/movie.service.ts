import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Media } from './models/media.models';
import { Model } from 'mongoose';

@Injectable()
export class MovieService {
  constructor(@InjectModel(Media.name) private mediaModel: Model<Media>) {}

  async getAllMovies() {
    return await this.mediaModel.find();
  }

  async addMovie(data) {
    const result = await this.mediaModel.create(data);
    return {
      message: 'movie_created_successfully',
      result,
    };
  }

  async updateMovieInfo(id, data) {
    await this.mediaModel.updateOne({ _id: id }, data);
    return {
      message: 'movie_updated_successfully',
      data,
      id,
    };
  }

  async deleteMovie(id) {
    const { deletedCount } = await this.mediaModel.deleteOne({ _id: id });
    if (deletedCount) {
      return {
        message: 'movie_deleted_successfully',
        id,
      };
    } else {
      throw 'error_movie_details_not_found';
    }
  }
}
