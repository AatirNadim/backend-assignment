import { Controller, Get, Post } from "@nestjs/common";
import { MovieService } from "./movie.service";

@Controller("movie")
export class MovieController {
  constructor(private readonly movieService: MovieService) {}

  @Get()
  getMovies() {
    this.movieService.getMovies();
    return "All movies";
  }

  @Post()
  createMovie() {
    return "Create movie";
  }
}