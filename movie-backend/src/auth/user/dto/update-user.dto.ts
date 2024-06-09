import { IsEmail, IsNumber, IsString } from "class-validator";

export class UpdateUserDto {
  @IsNumber()
  id: string;

  @IsString()
  @IsEmail()
  email: string;

  @IsString()
  password: string;
}
