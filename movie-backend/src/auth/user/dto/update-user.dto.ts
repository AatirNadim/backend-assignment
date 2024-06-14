import { IsEmail, IsNumber, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class UpdateUserDto {
  @ApiProperty({
    example: "9f8199fb-f60e-4840-b8f9-6a6b2a81e5f3",
    description: "The hashed id of the user",
  })
  @IsNumber()
  id: string;

  @ApiProperty({
    example: "abc@email.com",
    description: "The email of the user",
  })
  @IsString()
  @IsEmail()
  email: string;

  @ApiProperty({
    example: "okkl21212ksl",
    description: "The password of the user",
  })
  @IsString()
  password: string;
}
