import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { INestApplication, ValidationPipe } from "@nestjs/common";
import { DatabaseExceptionFilter } from "./filters/database-exception.filter";
import * as cookieParser from "cookie-parser";
import { ConfigService } from "@nestjs/config";
import { SwaggerModule, DocumentBuilder } from "@nestjs/swagger";

async function bootstrap() {
  const app: INestApplication = await NestFactory.create(AppModule, {
    cors: true,
    logger: ["debug", "error", "log", "verbose", "warn"],
  });
  // const app: INestApplication = await NestFactory.create(AppModule);
  app.use(cookieParser());
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(new DatabaseExceptionFilter());
  const configService = app.get(ConfigService);
  const port = configService.get<number>("PORT") || 3001;

  const swaggerConfig = new DocumentBuilder()
    .setTitle("Movie-Backend API")
    .setDescription("The Movie-Backend API description")
    .setVersion("1.0")
    .build();

  const swaggerDoc = SwaggerModule.createDocument(app, swaggerConfig);

  SwaggerModule.setup("api-docs", app, swaggerDoc);

  await app.listen(port);
}
bootstrap();
