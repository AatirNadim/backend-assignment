import { MOVIE_GENRE } from "@/enums/movie-genre.enum";
import { ArrayNotEmpty, IsArray, IsString } from "class-validator";
// import {} from

export class MovieGenreDto {
  @IsArray({ message: "Genres should be an array" })
  @ArrayNotEmpty({ message: "Genres array should not be empty" })
  genres: MOVIE_GENRE[];

  @IsString()
  movieId: string;
}
