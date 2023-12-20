import { CreateUserDto } from './../../../dtos/user/create.dto';

export class CreateUserCommand {
  constructor(
    public readonly input: CreateUserDto
  ) {}
}