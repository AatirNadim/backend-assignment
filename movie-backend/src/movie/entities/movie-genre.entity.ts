import { BaseEntity, Entity, Column, OneToOne, PrimaryColumn } from "typeorm";

import { Movie } from "./movie.entity";
import { MOVIE_GENRE } from "@/enums/movie-genre.enum";
import { ArrayNotEmpty } from "class-validator";

@Entity()
export class MovieGenre extends BaseEntity {
  @ArrayNotEmpty()
  @Column({
    type: "enum",
    array: true,
    enum: MOVIE_GENRE,
  })
  genres: MOVIE_GENRE[];

  @PrimaryColumn()
  @OneToOne(() => Movie, (movie) => movie.id)
  movieId: string;
}
