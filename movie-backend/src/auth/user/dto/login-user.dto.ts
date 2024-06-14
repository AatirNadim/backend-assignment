// import { PickType } from "@nestjs/mapped-types";
import { UpdateUserDto } from "./update-user.dto";

import { PickType } from "@nestjs/swagger";

export class LoginUserDto extends PickType(UpdateUserDto, [
  "email",
  "password",
] as const) {}
