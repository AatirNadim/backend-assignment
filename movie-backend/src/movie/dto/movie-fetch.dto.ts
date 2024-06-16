import { MOVIE_GENRE } from "@/enums/movie-genre.enum";
import { ApiProperty } from "@nestjs/swagger";
// import { ArrayNotEmpty, IsArray } from "class-validator";

export class MovieFetchDto {
  @ApiProperty({
    example: [
      "ACTION",
      "COMEDY",
      "DRAMA",
      "FANTASY",
      "HORROR",
      "MYSTERY",
      "ROMANCE",
      "THRILLER",
      "WESTERN",
    ],
    description:
      "The genres to filter the movie, can be left empty to get all movies",
  })
  // @IsArray({ message: "Genres should be an array" })
  // @ArrayNotEmpty({ message: "Genres array should not be empty" })
  genreFilter: MOVIE_GENRE[];

  @ApiProperty({
    example: true,
    description: "Sorts the movies by rating in descending order, if true",
    required: false,
  })
  sortByRating: boolean;
}
