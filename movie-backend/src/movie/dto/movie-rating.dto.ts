import { IsInt, IsNumber } from "class-validator";

export class MovieRatingDto {
  @IsNumber()
  movieId: string;

  @IsNumber()
  rating: number;

  @IsInt()
  no_of_ratings: number;
}
