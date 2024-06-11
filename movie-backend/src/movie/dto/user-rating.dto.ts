import { IsEnum, IsInt, IsString } from "class-validator";

export class UserRatingDto {
  @IsString()
  movieId: string;

  @IsString()
  userId: string;

  @IsInt({
    message:
      "Rating should be an integer and in the range of 1 and 5 (included)",
  })
  @IsEnum([1, 2, 3, 4, 5], {
    message: "Rating should be in the range of 1 and 5",
  })
  rating: number;
}
