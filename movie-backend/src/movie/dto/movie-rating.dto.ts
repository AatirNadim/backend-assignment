import { IsInt, IsNumber, IsString } from "class-validator";

export class MovieRatingDto {
  @IsString()
  movieId: string;

  @IsNumber()
  rating: number;

  @IsInt()
  no_of_ratings: number;
}
