import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
// import { BookModule } from './book/book.module';
import { TypeOrmModule } from "@nestjs/typeorm";
import { databaseConfig } from "./config/database.config";
import { envValidationSchema } from "./config/envValidation.config";
import { AuthModule } from "./auth/auth.module";
import { MovieModule } from "./movie/movie.module";

@Module({
  imports: [
    TypeOrmModule.forRootAsync(databaseConfig),
    ConfigModule.forRoot({
      isGlobal: true,
      // envFilePath: [`.env`],
      validationSchema: envValidationSchema,
    }),
    AuthModule,
    MovieModule,
  ],
})
export class AppModule {}
