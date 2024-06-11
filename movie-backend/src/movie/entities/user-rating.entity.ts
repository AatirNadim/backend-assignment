import { User } from "@/auth/user/user.entity";
import { BaseEntity, Entity, Column, PrimaryColumn, ManyToOne } from "typeorm";
import { Movie } from "./movie.entity";
// import { IsInt } from "class-validator";

@Entity()
export class UserRating extends BaseEntity {
  @PrimaryColumn()
  userId: string;

  @PrimaryColumn()
  movieId: string;

  @ManyToOne(() => User, (user) => user.ratings, { onDelete: "CASCADE" })
  user: User;

  @ManyToOne(() => Movie, (movie) => movie.ratings, { onDelete: "CASCADE" })
  movie: Movie;

  @Column({ type: "int", enum: [1, 2, 3, 4, 5] })
  rating: number;
}

/**
 * @Entity()
export class UserRating extends BaseEntity {
  @PrimaryColumn()
  userId: string;

  @ManyToOne(() => User, (user) => user.id)
  @JoinColumn({ name: "userId", referencedColumnName: "id" })
  user: User;

  @PrimaryColumn()
  id: string;

  @ManyToOne(() => Movie, (movie) => movie.id)
  @JoinColumn({ name: "id", referencedColumnName: "id" })
  movie: Movie;

  @Column({ type: "int", enum: [1, 2, 3, 4, 5] })
  rating: number;
}

 */
