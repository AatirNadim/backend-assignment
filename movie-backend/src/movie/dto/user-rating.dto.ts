import { IsEnum, IsInt, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class UserRatingDto {
  @ApiProperty({
    example: "9f8199fb-f60e-4840-b8f9-6a6b2a81e5f3",
    description: "The id of the movie",
  })
  @IsString()
  movieId: string;

  @ApiProperty({
    example: "9f8199fb-f60e-4840-b8f9-6a6b2a81e5f3",
    description: "The id of the user",
  })
  @IsString()
  userId: string;

  @ApiProperty({
    example: 4,
    description: "The rating of the movie",
  })
  @IsInt({
    message:
      "Rating should be an integer and in the range of 1 and 5 (included)",
  })
  @IsEnum([1, 2, 3, 4, 5], {
    message: "Rating should be in the range of 1 and 5",
  })
  rating: number;
}
