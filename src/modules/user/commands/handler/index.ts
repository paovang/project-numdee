import { UserLoginUseCase } from './user/login.use-case';
import { GenerateTokenUseCase } from './user/generate-token.use-case';
import { CreateUserUseCase } from './user/create-user.user-case';
import { Provider } from '@nestjs/common';

export const userCommandHandler: Provider[] = [
    CreateUserUseCase,
    UserLoginUseCase,
    GenerateTokenUseCase
]