import { Body, Controller, Get, Post, Logger, Res } from "@nestjs/common";
import { MovieService } from "./movie.service";
import { MovieDto } from "./dto/movie.dto";
import { Movie } from "./entities/movie.entity";
// import { MOVIE_GENRE } from "@/enums/movie-genre.enum";
// import { MovieRatingDto } from "./dto/movie-rating.dto";
import { MovieGenreDto } from "./dto/movie-genre.dto";
import { Response } from "express";
import { UserRatingDto } from "./dto/user-rating.dto";

@Controller("movies")
export class MovieController {
  private readonly logger = new Logger(MovieController.name);
  constructor(private readonly movieService: MovieService) {}
  @Get()
  async getMovies(@Res() response: Response) {
    try {
      const movies = await this.movieService.getMovies();
      this.logger.log(`Movies fetched : ${movies}`);
      return movies;
    } catch (err) {
      this.logger.error(err);
      return response.status(500).json({
        message: "Error fetching movies",
        error: err.message,
      });
    }
  }

  @Post("add")
  async createMovie(
    @Body()
    {
      title,
      description,
      releaseDate = new Date(),
      genres,
    }: Pick<MovieDto, "title" | "description" | "releaseDate"> &
      Pick<MovieGenreDto, "genres">,
    @Res() response: Response,
  ) {
    try {
      this.logger.log(
        `Creating movie with title: ${title}, release Date: ${releaseDate}`,
      );
      const movie: Movie = await this.movieService.createMovie({
        description,
        releaseDate,
        title,
      });

      await this.movieService.createGenreEntry(movie.movieId, genres);
      this.logger.log(`Movie genre entry created : ${movie}`);

      await this.movieService.createRatingEntry(movie.movieId);
      this.logger.log(`Movie rating entry created : ${movie}`);

      return response.status(201).json({ message: "Movie created", movie });
    } catch (err) {
      this.logger.error(err);
      return response.status(500).send({
        message: "Error creating movie",
        error: err.message,
      });
    }
  }

  @Post("rate")
  async rateMovie(
    @Body()
    { userId, movieId, rating }: UserRatingDto,
    @Res() response: Response,
  ) {
    try {
      const rateResp = await this.movieService.rateMovie({
        userId,
        movieId,
        rating,
      });
      return response.status(201).json({ message: "Movie rated", rateResp });
    } catch (err) {
      this.logger.error(err);
      return response.status(500).json({
        message: "Error rating movie",
        error: err.message,
      });
    }
  }
}
