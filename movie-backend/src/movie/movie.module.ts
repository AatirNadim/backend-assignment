import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Movie } from "./entities/movie.entity";
import { MovieRating } from "./entities/movie-rating.entity";
import { UserRating } from "./entities/user-rating.entity";
import { MovieGenre } from "./entities/movie-genre.entity";

// import { UserService } from "@/auth/user/user.service";
// import { JwtModule } from "@nestjs/jwt";
// import { ConfigModule, ConfigService } from "@nestjs/config";
import { MovieController } from "./movie.controller";
import { MovieService } from "./movie.service";
import { AuthModule } from "@/auth/auth.module";
import { User } from "@/auth/user/user.entity";

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Movie,
      MovieGenre,
      MovieRating,
      UserRating,
      User,
    ]),
    // JwtModule.registerAsync({
    //   imports: [ConfigModule],
    //   useFactory: async (configService: ConfigService) => ({
    //     secret: configService.get<string>("JWT_SECRET_TOKEN"),
    //     signOptions: {
    //       expiresIn: `${configService.get<string>("JWT_EXPIRATION_SECRET")}`,
    //     },
    //   }),
    //   inject: [ConfigService],
    // }),
    AuthModule,
  ],
  providers: [MovieService],
  controllers: [MovieController],
  exports: [MovieService],
})
export class MovieModule {}
