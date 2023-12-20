import { CreateUserDto } from './../../../dtos/user/create.dto';

export class DeleteUserCommand {
  constructor(
    public readonly id: number
  ) {}
}