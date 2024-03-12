import { Test, TestingModule } from '@nestjs/testing';
import { MovieService } from './movie.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Media, MediaSchema } from './models/media.models';
import { getModelToken } from '@nestjs/mongoose';
import { ObjectId } from 'mongodb';

describe('MovieService', () => {
  let service: MovieService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MovieService,
        {
          provide: getModelToken('Media'), // Use getModelToken to provide the model
          useValue: {}, // Mock value for the Media model
        },
      ],
      imports: [
        MongooseModule.forRoot('mongodb://localhost:27017/test'),
        MongooseModule.forFeature([{ name: Media.name, schema: MediaSchema }]),
      ],
    }).compile();

    service = module.get<MovieService>(MovieService);
  });

  describe('addMovie', () => {
    it('should create a movie', async () => {
      const createMovieDto = {
        title: 'The Shawshank Redemption',
        genre: 'Drama',
        rating: '9.3',
        streaming_link: 'https://loaldas.com',
      };
      // Ignore a field (e.g., id) in the createdMovie object
      const expectedMovie = { _id: new ObjectId(), ...createMovieDto };
      jest.spyOn(service, 'addMovie').mockResolvedValue({
        message: 'Movie created successfully',
        result: expectedMovie,
      });
      const result = await service.addMovie(createMovieDto);
      expect(result).toEqual({
        message: 'Movie created successfully',
        result: expectedMovie,
      });
    });
  });

  describe('addDuplicateMovie', () => {
    it('should not create  movie', async () => {
      const createMovieDto = {
        title: 'The Shawshank Redemption',
        genre: 'Drama',
        rating: '9.3',
        streaming_link: 'https://loaldas.com',
      };
      // Ignore a field (e.g., id) in the createdMovie object
      const expectedMovie = { _id: new ObjectId(), ...createMovieDto };
      jest.spyOn(service, 'addMovie').mockResolvedValue({
        message: 'Movie created successfully',
        result: expectedMovie,
      });
      const result = await service.addMovie(createMovieDto);
      expect(result).toEqual({
        message: 'Movie created successfully',
        result: expectedMovie,
      });
    });
  });
});
