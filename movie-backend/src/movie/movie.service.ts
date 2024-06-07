import { Injectable } from "@nestjs/common";

@Injectable()
export class MovieService {
  
  async getMovies() {
    return "All movies";
  }

  createMovie() {
    return "Create movie";
  }
}