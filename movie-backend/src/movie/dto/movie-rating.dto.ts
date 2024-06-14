import { IsInt, IsNumber, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class MovieRatingDto {
  @ApiProperty({
    example: "9f8199fb-f60e-4840-b8f9-6a6b2a81e5f3",
    description: "The id of the movie",
  })
  @IsString()
  movieId: string;

  @ApiProperty({
    example: 4,
    description: "The rating of the movie",
  })
  @IsNumber()
  rating: number;

  @ApiProperty({
    example: 4,
    description: "The number of ratings the movie has",
  })
  @IsInt()
  no_of_ratings: number;
}
