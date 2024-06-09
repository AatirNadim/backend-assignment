import { IsInt, IsString } from "class-validator";

export class UserRatingDto {
  @IsString()
  movieId: string;

  @IsString()
  userId: string;

  @IsInt({
    message:
      "Rating should be an integer and in the range of 1 and 5 (included)",
  })
  rating: number;
}
