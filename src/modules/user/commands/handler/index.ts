import { DeleteUserUseCase } from './user/delete-user.use-case';
import { UpdateUserUseCase } from './user/update-user.use-case';
import { UserLoginUseCase } from './user/login.use-case';
import { GenerateTokenUseCase } from './user/generate-token.use-case';
import { CreateUserUseCase } from './user/create-user.user-case';
import { Provider } from '@nestjs/common';
import { CreateTestUseCase } from './test/test.use-case';

export const userCommandHandler: Provider[] = [
    CreateUserUseCase,
    UserLoginUseCase,
    GenerateTokenUseCase,
    UpdateUserUseCase,
    DeleteUserUseCase,
    CreateTestUseCase
]