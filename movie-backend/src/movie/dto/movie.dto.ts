import { IsDate, IsOptional, IsString } from "class-validator";

export class MovieDto {
  @IsString()
  movieId: string;

  @IsString()
  readonly title: string;

  @IsString()
  readonly description: string;

  @IsDate({ message: "Release date should be a valid date" })
  @IsOptional()
  readonly releaseDate: Date;
}
