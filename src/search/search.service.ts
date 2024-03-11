import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Media } from 'src/movies/models/media.models';

@Injectable()
export class SearchService {
  constructor(@InjectModel(Media.name) private mediaModel: Model<Media>) {}

  async searchMovies(searchKey: string, page: number = 1, limit: number = 9) {
    const skip = page * limit - limit;
    const filterOptions = {
      $or: [
        { title: { $regex: searchKey, $options: 'i' } },
        { genre: { $regex: searchKey, $options: 'i' } },
      ],
    };
    return await this.mediaModel.find(filterOptions).skip(skip).limit(limit);
  }
}
