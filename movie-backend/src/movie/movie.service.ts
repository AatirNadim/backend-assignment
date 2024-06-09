import { Injectable } from "@nestjs/common";
import { UserService } from "@/auth/user/user.service";
import { ConfigService } from "@nestjs/config";




@Injectable()
export class MovieService {

  constructor(
    private readonly userService: UserService,
    private readonly configService: ConfigService
  ) {}
  async getMovies() {
    return "All movies";
  }

  createMovie() {
    return "Create movie";
  }
}
