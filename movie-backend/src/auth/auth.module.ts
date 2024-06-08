import { Module } from "@nestjs/common";
import { AuthService } from "./authSpecific/auth.service";
import { AuthController } from "./authSpecific/auth.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "./user/user.entity";
import { UserService } from "./user/user.service";
import { JwtModule } from "@nestjs/jwt";
import { ConfigModule, ConfigService } from "@nestjs/config";

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>("JWT_SECRET_TOKEN"),
        signOptions: {
          expiresIn: `${configService.get<string>("JWT_EXPIRATION_SECRET")}`,
        },
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [AuthService, UserService],
  controllers: [AuthController],
  exports: [AuthService, UserService],
})
export class AuthModule {}
