import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  // OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";

import { Length } from "class-validator";
import { UserRating } from "@/movie/entities/user-rating.entity";

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ type: "varchar", length: 100, unique: true })
  @Length(4, 100)
  email: string;

  @Column({ type: "varchar", length: 100 })
  @Length(4, 100)
  password: string;

  @OneToMany(() => UserRating, (userRating) => userRating.user)
  ratings: UserRating[];
}
