import { Body, Controller, Get, Post, Logger, Res } from "@nestjs/common";
import { MovieService } from "./movie.service";
import { MovieDto } from "./dto/movie.dto";
import { Movie } from "./entities/movie.entity";
// import { MOVIE_GENRE } from "@/enums/movie-genre.enum";
// import { MovieRatingDto } from "./dto/movie-rating.dto";
import { MovieGenreDto } from "./dto/movie-genre.dto";
import { Response } from "express";
import { UserRatingDto } from "./dto/user-rating.dto";
import { MOVIE_GENRE } from "@/enums/movie-genre.enum";
import { ApiTags, ApiExtraModels } from "@nestjs/swagger";
import { MovieRatingDto } from "./dto/movie-rating.dto";
import { ApiResponse, ApiBody } from "@nestjs/swagger";
import { MovieFetchDto } from "./dto/movie-fetch.dto";

type MovieWrapper = Movie & {
  genres: MOVIE_GENRE[];
  rating: { avgRating: number; noOfRatings: number };
};

// type FetchMovieReq = { genreFilter?: MOVIE_GENRE[]; sortByRating: boolean };
@ApiExtraModels(MovieDto, MovieGenreDto, UserRatingDto, MovieRatingDto)
@ApiTags("movies")
@Controller("movies")
export class MovieController {
  private readonly logger = new Logger(MovieController.name);
  constructor(private readonly movieService: MovieService) {}
  @Get()
  // @ApiBody({ schema: FetchMovieReq, description: "The movie to be fetched" })
  @ApiResponse({
    status: 200,
    description: "Movies fetched",
  })
  @ApiResponse({ status: 500, description: "Error fetching movies" })
  @ApiBody({ type: MovieFetchDto, description: "The movie to be fetched" })
  async getMovies(
    @Body()
    { genreFilter = [], sortByRating = false }: MovieFetchDto,
    @Res() response: Response,
  ) {
    try {
      let movies: any[] = await this.movieService.getMovies();
      const promiseArr = movies.map(async (movie: MovieWrapper) => {
        movie.genres = await this.movieService.getGenres(movie.id);
        movie.rating = await this.movieService.getRating(movie.id);
      });
      await Promise.all(promiseArr);
      this.logger.log(`Genrefilters : ${JSON.stringify(genreFilter)}`);
      if (genreFilter && genreFilter.length > 0) {
        movies = movies.filter((movie: MovieWrapper) =>
          movie.genres.some((genre) => genreFilter.includes(genre)),
        );

        this.logger.log(`Movies filtered : ${JSON.stringify(movies)}`);
        // return response.status(200).json({ movies: filteredMovies });
      }
      if (sortByRating) {
        movies = movies.sort(
          (a: MovieWrapper, b: MovieWrapper) =>
            b.rating.avgRating - a.rating.avgRating,
        );
      }

      this.logger.log(`Movies fetched : ${JSON.stringify(movies)}`);
      return response.status(200).json({ movies });
    } catch (err) {
      this.logger.error(err);
      return response.status(500).json({
        message: "Error fetching movies",
        error: err.message,
      });
    }
  }

  @Post("add")
  @ApiResponse({ status: 200, description: "Movie created" })
  @ApiResponse({ status: 500, description: "Error creating movie" })
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

      await this.movieService.createGenreEntry(movie.id, genres);
      this.logger.log(`Movie genre entry created : ${movie}`);

      await this.movieService.createRatingEntry(movie.id);
      this.logger.log(`Movie rating entry created : ${movie}`);

      return response.status(200).json({ message: "Movie created", movie });
    } catch (err) {
      this.logger.error(err);
      return response.status(500).send({
        message: "Error creating movie",
        error: err.message,
      });
    }
  }

  @Post("rate")
  @ApiBody({
    type: UserRatingDto,
    description: "The rating to be given by the user",
  })
  @ApiResponse({ status: 200, description: "Movie rated" })
  @ApiResponse({ status: 500, description: "Error rating movie" })
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
      return response
        .status(200)
        .json({ message: "Movie rated", newRating: rateResp });
    } catch (err) {
      this.logger.error(err);
      return response.status(500).json({
        message: "Error rating movie",
        error: err.message,
      });
    }
  }
}
