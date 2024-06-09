import { IsBoolean, IsDate, IsString } from "class-validator";


export class MovieDto {

  movieId: number;
  
  @IsBoolean()
  readonly toSort: boolean;

  @IsString()
  readonly title: string;

  rating: RatingDto;

  @IsString()
  readonly description: string;

  @IsDate()
  readonly releaseDate: Date;

}