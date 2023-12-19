import { IWriteUserRepository } from '../../../domain/repositories/user.interface';
import { Inject } from '@nestjs/common';
import { WRITE_USER_REPOSITORY } from '../../../data-typeorm/services/inject-key';
import { CreateUserCommand } from '../../command/user/create-user.command';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

@CommandHandler(CreateUserCommand)
export class CreateUserUseCase implements ICommandHandler<CreateUserCommand>
{
    constructor(
        @Inject(WRITE_USER_REPOSITORY)
        private readonly _writeRepository: IWriteUserRepository,
    ) {

    }

    async execute({
        input
    }: CreateUserCommand): Promise<any> {
        const result = await this._writeRepository.create(input);

        return result;
    }
}