// import { OmitType } from "@nestjs/mapped-types";
import { UpdateUserDto } from "./update-user.dto";
import { IsString } from "class-validator";
import { Match } from "@/decorators/match.decorator";
import { ApiProperty, OmitType } from "@nestjs/swagger";

export class CreateUserDto extends OmitType(UpdateUserDto, ["id"] as const) {
  @ApiProperty({
    example: "okkl21212ksl",
    description: "To confirm the password of the user",
  })
  @IsString()
  @Match<CreateUserDto>("password")
  confirmPassword: string;
}
