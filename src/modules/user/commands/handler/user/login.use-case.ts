import { compare } from 'bcrypt';
import { UserModel } from './../../../data-typeorm/models/user.model';
import { UserLoginCommand } from '../../command/user/login.command';
import { JwtService } from '@nestjs/jwt';
import { TokenPayload } from '@/common/interfaces/token-payload.interface';
import { IReadUserRepository } from '../../../domain/repositories/user.interface';
import { HttpStatus, Inject, UnauthorizedException } from '@nestjs/common';
import { READ_USER_REPOSITORY } from '../../../data-typeorm/services/inject-key';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CustomException } from '@/common/exception/custom.exception';

@CommandHandler(UserLoginCommand)
export class UserLoginUseCase implements ICommandHandler<UserLoginCommand>
{
    constructor(
        @Inject(READ_USER_REPOSITORY)
        private readonly _repository: IReadUserRepository
    ) {
        
    }

    async execute({ username, password }: UserLoginCommand): Promise<UserModel> {
        const user = await this._repository.findUserName(username);

        if (!user)
        throw new CustomException(
            'INVALID_INFOMATION',
            HttpStatus.UNAUTHORIZED,
            'domain-error',
        );

        const isMatch = await compare(password, user.password);

        if (!isMatch) throw new UnauthorizedException();

        return user;
    }
}