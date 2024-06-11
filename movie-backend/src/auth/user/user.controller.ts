import { Controller, Post, Body, Get, Param } from "@nestjs/common";
import { UserService } from "./user.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { User } from "./user.entity";

@Controller("users")
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get(":id")
  findOne(@Param("id") id: string): Promise<User> {
    return this.userService.findOne(id);
  }

  @Post()
  createOne(@Body() user: CreateUserDto): Promise<User> {
    return this.userService.createOne(user);
  }
}
