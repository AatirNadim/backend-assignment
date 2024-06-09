import {
  BaseEntity,
  Entity,
  Column,
  OneToOne,
} from "typeorm";

import { Movie } from "./movie.entity";
import { MOVIE_GENRE } from "@/enums/movie-genre.enum";

@Entity()
export class MovieGenre extends BaseEntity {
  @Column({
    type: "enum",
    enum: MOVIE_GENRE,
    default: MOVIE_GENRE.ACTION,
  })
  genre: MOVIE_GENRE;

  @OneToOne(() => Movie, (movie) => movie.movieId)
  movie: Movie;
}
