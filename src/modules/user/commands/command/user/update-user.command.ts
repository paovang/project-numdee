import { UpdateUserDto } from './../../../dtos/user/create.dto';

export class UpdateUserCommand {
    constructor(
      public readonly id: number,
      public readonly input: UpdateUserDto
    ) {}
}