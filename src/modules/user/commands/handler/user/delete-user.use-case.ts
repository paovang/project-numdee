import { IWriteUserRepository } from '../../../domain/repositories/user.interface';
import { Inject } from '@nestjs/common';
import { WRITE_USER_REPOSITORY } from '../../../data-typeorm/services/inject-key';
import { DeleteUserCommand } from '../../command/user/delete-user.command';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

@CommandHandler(DeleteUserCommand)
export class DeleteUserUseCase implements ICommandHandler<DeleteUserCommand>
{
    constructor(
        @Inject(WRITE_USER_REPOSITORY)
        private readonly _writeRepository: IWriteUserRepository,
    ) {

    }

    async execute({
        id
    }: DeleteUserCommand): Promise<any> {
        const result = await this._writeRepository.delete(id);

        return result;
    }
}