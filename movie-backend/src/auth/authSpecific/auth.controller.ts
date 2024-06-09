import {
  Body,
  Controller,
  Get,
  Post,
  HttpCode,
  HttpStatus,
  Res,
  Logger,
} from "@nestjs/common";
import { AuthService } from "./auth.service";
import { CreateUserDto } from "../user/dto/create-user.dto";
import { User } from "../user/user.entity";
import { LoginUserDto } from "../user/dto/login-user.dto";

@Controller("auth")
export class AuthController {
  private readonly logger = new Logger(AuthController.name);
  constructor(private readonly authService: AuthService) {}

  @Get("hello")
  getHello() {
    this.logger.log(" =========== this endpoint has been called =========== ");
    return "Hello from auth controller slka s";
  }

  @Post("register")
  async register(
    @Body() { email, password }: CreateUserDto,
    @Res() res,
  ): Promise<User> {
    this.logger.log(`Registering user with email: ${email}`);
    const user: User = await this.authService.register({ email, password });
    this.authService.setAuthTokens(res, {
      user_id: user.id,
    });

    return res.json({ ...user, password: undefined });
  }
  @Post("login")
  @HttpCode(HttpStatus.OK)
  async login(@Body() { email, password }: LoginUserDto, @Res() res) {
    this.logger.log(`Logging in user with email: ${email}`);
    const user: User = await this.authService.login({ email, password });
    this.authService.setAuthTokens(res, {
      user_id: user.id,
    });

    return res.json({
      ...user,
      password: undefined,
    });
  }

  @Get("logout")
  async logout(@Res() res) {
    this.logger.log("Logging out user");
    this.authService.clearAuthTokens(res);
    return res.json({
      message: "Logged out",
    });
  }
}
