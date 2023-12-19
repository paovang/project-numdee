import { compare } from 'bcrypt';
import { UserModel } from './../../../data-typeorm/models/user.model';
import { GetAllUserCommand } from '../../command/user/get-all.command';
import { JwtService } from '@nestjs/jwt';
import { TokenPayload } from '@/common/interfaces/token-payload.interface';
import { IWriteUserRepository } from '../../../domain/repositories/user.interface';
import { HttpStatus, Inject, UnauthorizedException } from '@nestjs/common';
import { WRITE_USER_REPOSITORY } from '../../../data-typeorm/services/inject-key';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CustomException } from '@/common/exception/custom.exception';

@CommandHandler(GetAllUserCommand)
export class GetAllUserUseCase implements ICommandHandler<GetAllUserCommand>
{
    constructor(
        @Inject(WRITE_USER_REPOSITORY)
        private readonly _repository: IWriteUserRepository
    ) {
        
    }

    async execute(query: GetAllUserCommand): Promise<UserModel> {
        const users = this._repository.getAll(query.input);

        return users;
    }
}