import { Injectable, Logger, NotFoundException } from "@nestjs/common";
import { UserService } from "@/auth/user/user.service";
import { ConfigService } from "@nestjs/config";
import { Movie } from "./entities/movie.entity";
// import { User } from "@/auth/user/user.entity";
import { MovieRating } from "./entities/movie-rating.entity";
import { MovieGenre } from "./entities/movie-genre.entity";
import { UserRating } from "./entities/user-rating.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { MovieDto } from "./dto/movie.dto";
import { User } from "@/auth/user/user.entity";
import { MOVIE_GENRE } from "@/enums/movie-genre.enum";
import { UserRatingDto } from "./dto/user-rating.dto";

@Injectable()
export class MovieService {
  private readonly logger = new Logger(MovieService.name);
  constructor(
    @InjectRepository(Movie)
    private readonly movieRepository: Repository<Movie>,

    @InjectRepository(MovieRating)
    private readonly movieRatingRepository: Repository<MovieRating>,

    @InjectRepository(User)
    private readonly userRepository: Repository<User>,

    @InjectRepository(MovieGenre)
    private readonly movieGenreRepository: Repository<MovieGenre>,

    @InjectRepository(UserRating)
    private readonly userRatingRepository: Repository<UserRating>,
    private readonly userService: UserService,
    private readonly configService: ConfigService,
  ) {}

  async getMovies() {
    try {
      this.logger.log("Fetching movies");
      const movies = await this.movieRepository.find();
      return movies;
    } catch (err) {
      this.logger.error(err);
      throw err;
    }
  }

  async createMovie(
    movieObj: Pick<MovieDto, "title" | "description" | "releaseDate">,
  ) {
    try {
      const exists = await this.movieRepository.findOne({
        where: { title: movieObj.title, releaseDate: movieObj.releaseDate },
      });

      if (exists) {
        throw new Error("Movie already exists");
      }

      const movie: Movie = await this.movieRepository.save({
        title: movieObj.title,
        description: movieObj.description,
        releaseDate: movieObj.releaseDate,
      });
      return movie;
    } catch (err) {
      this.logger.error(err);
      throw err;
    }
  }

  async createGenreEntry(id: string, genres: MOVIE_GENRE[]) {
    try {
      this.movieGenreRepository.save({ movieId: id, genres });
    } catch (err) {
      this.logger.error(err);
      throw err;
    }
  }

  async getGenres(id: string) {
    try {
      const genres = await this.movieGenreRepository.findOne({
        where: { movieId: id },
      });
      return genres.genres;
    } catch (err) {
      this.logger.error(err);
      throw err;
    }
  }

  async createRatingEntry(id: string) {
    try {
      await this.movieRatingRepository.save({
        movieId: id,
        avgRating: 0,
        noOfRatings: 0,
      });
      // return movieRating;
    } catch (err) {
      this.logger.error(err);
      throw err;
    }
  }

  async getRating(id: string) {
    try {
      const rating = await this.movieRatingRepository.findOne({
        where: { movieId: id },
      });
      return { avgRating: rating.avgRating, noOfRatings: rating.noOfRatings };
    } catch (err) {
      this.logger.error(err);
      throw err;
    }
  }

  async rateMovie({ userId, movieId, rating }: UserRatingDto) {
    try {
      const user = await this.userRepository.findOne({
        where: { id: userId },
      });
      const movie = await this.movieRepository.findOne({
        where: { id: movieId },
      });
      if (!user || !movie) {
        throw new NotFoundException("User or movie not found");
      }
      const prevUserRating = await this.userRatingRepository.findOne({
        where: { userId, movieId },
      });
      this.logger.log(`Prev user rating: ${JSON.stringify(prevUserRating)}`);

      const currRatingState = await this.movieRatingRepository.findOne({
        where: { movieId },
      });
      this.logger.log(`Curr rating state: ${JSON.stringify(currRatingState)}`);

      let avg = currRatingState.avgRating;
      let noOfRatings = currRatingState.noOfRatings;
      if (prevUserRating) {
        currRatingState.avgRating =
          (currRatingState.avgRating * currRatingState.noOfRatings -
            prevUserRating.rating +
            rating) /
          currRatingState.noOfRatings;
        prevUserRating.rating = rating;
        await this.userRatingRepository.save(prevUserRating);
        await this.movieRatingRepository.save(currRatingState);
      } else {
        this.logger.log(
          `Avg movie rating: ${avg}, No of ratings: ${noOfRatings}, user rating: ${rating}`,
        );
        avg = (avg * noOfRatings + rating) / (noOfRatings + 1);
        noOfRatings += 1;
        this.logger.log(
          `Avg movie rating has been stored --> ${JSON.stringify({ avg, noOfRatings })}`,
        );
        this.logger.log(`Avg rating state has been updated`);
        await this.movieRatingRepository.save({
          movieId,
          avgRating: avg,
          noOfRatings: noOfRatings,
        });
        currRatingState.avgRating = avg;
        currRatingState.noOfRatings = noOfRatings;
        this.logger.log(`Movie rating has been stored/updated`);
        await this.userRatingRepository.save({
          userId,
          movieId,
          rating,
          movie,
          user,
        });
        this.logger.log(`User rating has been stored`);
      }
      this.logger.log(`New rating state: ${JSON.stringify(currRatingState)}`);

      return { movieId, newRating: currRatingState.avgRating };
    } catch (err) {
      this.logger.error(err);
      throw err;
    }
  }
}
