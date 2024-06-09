import { BaseEntity, Entity, Column, PrimaryGeneratedColumn } from "typeorm";

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
}
