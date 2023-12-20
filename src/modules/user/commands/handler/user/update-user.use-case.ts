import { UpdateUserCommand } from './../../command/user/update-user.command';
import { IWriteUserRepository } from '../../../domain/repositories/user.interface';
import { Inject } from '@nestjs/common';
import { WRITE_USER_REPOSITORY } from '../../../data-typeorm/services/inject-key';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

@CommandHandler(UpdateUserCommand)
export class UpdateUserUseCase implements ICommandHandler<UpdateUserCommand>
{
    constructor(
        @Inject(WRITE_USER_REPOSITORY)
        private readonly _writeRepository: IWriteUserRepository,
    ) {

    }

    async execute({
        id,
        input
    }: UpdateUserCommand): Promise<any> {
        return this._writeRepository.update(id, input);
    }
}