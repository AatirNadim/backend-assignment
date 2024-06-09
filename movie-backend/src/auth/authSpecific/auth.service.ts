import { BadRequestException, Injectable, Logger } from "@nestjs/common";
import { UserService } from "../user/user.service";
import { CreateUserDto } from "../user/dto/create-user.dto";
import { LoginUserDto } from "../user/dto/login-user.dto";
import { User } from "../user/user.entity";
import { JwtService } from "@nestjs/jwt";

import * as bcrypt from "bcrypt";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class AuthService {
  // ...

  private readonly logger = new Logger(AuthService.name);
  constructor(
    private readonly configService: ConfigService,
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async register(
    user: Pick<CreateUserDto, "email" | "password">,
  ): Promise<User> {
    return this.userService.createOne(user);
  }

  async login({ email, password }: LoginUserDto): Promise<User> {
    try {
      const user = await this.userService.findOne({ email });
      if (!user) {
        throw new BadRequestException("No user found with this email");
      }
      const validPassword = await bcrypt.compare(password, user.password);
      if (!validPassword) {
        throw new BadRequestException("Invalid password");
      }
      return user;
    } catch (err) {
      this.logger.log(JSON.stringify(err));
      throw err;
    }
  }

  generateTokens(payload: any): [token: string] {
    try {
      const token: string = this.jwtService.sign({ user_id: payload.id });
      return [token];
    } catch (err) {
      this.logger.error(err);
      throw err;
    }
  }

  setAuthTokens(res, payload: any): { accessToken: string } {
    try {
      const [accessToken] = this.generateTokens(payload);
      // this.logger.log(
      //   `Setting auth token: ${accessToken}, expires in ${this.configService.get("JWT_EXPIRATION_SECRET")} seconds`,
      // );
      res.cookie("access_token", accessToken, {
        httpOnly: true,
        // domain: this.configService.get("DOMAIN"),
        expires: new Date(
          Date.now() + this.configService.get("JWT_EXPIRATION_SECRET") * 1000,
        ),
      });
      return { accessToken };
    } catch (err) {
      this.logger.error(err);
      throw err;
    }
  }

  clearAuthTokens(res): void {
    res.clearCookie("access_token", {
      // domain: this.configService.get("DOMAIN"),
      httpOnly: true,
    });
  }
}
