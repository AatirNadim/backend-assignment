import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { User } from "./user.entity";
import { CreateUserDto } from "./dto/create-user.dto";
import * as bcrypt from "bcrypt";

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async findOne(condition): Promise<User> {
    return this.userRepository.findOne({ where: condition });
  }

  async createOne(
    user: Pick<CreateUserDto, "email" | "password">,
  ): Promise<User> {
    return this.userRepository.save({
      email: user.email.trim().toLowerCase(),
      password: this.hashPassword(user.password),
    });
  }

  hashPassword(password: string): string {
    return bcrypt.hashSync(password, 8);
  }
}
