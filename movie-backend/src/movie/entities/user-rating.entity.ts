import { User } from "@/auth/user/user.entity";
import { BaseEntity, Entity, Column, OneToOne, PrimaryColumn } from "typeorm";
import { Movie } from "./movie.entity";
// import { IsInt } from "class-validator";

@Entity()
export class UserRating extends BaseEntity {
  @PrimaryColumn()
  @OneToOne(() => User, (user) => user.id)
  userId: string;

  @PrimaryColumn()
  @OneToOne(() => Movie, (movie) => movie.movieId)
  movieId: string;

  @Column({ type: "int", enum: [1, 2, 3, 4, 5] })
  rating: number;
}
