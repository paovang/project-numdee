import { IWriteUserRepository } from '../../../domain/repositories/user.interface';
import { Inject } from '@nestjs/common';
import { WRITE_USER_REPOSITORY } from '../../../data-typeorm/services/inject-key';
import { CreateTestCommand } from '../../command/test/create-command';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

@CommandHandler(CreateTestCommand)
export class CreateTestUseCase implements ICommandHandler<CreateTestCommand>
{
    constructor(
        @Inject(WRITE_USER_REPOSITORY)
        private readonly _writeRepository: IWriteUserRepository,
    ) {

    }

    async execute({
        input
    }: CreateTestCommand): Promise<any> {
        const result = await this._writeRepository.test(input);

        return result;
    }
}