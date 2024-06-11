import {
  BaseEntity,
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  OneToOne,
} from "typeorm";
import { UserRating } from "./user-rating.entity";
import { MovieRating } from "./movie-rating.entity";

@Entity()
export class Movie extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  movieId: string;

  @Column({ type: "varchar", length: 100 })
  title: string;

  @Column({ type: "text", nullable: true })
  description: string;

  @Column({ type: "date", default: new Date() })
  releaseDate: Date;

  @OneToMany(() => UserRating, (userRating) => userRating.movie)
  ratings: UserRating[];

  @OneToOne(() => MovieRating, (movieRating) => movieRating.movie)
  movieSpecificRating: MovieRating;
}
