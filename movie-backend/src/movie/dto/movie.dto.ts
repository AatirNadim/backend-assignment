import { IsDate, IsOptional, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class MovieDto {
  @ApiProperty({
    example: "9f8199fb-f60e-4840-b8f9-6a6b2a81e5f3",
    description: "The hashed id of the movie (auto-generated)",
    readOnly: true,
  })
  @IsString()
  id: string;

  @ApiProperty({
    example: "The Matrix",
    description: "The title of the movie",
  })
  @IsString()
  readonly title: string;

  @ApiProperty({
    example: "A movie about a hacker",
    description: "The description of the movie",
  })
  @IsString()
  readonly description: string;

  @ApiProperty({
    example: "2011-10-05T14:48:00.000Z",
    description: "The release date of the movie",
  })
  @IsDate({ message: "Release date should be a valid date" })
  @IsOptional()
  readonly releaseDate: Date;
}
