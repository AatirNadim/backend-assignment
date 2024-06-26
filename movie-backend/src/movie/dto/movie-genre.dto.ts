import { MOVIE_GENRE } from "@/enums/movie-genre.enum";
import { ArrayNotEmpty, IsArray, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
// import {} from

export class MovieGenreDto {
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
      "The genres of the movie, only the genres in the array given as example are allowed",
  })
  @IsArray({ message: "Genres should be an array" })
  @ArrayNotEmpty({ message: "Genres array should not be empty" })
  genres: MOVIE_GENRE[];

  @ApiProperty({
    example: "9f8199fb-f60e-4840-b8f9-6a6b2a81e5f3",
    description: "The id of the movie",
  })
  @IsString()
  movieId: string;
}
