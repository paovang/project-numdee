import { GenerateTokenCommand } from '../../command/user/generate-token.comand';
import { UserModel } from '../../../data-typeorm/models/user.model';
import { JwtService } from '@nestjs/jwt';
import { TokenPayload } from '@/common/interfaces/token-payload.interface';
import { IReadUserRepository } from '../../../domain/repositories/user.interface';
import { Inject } from '@nestjs/common';
import { READ_USER_REPOSITORY } from '../../../data-typeorm/services/inject-key';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

@CommandHandler(GenerateTokenCommand)
export class GenerateTokenUseCase implements ICommandHandler<GenerateTokenCommand>
{
    constructor(
        @Inject(READ_USER_REPOSITORY)
        private readonly _readRepository: IReadUserRepository,
        private readonly _jwt: JwtService,
    ) {
        
    }

    async execute({
        user
    }: GenerateTokenCommand): Promise<{ accessToken: string; user: UserModel }> {
        const payload: TokenPayload = {
            sub: user.id,
            username: user.username,
            timestamp: new Date().getTime(),
        };
        const token = this._jwt.sign(payload);
        
        const result = await this._readRepository.getOne(user.id);

        return { accessToken: token, user: result };
    }
}