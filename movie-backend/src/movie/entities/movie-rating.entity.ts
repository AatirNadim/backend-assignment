import {
  BaseEntity,
  Entity,
  Column,
  OneToOne,
} from "typeorm";

import { Movie } from "./movie.entity";
@Entity()
export class MovieRating extends BaseEntity {
  @Column()
  noOfRatings: number;

  @Column()
  avgRating: number;

  @OneToOne(() => Movie, (movie) => movie.movieId)
  movieId: Movie;
}
