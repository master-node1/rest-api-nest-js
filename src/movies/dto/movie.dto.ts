import { IsString, IsNotEmpty, IsUrl, Matches } from 'class-validator';

export class CreateMovieDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  genre: string;

  @IsNotEmpty()
  // You can adjust the regex pattern based on the rating format you expect
  // This example assumes a simple 1-5 rating as an example
  @Matches(/^\d+$/, { message: 'rating must be a numeric string' })
  rating: string;

  @IsNotEmpty()
  @IsUrl({}, { message: 'streaming_link must be a valid URL' })
  streaming_link: string;
}

export class MutateMovieDto {
  @IsString()
  title: string;

  @IsString()
  genre: string;

  // You can adjust the regex pattern based on the rating format you expect
  // This example assumes a simple 1-5 rating as an example
  @Matches(/^\d+$/, { message: 'rating must be a numeric string' })
  rating: string;

  @IsUrl({}, { message: 'streaming_link must be a valid URL' })
  streaming_link: string;
}
