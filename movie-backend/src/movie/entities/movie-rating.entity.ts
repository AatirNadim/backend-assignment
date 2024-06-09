import { BaseEntity, Entity, Column, OneToOne, PrimaryColumn } from "typeorm";

import { Movie } from "./movie.entity";
import { IsInt } from "class-validator";
@Entity()
export class MovieRating extends BaseEntity {
  @Column()
  @IsInt()
  noOfRatings: number;

  @Column({ type: "float", scale: 2 })
  avgRating: number;

  @PrimaryColumn()
  @OneToOne(() => Movie, (movie) => movie.movieId)
  movieId: string;
}
